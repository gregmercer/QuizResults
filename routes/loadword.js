
/*
 * GET loadword page.
 */

// quiz results  
  
var results = require("../results"); 

// quiz story answers

var storyAnswers = require("../storyAnswers");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_word_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadword = function(req, res) {

  loadWordResults();

  res.render('loadword', { title: 'Quiz Results - Load and Evaluate Word Results', ret_string: "status: Load word results complete."} );

};

function loadWordResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];
    
    var words = "";
    var correctWords = "";
    var numberCorrectWords = 0;
    var numberIncorrectWords = 0;    

	var dropMark = false;
	
	if (result.testNumber.charAt(0) == 1) {
	  numberCorrectWords = -1;
	  numberIncorrectWords = -1;
	}
    
	if (result.testNumber.charAt(0) == 2) {
	  dropMark = true;
	}    
    
    wordsloop: for (words_index in result.words) {
    
      var word = result.words[words_index];
        
      if (words.length != 0) {
        words += ", ";  
      }
      words += word;   
    
      // see if the word[mark] is correct
      // or only check word if dropMark equals true
      
      var wordAnswer = storyAnswers.find(word,dropMark);
      
      if (wordAnswer) {
        if (correctWords.length != 0) {
          correctWords += ", ";  
        }
        correctWords += word;
        numberCorrectWords++;
      } else {
      	numberIncorrectWords++;
      }
    
    } // end wordsloop
    
    var insert = "INSERT INTO " + result_table + 
        " (TestNumber, NumberCorrectWords, NumberIncorrectWords, SelectedWords, CorrectWords) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + numberCorrectWords + "', " + 
        "'" + numberIncorrectWords + "', " + 
        "'" + words + "', " + 
        "'" + correctWords + "')"; 
     
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    ); 
    
    console.log(insert);
                
  } // resultsloop

}