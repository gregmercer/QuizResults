
/*
 * GET loadquestion page.
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
        
      var insert = "INSERT INTO " + result_table + 
        " (TestNumber, PollQuestion, PollAnswer) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + answer.pollId + "', " +        
        "'" + answer.answer + "')";
        
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