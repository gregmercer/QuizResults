
/*
 * GET loadwordtime page.
 */

// quiz results  
  
var results = require("../results"); 

// quiz wordTimes  
  
var wordTimes = require("../wordTimes");

// quiz story answers

var storyAnswers = require("../storyAnswers");

// quiz story practice answers

var storyPracticeAnswers = require("../storyPracticeAnswers");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_word_time_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: 'root'
});

client.useDatabase(database);

exports.loadwordtime = function(req, res) {

  loadWordTimeResults();

  res.render('loadwordtime', { title: 'Quiz Results - Load WordTime Results', ret_string: "status: Load wordtime results complete."} );

};

function loadWordTime_getInfo(wordTimeRow) {

  var testNumber = wordTimeRow.testNumber;
  var storyType = wordTimeRow.storyType; 

  var storyStartTime = findStoryStartTime(testNumber, storyType);  

  var words = wordTimeRow.words;
  console.log('testNumber = '+wordTimeRow.testNumber+' words count = '+words.length);

  words.sort(function (a, b) {

    // a and b will be two instances of your object from your list

    // possible return values
    var a1st = -1; // negative value means left item should appear first
    var b1st =  1; // positive value means right item should appear first
    var equal = 0; // zero means objects are equal

    // compare your object's property values and determine their order
    if (b.time < a.time) {
        return b1st;
    }
    else if (a.time < b.time) {
        return a1st;
    }
    else {
        return equal;
    }
    
  });   

  // filter out any incorrect words

  var correctWords = [];

  //var wordSelectionOnly = storyWithWordSelectionOnly(testNumber);
  var wordSelectionOnly = true;

  for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {

    var word = words[wordIndex].word;
    var pos = word.indexOf("[");
    if (pos != -1) {
      word = word.substring(0,pos--);
    }    

    var correctlyIndentified = false;

    if (storyType == 'story') {
      correctlyIndentified = storyAnswers.find(word,wordSelectionOnly);  
    } else if (storyType == 'practiceStory') {
      correctlyIndentified = storyPracticeAnswers.find(word,wordSelectionOnly);  
    }

    if (correctlyIndentified) {
      correctWords[correctWords.length] = words[wordIndex];
    }

  }  

  console.log('testNumber = '+wordTimeRow.testNumber+' correctWords count = '+correctWords.length);

  // insert words and times

  for (var wordIndex = 0; wordIndex < correctWords.length; wordIndex++) {

    //console.log('time = '+correctWords[wordIndex].time+' word = '+correctWords[wordIndex].word+' testNumber = '+results[index].testNumber);

    // Insert WordTime for word   

    var word = correctWords[wordIndex].word;
    var currentWordTime = correctWords[wordIndex].time;
    var prevWordTime = storyStartTime; 
    if (wordIndex > 0 ) {
      prevWordTime = correctWords[wordIndex-1].time;
    }
    var timeBetween = '';

    if (wordIndex == 0) {
      timeBetween = currentWordTime - storyStartTime;
    }

    if (wordIndex > 0) {
      timeBetween = currentWordTime - prevWordTime;
    }

    var dialogTime = findStoryDialogTime(testNumber, storyType, prevWordTime, currentWordTime);
    var netTimeBetween = timeBetween - dialogTime;

    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, StoryType, WordIndex, Word, WordTime, TimeBetween, DialogTime, NetTimeBetween) VALUES(" + 
      "'" + wordTimeRow.testNumber + "', " + 
      "'" + wordTimeRow.storyType + "', " + 
      "'" + wordIndex + "', " + 
      "'" + word + "', " + 
      "'" + currentWordTime + "', " +     
      "'" + timeBetween + "', " +    
      "'" + dialogTime + "', " +    
      "'" + netTimeBetween + "')"; 

    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        //console.log('insert complete');
      }
    );
      
    console.log("insert = " + insert); 

  }

}

function storyWithWordSelectionOnly(testNumber) { 
  
  var firstNumber = testNumber.charAt(0);
  if (firstNumber == 2) {
    return true;
  }
  
  return false;

}

function findStoryStartTime(testNumber, storyType) {

  //console.log('in findResult testNumber = '+testNumber+' storyType = '+storyType);

  var storyTime = null;  

  resultsloop: for (index in results.all) {  
    var resultsRow = results.all[index];
    if (resultsRow.testNumber == testNumber) {
      if (storyType == 'story') {
        storyTime = resultsRow.storyStartTime; 
      } else if (storyType == 'practiceStory') {
        storyTime = resultsRow.storyPracticeStartTime;
      }
      break;
    }
  } // resultsLoop
  
  return storyTime; 
}

function findStoryDialogTime(testNumber, storyType, prevWordTime, currentWordTime) {

  //console.log('in findStoryDialogTime testNumber = '+testNumber+' storyType = '+storyType);

  var totalDialogTime = 0;  

  var dialogTime = '';

  resultsloop: for (index in results.all) {  
    var resultsRow = results.all[index];
    if (resultsRow.testNumber == testNumber) {
      if (storyType == 'story') {
        dialogTime = resultsRow.storyDialogTime; 
      } else if (storyType == 'practiceStory') {
        dialogTime = resultsRow.storyPracticeDialogTime;
      }
      break;
    }
  } // resultsLoop
  
  dialogTime = dialogTime.trim();
  dialogTime = dialogTime.split(" ");

  console.log('testNumber = '+testNumber+' dialogTime = '+dialogTime);

  for (var index = 0; index < dialogTime.length; index++) {
    var startTime = dialogTime[index];
    var pos = startTime.indexOf(":");
    if (pos != -1) {
      startTime = startTime.substring(pos+1);
    }        
    var endTime = dialogTime[++index];
    pos = endTime.indexOf(":");
    if (pos != -1) {
      endTime = endTime.substring(pos+1);
    }   
    if (startTime >= prevWordTime && endTime <= currentWordTime) {
      totalDialogTime += endTime - startTime;
    }
  }

  return totalDialogTime; 
}

function loadWordTimeResults() {

  wordTimeloop: for (index in wordTimes.all) {
    
    var wordTimeRow = wordTimes.all[index];

    loadWordTime_getInfo(wordTimeRow);
    
  } // wordTimeloop

}