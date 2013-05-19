
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

function loadPollResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    answersloop: for (answer_index in result.pollAnswers) {
    
      var answer = result.pollAnswers[answer_index];

      // poll answers are for example s1r1 - s1r11

      var pollAnswer = answer.answer;
      var pos = pollAnswer.indexOf('r');
      console.log("pos = " + pos);
      pollAnswer = pollAnswer.substr(pos+1);
      console.log("pollAnswer = " + pollAnswer);      
      pollAnswer = parseInt(pollAnswer, 10);
      pollAnswer = pollAnswer - 1;

      var insert = "INSERT INTO " + result_table + 
        " (TestNumber, PollQuestion, PollAnswer) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + answer.pollId + "', " +        
        "'" + pollAnswer + "')";
        
        client.query(insert,
          function selectCb(err, results, fields) {
            if (err) { throw err; }
            console.log('insert complete');
          }
        );
            
        console.log("insert = " + insert);  

    } // end answersloop
    
  } // resultsloop

}