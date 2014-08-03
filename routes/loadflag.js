
/*
 * GET loadflag page.
 */

// quiz results  
  
var results = require("../results");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_flag_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: 'root'
});

client.useDatabase(database);

exports.loadflag = function(req, res) {

  loadFlagResults();

  res.render('loadflag', { title: 'Quiz Results - Load Flag Results', ret_string: "status: Load flag results complete."} );

};

function getRawWord(word) {

  // strip any mark off the word
  
  var raw_word = word;

  var wordIndex = raw_word.indexOf(".");
  if (wordIndex != -1) {
  	wordIndex++;
    raw_word = raw_word.substring(wordIndex);
  }  

  wordIndex = raw_word.indexOf("[");
  if (wordIndex != -1) {
    raw_word = raw_word.substring(0,wordIndex--);
  }   

  wordIndex = raw_word.indexOf(".");
  if (wordIndex != -1) {
    raw_word = raw_word.substring(0,wordIndex--);
  }   

	return raw_word;
}

function findWord(wordList, word) {

	var foundWord = false;
	
	for (var index = 0; index < wordList.length; index++) {
		if (wordList[index] == word) {
			foundWord = true;
			break;
		}
	}

	if (!foundWord) {
		return -1;
	}

	return index;
}

/*
 * flagCheckLevel2 - 
 * 
 * Flag if:
 * Input 'words' has an order different from the 'orderedWords'.
 *
 * Returns true if flagged.
 *
 */ 
function flagCheckLevel2(orderedWordsList, wordsList) {

	var flagged_words = [];

	var interList = [];

	for (var orderedIndex = 0; orderedIndex < orderedWordsList.length; orderedIndex++) {	

		orderedWord = orderedWordsList[orderedIndex];
		var findIndex = findWord(wordsList, orderedWord);
		if (findIndex != -1) {
			interList[interList.length] = orderedWord;
		}

	}	

	// the two lists, interList and wordsList, should have 
	// the same length

	if (interList.length != wordsList.length) {
		console.log('flagCheckLevelTwo - flagged lists have different lengths');
		console.log('interList = ' + interList.toString());
		console.log('wordsList List = ' + wordsList.toString());		
		return true;
	}

	return false;
}	

/*
 * flagCheckLevel3 - 
 * 
 * Flag if:
 * Input 'words' has an order different from the 'orderedWords'.
 *
 * Returns flagged words.
 *
 */ 
function flagCheckLevel3(orderedWordsList, wordsList) {

	var flagged_words = [];

	var interList = [];

	for (var orderedIndex = 0; orderedIndex < orderedWordsList.length; orderedIndex++) {	

		orderedWord = orderedWordsList[orderedIndex];
		var findIndex = findWord(wordsList, orderedWord);
		if (findIndex != -1) {
			interList[interList.length] = orderedWord;
		}

	}	

	// we now go thru the two lists, word by word, and... 
	// the words should match exactly.
	// if they don't then the 'wordsList' list is in a different order

	for (var index = 0; index < interList.length; index++) {
		if (interList[index] != wordsList[index]) {
			console.log('flagCheckLevelTwo - flagged words do not match');
			console.log('interList = ' + interList.toString());
			console.log('wordsList List = ' + wordsList.toString());
			flagged_words[flagged_words.length] = wordsList[index];
			return flagged_words;
		}
	}

	return flagged_words;
}	

/*
 * flagCheckLevel1 - 
 * 
 * Flag if:
 * Input 'words' has any words not in 'orderedWords'. 
 *
 * Returns flagged words.
 *
 */ 
function flagCheckLevel1(orderedWords, words) {

	var flagged_words = [];

	for (var wordsIndex = 0; wordsIndex < words.length; wordsIndex++) {

		var word = words[wordsIndex];

		word = word.toLowerCase();
		//console.log('lowercase word = ' + word);

		var findIndex = findWord(orderedWords, word);
		//console.log('findIndex = ' + findIndex);

		if (findIndex == -1) {
			// we have a word that couldn't be found in the list of 'orderedWords'
			console.log('flagged: word -not- found = ' + word);
			flagged_words[flagged_words.length] = word;
		} 

	}

	return flagged_words;

}

function loadFlagResults() {

	var orderedWords = [
		  'descubrió'
		, 'sabe'
		, 'daba' 
		, 'poseía'
		, 'sacrificaron'
		, 'construyeron'
		, 'admiraban'
		, 'era'
		, 'conoce'
		, 'dio'
		, 'supone'
		, 'empezó'
		, 'tiene'
		, 'querían'
		, 'incluyó'
		, 'demostraban'
		, 'pusieron'
		, 'cuelga'
		, 'indica'
		, 'alimenten'
		, 'incluían'
		, 'simboliza'
		, 'encontró'
		, 'estaba'
		, 'hacia'
		, 'podía'
		, 'honraban'
		, 'trasladaron'
		, 'colocaron'
		, 'está'
	];	

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    var flagged = 'no';

    var raw_words = [];
    wordsloop: for (words_index in result.words) {
    
      var word = result.words[words_index];

      var raw_word = getRawWord(word); 
      //console.log('raw_word = ' + raw_word); 	

      raw_words[raw_words.length] = raw_word;

    } // end wordsloop

    // test -not- flagged
    // raw_words = ['descubrió', 'sabe', 'daba'];
    // raw_words = ['demostraban', 'estaba', 'trasladaron'];

    // test flagged
    // raw_words = ['descubrió', 'daba', 'sabe'];
    // raw_words = ['demostraban', 'xxx', 'trasladaron'];

    flagged_words = flagCheckLevel1(orderedWords, raw_words);
    if (flagged_words.length > 0) {
	  	console.log('testNumber = ' + result.testNumber + ' level1 flagged.'); 
	    flagged = 'yes-level1';
    } else { 
    	if (flagCheckLevel2(orderedWords, raw_words)) {
	  		console.log('testNumber = ' + result.testNumber + ' level2 flagged.'); 
	    	flagged = 'yes-level2';
	    	flagged_words = raw_words;
    	} else {
    		flagged_words = flagCheckLevel3(orderedWords, raw_words);
    		if (flagged_words.length > 0) {
	  			console.log('testNumber = ' + result.testNumber + ' level3 flagged.'); 
	    		flagged = 'yes-level3';
    		} else {	
    			console.log('testNumber = ' + result.testNumber + ' -not- flagged.'); 	
  			}
    	}
  	}

    var insert = "INSERT INTO " + result_table + 
        " (TestNumber, Flagged, FlagComment) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + flagged + "', " + 
        "'" + flagged_words + "')"; 
    
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { 
        	throw err; 
        }
        //console.log('insert complete');
      }
    );

    console.log(insert);
    console.log('    ');

    // testing
    // break;
                
  } // resultsloop

}