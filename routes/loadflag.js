
/*
 * GET loadflag page.
 */

// quiz results  
  
var results = require("../results");

// story data

var storyData = require("../storyData");

// word times 

var wordTimes = require("../wordTimes");

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

var baseWords = [
  'descubrió'
 ,'sabe'
 ,'daba'
 ,'poseía'
 ,'sacrificaron'
 ,'construyeron'
 ,'admiraban'
 ,'era'
 ,'conoce'
 ,'dio'
 ,'supone'
 ,'empezó'
 ,'querían'
 ,'incluyó'
 ,'demostraban'
 ,'pusieron'
 ,'cuelga'
 ,'indica'
 ,'alimenten'
 ,'incluían'
 ,'simboliza'
 ,'encontró'
 ,'Estaba'
 ,'podía'
 ,'honraban'
 ,'trasladaron'
 ,'colocaron'
 ,'está'
];

exports.loadflag = function(req, res) {

  loadFlagResults();
  res.render('loadflag', { title: 'Quiz Results - Load Flag Results', ret_string: "status: Load flag results complete."} );

};

function loadFlagResults() {

	// create the list of duplicates, index by story paragraph
  // ex. duplicates[0] will be an array of the duplicates 
  // in the story's first paragraph

	var duplicates = [];

	var numParagraphs = storyData.getNumParagraphs();

	for (var index = 0; index < numParagraphs; index++) {
	
		var textArray = storyData.getParagraph(index);

		textArray = textArray.map(function(value) {
			return value.toLowerCase();
		});		
		console.log('p'+index+' textArray = '+textArray);

		textArray = array_findDuplicates(textArray);
		duplicates[index] = textArray;

	}

	console.log('duplicates = '+duplicates);

	// loop thru the results

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];

    var selectedWords = [];
    wordsloop: for (words_index in result.words) {
    
      var word = result.words[words_index];
      selectedWords[selectedWords.length] = word;

    } // end wordsloop

    console.log('selectedWords = ' + selectedWords);

    // find any duplicate words

    var hasDuplicateWords = 'N';
    var duplicateWordsFound = [];

    var duplicateWordsFound = findDuplicates(duplicates, selectedWords);
    if (duplicateWordsFound.length > 0) {
    	hasDuplicateWords = 'Y';
    }

    console.log('duplicateWordsFound = ' + duplicateWordsFound);

    // remove duplicates from the selected words
    var selectedWords = removeDuplicates(duplicateWordsFound, selectedWords);

    console.log('nondup selectedWords = ' + selectedWords);

    // find any non-base words
    
    var nonBaseWords = 'N';
    var nonBaseWordsFound = [];

    var nonBaseWordsFound = findNonBaseWords(baseWords, selectedWords);
    if (nonBaseWordsFound.length > 0) {
    	nonBaseWords = 'Y';
    }    

    console.log('nonBaseWordsFound = ' + nonBaseWordsFound);

    // find the selected words that are out of order
    // (not in the order they are in the story paragraphs)

    var isOutOfOrder = 'N';
    var outOfOrderWordsFound = [];
 
    var outOfOrderWordsFound = findOutOfOrderWords(result.testNumber, duplicateWordsFound);
    if (outOfOrderWordsFound.length > 0) {
    	isOutOfOrder = 'Y';
    } 

    console.log('outOfOrderWordsFound = ' + outOfOrderWordsFound);

    // for testing add this break, so only the first record is run
    // break;
    /////////////////////////////////////////////////////////////////////////////////////////

    // insert a row in our flag table

    var insert = "INSERT INTO " + result_table + 
        " (TestNumber, Duplicates, DuplicateWords, NonBase, NonBaseWords, OutOfOrder, OutOfOrderWords ) VALUES(" + 
        "'" + result.testNumber + "', " + 
        "'" + hasDuplicateWords + "', " + 
        "'" + duplicateWordsFound.toString() + "', " + 
        "'" + nonBaseWords + "', " + 
        "'" + nonBaseWordsFound + "', " + 
        "'" + isOutOfOrder + "', " + 
        "'" + outOfOrderWordsFound +                  
        "')"; 
    
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

    // for testing add this break, so only the first record is run
    // break;
    /////////////////////////////////////////////////////////////////////////////////////////

  }	// end resultsloop

}

/*
 * array_findDuplicates()
 */

function array_findDuplicates(arrayIn) {

  var arrayOut = [];
  var counts = {};

  for (var index = 0; index < arrayIn.length; index++) {
    var item = arrayIn[index];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
  }

  for (var item in counts) {
    if (counts[item] > 1) {
    	arrayOut.push(item);
    }
  }

  return arrayOut;
}

/*
 * inArray()
 */
function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
  }
  return false;
}

/*
 * findDuplicates()
 */
function findDuplicates(duplicates, selectedWords) {

	var duplicateWordsFound = [];

	for (var selectedIndex = 0; selectedIndex < selectedWords.length; selectedIndex++ ) {

		for (var index = 0; index < duplicates.length; index++) {
			var word = getRawWord(selectedWords[selectedIndex]);	
			word = word.toLowerCase();

			//console.log('word = ' + word);
			//console.log('duplicates = ' + duplicates[index].toString());

			var pnNumber = getPNNumber(selectedWords[selectedIndex]);

			/*
			console.log(
				'word = ' + selectedWords[selectedIndex] +
				' pNumber number = ' + pnNumber.pNumber + 
				' wNumber number = ' + pnNumber.wNumber + 
				' index = ' + index
			);
			*/

			if ((pnNumber.pNumber == index+1) && (inArray(word, duplicates[index]))) {
				duplicateWordsFound[duplicateWordsFound.length] = selectedWords[selectedIndex];
			}
		}	

	}

	return duplicateWordsFound;
}

/*
 * removeDuplicates()
 */
function removeDuplicates(duplicates, selectedWords) {

	var wordsList = [];

	for (var selectedIndex = 0; selectedIndex < selectedWords.length; selectedIndex++ ) {

		if (!inArray(selectedWords[selectedIndex], duplicates)) {
			wordsList[wordsList.length] = selectedWords[selectedIndex];
		}

	}	

	return wordsList;
}


/*
 * findNonBaseWords()
 */
function findNonBaseWords(baseWords, selectedWords) {

	var nonBaseWordsFound = [];

	for (var selectedIndex = 0; selectedIndex < selectedWords.length; selectedIndex++ ) {

		var word = getRawWord(selectedWords[selectedIndex]);	
		//word = word.toLowerCase();
		//console.log('word = ' + word);
		//console.log('baseWords = ' + baseWords.toString());
		if (!inArray(word, baseWords)) {
			nonBaseWordsFound[nonBaseWordsFound.length] = selectedWords[selectedIndex];
		}

	}

	return nonBaseWordsFound;
}

/*
 * findOutOfOrderWords()
 */
function findOutOfOrderWords(testNumber, duplicateWords) {

	var outWords = [];

	// get the selected words with their word times
	// for the given testNumber

	var testWordTimes = wordTimes.find(testNumber);

	console.log('testWordTimes before sort');

	for (var index = 0; index < testWordTimes.length; index++) {
		console.log('word = ' + testWordTimes[index].word + ' time = ' + testWordTimes[index].time);
	}

	// sort the selected words by the selection times
	testWordTimes.sort(compareByTime);

	console.log('testWordTimes after sort');

	for (var index = 0; index < testWordTimes.length; index++) {
		console.log('word = ' + testWordTimes[index].word + ' time = ' + testWordTimes[index].time);
	}

	// remove the duplicates for the sorted word times

	var selectedWordTimes = [];

	for (var index = 0; index < testWordTimes.length; index++ ) {

		var word = testWordTimes[index].word;

		if (!inArray(word, duplicateWords)) {
			selectedWordTimes[selectedWordTimes.length] = testWordTimes[index];
		}

	}		

	console.log('selectedWordTimes after removing duplicates');

	for (var index = 0; index < selectedWordTimes.length; index++) {
		console.log('word = ' + selectedWordTimes[index].word + ' time = ' + selectedWordTimes[index].time);
	}	

	// check the word paragraph number and word number to see
	// if they run in sequence, if not then we have found a word that 
	// is 'out of order'

	var currentParagraph = -1;
	var currentWord = -1;

	for (var index = 0; index < selectedWordTimes.length; index++) {

		var word = selectedWordTimes[index].word;

		var pnNumber = getPNNumber(word);

		console.log(
			'word = ' + word +
			' pNumber number = ' + pnNumber.pNumber + 
			' wNumber number = ' + pnNumber.wNumber + 
			' currentParagraph = ' + currentParagraph +
			' currentWord = ' + currentWord
		);

		var pNumber = parseInt(pnNumber.pNumber);
		var wNumber = parseInt(pnNumber.wNumber);

		if (pNumber < currentParagraph) {
			// word is in a previous paragraph 
			// so add to list
			console.log('previous p');
			outWords[outWords.length] = word;
			continue;
		}			

		if ((pNumber == currentParagraph) && (wNumber < currentWord)) {
			// word is a previous word in the current paragraph
			// so add to list
			console.log('previous w');
			outWords[outWords.length] = word;
			continue;
		}		

		currentParagraph = pNumber;
		currentWord = wNumber;

	}		

	return outWords;
}

function getPNNumber(word) {

	var pNumber = -1;
	var wNumber = -1;

  var wordIndex = word.indexOf(".");
  if (wordIndex != -1) {
    word = word.substring(0, wordIndex);
    //console.log(word);
  }  	

  var pPart = '';
  var wPart = '';

  var wordIndex = word.indexOf("w");
  if (wordIndex != -1) {
    pPart = word.substring(0, wordIndex);
    wPart = word.substring(wordIndex);
    //console.log('pPart = ' + pPart + ' wPart = ' + wPart);
  }    

  pNumber = pPart.replace('p','');
  wNumber = wPart.replace('w','');

	return { 'pNumber' : pNumber, 'wNumber' : wNumber }

}

function compareByTime(a,b) {
  if (a.time < b.time) {
  	return -1;
  }  
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}

/*
 * getRawWord()
 */

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

/*
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

      raw_word = raw_word.toLowerCase();
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
*/