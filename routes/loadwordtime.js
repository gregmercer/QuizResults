
/*
 * GET loadwordtime page.
 */

// quiz wordTimes  
  
var wordTimes = require("../wordTimes");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_word_time_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadwordtime = function(req, res) {

  loadWordTimeResults();

  res.render('loadwordtime', { title: 'Quiz Results - Load WordTime Results', ret_string: "status: Load wordtime results complete."} );

};

function loadWordTime_getInfo(wordTimeRow) {

  var words = wordTimeRow.words;
  console.log('testNumber = '+wordTimeRow.testNumber+'words count = '+words.length)

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

  for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {

    //console.log('time = '+words[wordIndex].time+' word = '+words[wordIndex].word+' testNumber = '+results[index].testNumber);

    // Insert WordTime for word   

    var word = words[wordIndex].word;
    var wordTime = words[wordIndex].time;
    var timeBetween = '';

    if (wordIndex > 0) {
      timeBetween = wordTime - words[wordIndex-1].time;
    }

    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, StoryType, WordIndex, Word, WordTime, TimeBetween) VALUES(" + 
      "'" + wordTimeRow.testNumber + "', " + 
      "'" + wordTimeRow.storyType + "', " + 
      "'" + wordIndex + "', " + 
      "'" + word + "', " + 
      "'" + wordTime + "', " +     
      "'" + timeBetween + "')"; 
      
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    );
      
    console.log("insert = " + insert); 

  }

}

function loadWordTimeResults() {

  wordTimeloop: for (index in wordTimes.all) {
    
    var wordTimeRow = wordTimes.all[index];
    loadWordTime_getInfo(wordTimeRow);
    
  } // wordTimeloop

}
