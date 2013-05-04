
/*
 * GET loadquestion page.
 */

// quiz results  
  
var results = require("../results");

// quiz question answers

var questionAnswers = require("../questionAnswers");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_question_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadquestion = function(req, res) {

  loadQuestionResults();

  res.render('loadquestion', { title: 'Quiz Results - Load and Evaluate Question Results', ret_string: "status: Load question results complete."} );

};

function loadQuestionResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];
    
    answersloop: for (answer_index in result.answers) {
    
      var answer = result.answers[answer_index];
    
      var questionAnswer = questionAnswers.find(answer.questionId);
      
      var correct = "No";
      
      if (questionAnswer.answer == answer.answer) {
        correct = "Yes";
      }
    
      var insert = "INSERT INTO " + result_table + 
        " (TestNumber, Question, Answer, Correct) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + answer.questionId + "', " +
        "'" + answer.answer + "'," +
        "'" + correct + "')"; 
        
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