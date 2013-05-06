
/*
 * GET loadword page.
 */

// quiz results  
  
var results = require("../results"); 

// quiz story answers

var storyAnswers = require("../storyAnswers");

// quiz distractor answers

var distractorAnswers = require("../distractorAnswers");

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

    var distractorWords = "";
    var correctlySelectedWords = "";
    var incorrectlySelectedWords = "";
    var correctlyIndentifiedWords = "";

    var numberDistractorWords = 0;
    var numberCorrectlySelected = 0;
    var numberIncorrectlySelected = 0;    
    var numberCorrectlyIndentified = 0;

  	if (result.testNumber.charAt(0) == 1) {
      numberDistractorWords = -1;
      numberCorrectlySelected = -1;
      numberIncorrectlySelected = -1;    
      numberCorrectlyIndentified = -1;
  	}
    
    wordsloop: for (words_index in result.words) {
    
      var word = result.words[words_index];
        
      // save the selected words

      if (words.length != 0) {
        words += ", ";  
      }
      words += word;   

      // strip any mark off the word
      
      var raw_word = word;

      var wordIndex = raw_word.indexOf("[");
      if (wordIndex != -1) {
        raw_word = raw_word.substring(0,wordIndex--);
      }        
    
      // word is in the form of: word[mark]

      // first... see if the word is a distractor 

      var distractorAnswer = distractorAnswers.find(word);      

      // next... see if the correct word is selected   
      
      var correctlySelected = storyAnswers.find(raw_word,true);

      // last... see if the correct mark is used 

      var correctlyIndentified = storyAnswers.find(word,false);

      if (distractorAnswer) {

        // count up the number of distractors
      
        if (distractorWords.length != 0) {
          distractorWords += ", ";  
        }
        distractorWords += word;
        numberDistractorWords++;
      
      } else if (correctlySelected) {

        // count up the number of correctly selected
        
        if (correctlySelectedWords.length != 0) {
          correctlySelectedWords += ", ";  
        }
        correctlySelectedWords += word;
        numberCorrectlySelected++;

        // count up the number of correctly identfied 

        if (result.testNumber.charAt(0) == 2) {
        } else {  

          // we need to see if the word was correctly marked   

          if (correctlyIndentified) {

            if (correctlyIndentifiedWords.length != 0) {
              correctlyIndentifiedWords += ", ";  
            }
            correctlyIndentifiedWords += word;
            numberCorrectlyIndentified++;            

          }

        }

      } else {
      
        if (incorrectlySelectedWords.length != 0) {
          incorrectlySelectedWords += ", ";  
        }
        incorrectlySelectedWords += word;        
      	numberIncorrectlySelected++;
      
      }
    
    } // end wordsloop
    
    var insert = "INSERT INTO " + result_table + 
        " (TestNumber, NumberDistractorWords, NumberCorrectlySelected, NumberIncorrectlySelected, NumberCorrectlyIndentified, " +
        "SelectedWords, DistractorWords, CorrectlySelectedWords, IncorrectlySelectedWords, CorrectlyIndentifiedWords) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + numberDistractorWords + "', " + 
        "'" + numberCorrectlySelected + "', " + 
        "'" + numberIncorrectlySelected + "', " + 
        "'" + numberCorrectlyIndentified + "', " + 
        "'" + words + "', " + 
        "'" + distractorWords + "', " + 
        "'" + correctlySelectedWords + "', " +    
        "'" + incorrectlySelectedWords + "', " +            
        "'" + correctlyIndentifiedWords + "')"; 
     
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    ); 
    
    console.log(insert);
                
  } // resultsloop

}