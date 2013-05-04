
/*
 * GET loadquestion page.
 */

// quiz results  
  
var results = require("../results");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_time_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadtime = function(req, res) {

  loadTimeResults();

  res.render('loadtime', { title: 'Quiz Results - Load Time Results', ret_string: "status: Load time results complete."} );

};

function loadTimeResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];
        
    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, StoryTime, QuestionTime) VALUES(" + 
      "'" + result.testNumber + "', " + 
      "'" + result.questionTime + "', " +
      "'" + result.storyTime + "')";
        
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    );
        
    console.log("insert = " + insert);  
    
  } // resultsloop

}