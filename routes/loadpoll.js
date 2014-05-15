
/*
 * GET loadpoll page.
 */

// quiz results  
  
var results = require("../results");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_poll_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadpoll = function(req, res) {

  loadPollResults();

  res.render('loadpoll', { title: 'Quiz Results - Load Poll Results', ret_string: "status: Load poll results complete."} );

};

function loadPoll_saveAnswer(testNumber, answer) {

  // poll answers are for example s1r1 - s1r11
  //
  // "pollAnswers" : [ 
  //  { "pollId" : "survey1", "answer" : "s1r1" }, 
  //  { "pollId" : "survey2", "answer" : "s2r1" }, 
  //  { "pollId" : "survey3", "answer" : "s3r5" }, 
  //  { "pollId" : "survey4", "answer" : "s4r6", 
  //      "explainAnswer" : "Some of...", 
  //      "explainAnswer2" : "I focused..." 
  //  } 
  // ]

  var pollAnswer = answer.answer;
  var pos = pollAnswer.indexOf('r');
  console.log("pos = " + pos);
  pollAnswer = pollAnswer.substr(pos+1);
  console.log("pollAnswer = " + pollAnswer);      
  pollAnswer = parseInt(pollAnswer, 10);
  pollAnswer = pollAnswer - 1;

  var insert = "INSERT INTO " + result_table + 
    " (TestNumber, PollQuestion, PollAnswer) VALUES(" + 
    "'" + testNumber + "', " + 
    "'" + answer.pollId + "', " +        
    "'" + pollAnswer + "')";
    
  client.query(insert,
    function selectCb(err, results, fields) {
      if (err) { throw err; }
      console.log('insert complete');
    }
  );
    
  console.log("insert = " + insert);  

  if (answer.explainAnswer) {

    console.log('in ')

    pollAnswer = answer.explainAnswer.replace(/'/g, " ");
    console.log('explainAnswer = '+pollAnswer);

    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, PollQuestion, PollAnswer) VALUES(" + 
      "'" + testNumber + "', " + 
      "'" + 'explainAnswer' + "', " +        
      "'" + pollAnswer + "')";
      
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    );

  }

  if (answer.explainAnswer2) {

    pollAnswer = answer.explainAnswer2.replace(/'/g, " ");
    console.log('explainAnswer2 = '+pollAnswer);

    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, PollQuestion, PollAnswer) VALUES(" + 
      "'" + testNumber + "', " + 
      "'" + 'explainAnswer2' + "', " +        
      "'" + pollAnswer + "')";
      
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    );

  }

}

function loadPollResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    answersloop: for (answer_index in result.pollAnswers) {
    
      var answer = result.pollAnswers[answer_index];

      loadPoll_saveAnswer(result.testNumber, answer);

    } // end answersloop
    
  } // resultsloop

}
