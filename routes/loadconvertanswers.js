
/*
 * GET loadconvertanswers page.
 */

// input: quiz results data 
  
var results = require("../results");

// input: wordTime results data  
  
var wordTimes = require("../wordTimes");

// story data

var storyData = require("../storyData");

// story practice data

var storyPracticeData = require("../storyPracticeData");

// mysql

var mysql = require('mysql');

var database = 'fred';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: 'root'
});

client.useDatabase(database);

exports.loadconvertanswers = function(req, res) {

  console.log('hello from loadconvertanswers');

  convertAnswers();

  res.render('loadconvertanswers', { title: 'Quiz Results - Load and Convert Answers', ret_string: "status: Load convert answers complete."} );

};

function convertAnswers() {

  // convert the wordTimes results data

  var newWordTimes = [];

  wordTimesloop: for (index in wordTimes.all) {
  
    //console.log('storyType = ' + wordTimes.all[index].storyType);

    var wordTimesItem = wordTimes.all[index];

    var newWords = [];

    wordsloop: for (words_index in wordTimesItem.words) {
    
      var wordObject = wordTimesItem.words[words_index];
      var oldAnswer = wordObject.word;

      //console.log('oldAnswer = ' + oldAnswer);

      var newAnswer = '';
      if (wordTimes.all[index].storyType == 'practiceStory') {
        newAnswer = storyPracticeData.convert(oldAnswer);
      } else {
        newAnswer = storyData.convert(oldAnswer);
      }

      //console.log('oldAnswer = ' + oldAnswer);
      //console.log('newAnswer = ' + newAnswer);

      wordObject.word = newAnswer;

      newWords[newWords.length] = wordObject;

    } // end wordsloop  

    //console.log('oldWords[] = ' + result.words.join());
    //console.log('newWords[] = ' + newWords.join());

    wordTimesItem.words = newWords;

    newWordTimes[newWordTimes.length] = wordTimesItem;
        
  } // end wordTimesloop

  console.log('new wordTimes = ' + JSON.stringify(newWordTimes) );

  // convert the quiz results data

  var newResults = [];

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    var newWords = [];

    wordsloop: for (words_index in result.words) {
    
      var oldAnswer = result.words[words_index];
      var newAnswer = storyData.convert(oldAnswer);

      //console.log('oldAnswer = ' + oldAnswer);
      //console.log('newAnswer = ' + newAnswer);

      newWords[newWords.length] = newAnswer;

    } // end wordsloop  

    //console.log('oldWords[] = ' + result.words.join());
    //console.log('newWords[] = ' + newWords.join());

    result.words = newWords;

    newResults[newResults.length] = result;
        
  } // end resultsloop

  console.log('new results = ' + JSON.stringify(newResults) );  

}