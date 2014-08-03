
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
  password: 'root'
});

client.useDatabase(database);

exports.loadpoll = function(req, res) {

  loadPollResults();

  res.render('loadpoll', { title: 'Quiz Results - Load Poll Results', ret_string: "status: Load poll results complete."} );

};

function loadPoll_getAnswer(testNumber, answer) {

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

  return pollAnswer;

}

function loadPoll_saveAnswer(testNumber, answers, explain1, explain2) {

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

  var insert = "INSERT INTO " + result_table + 
    " (TestNumber, PollAnswer1, PollAnswer2, PollAnswer3, PollAnswer4, Explain1, Explain2) VALUES(" + 
    "'" + testNumber + "', " + 
    "'" + answers[0] + "', " +
    "'" + answers[1] + "', " +
    "'" + answers[2] + "', " +
    "'" + answers[3] + "', " +
    "'" + explain1 + "', " +               
    "'" + explain2 + "')";
    
  client.query(insert,
    function selectCb(err, results, fields) {
      if (err) { throw err; }
      console.log('insert complete');
    }
  );
    
  console.log("insert = " + insert);  

}

function loadPollResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    var testNumber = result.testNumber;

    var answers = [];
    var explain1 = '';
    var explain2 = '';

    answersloop: for (answer_index in result.pollAnswers) {
    
      var answer = result.pollAnswers[answer_index];

      answers[answers.length] = loadPoll_getAnswer(testNumber, answer);

      if (answer.explainAnswer) {
        explain1 = answer.explainAnswer.replace(/'/g, " "); 
      } 

      if (answer.explainAnswer2) {
        explain2 = answer.explainAnswer2.replace(/'/g, " "); 
      } 

    } // end answersloop

    loadPoll_saveAnswer(testNumber, answers, explain1, explain2);
    
  } // resultsloop

}