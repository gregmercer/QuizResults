
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
  password: 'root'
});

client.useDatabase(database);

exports.loadtime = function(req, res) {

  loadTimeResults();

  res.render('loadtime', { title: 'Quiz Results - Load Time Results', ret_string: "status: Load time results complete."} );

};

/*
  
  "testNumber" : "30016",

  ...

   "storyPracticeTime": 155,
   "storyPracticeStartTime": 1398196767917,
   "storyPracticeStartTime2": -1,
   "storyPracticeStartTime3": -1,
   "storyPracticeDialogTime": " s:1398196920050 c:1398196922975",
   "storyPracticeEndTime": 1398196922970,
   "questionPracticeTime": 29,

   "storyTimeOut": "",

   "storyTime": 255,
   "storyStartTime": 1398196968352,
   "storyStartTime2": -1,
   "storyStartTime3": -1,
   "storyDialogTime": " s:1398197220889 c:1398197222886",
   "storyEndTime": 1398197222881,
   "storyPracticeTimeOut": "",
   "questionTime": 171,

*/

function loadTime_getDialogTimes(dialogTime,timeMarker) {

  var dialogTimes = new Array();
 
  var index = dialogTime.indexOf(timeMarker+":");
  while (index != -1) {
    dialogTime = dialogTime.substring(index+2);
    spaceIndex = dialogTime.indexOf(" ");
    var time = "";
    if (spaceIndex != -1) {
      time = dialogTime.substring(0,spaceIndex);
      dialogTimes.push(time); 
      dialogTime = dialogTime.substring(spaceIndex+1);
      index = dialogTime.indexOf(timeMarker+":");
    } else {
      time = dialogTime.substring(0);
      dialogTimes.push(time); 
      index = -1;
    }
  }

  return dialogTimes;
}

function loadTime_pairDialogTimes(dialogStartTimes, dialogCloseTimes, storyEndTime) {

  var pairTimes = new Array();

  if (dialogStartTimes.length == dialogCloseTimes.length) {
    for (var index = 0; index < dialogStartTimes.length; index++) {
    var closeTime = dialogCloseTimes[index];
      if (storyEndTime < closeTime) {
        closeTime = storyEndTime;
      }      
      pairTimes[index] = {
        'startTime': dialogStartTimes[index], 
        'closeTime': closeTime,
        'diffTime':  closeTime - dialogStartTimes[index],
      };
    }
  }

  // special handle for non-matched cases... which has multiple starts and just one close
  // examples: 
  // s:1398375476613 c:1398375480695 s:1398375568829 s:1398375570736 c:1398375570887
  // s:1398644772702 s:1398644775464 c:1398644779280
  for (var index = 0; index < dialogCloseTimes.length; index++) {
    var startTime = -1;
    var startIndex = 0;
    for (startIndex = 0; startIndex < dialogStartTimes.length; startIndex++) {
      if (dialogStartTimes[startIndex] < dialogCloseTimes[index]) {
        startTime = dialogStartTimes[startIndex];
      } else {
        break;
      }
    }
    var closeTime = dialogCloseTimes[index];
    if (storyEndTime < closeTime) {
      closeTime = storyEndTime;
    }
    pairTimes[index] = {
      'startTime': startTime, 
      'closeTime': closeTime,
      'diffTime':  closeTime - startTime,
    };    
  }  

  return pairTimes;
}

function loadTime_getTotalDialogTime(dialogTime,storyEndTime) {

  console.log('dialogTime = ' + dialogTime);    

  var dialogStartTimes = loadTime_getDialogTimes(dialogTime,"s");    
  for (index = 0; index < dialogStartTimes.length; index++) {
    console.log('st = ' + dialogStartTimes[index]);    
  }

  var dialogCloseTimes = loadTime_getDialogTimes(dialogTime,"c");    
  for (index = 0; index < dialogCloseTimes.length; index++) {
    console.log('ct = ' + dialogCloseTimes[index]);    
  }

  var totalDialogTime = 0;
  var dialogPairTimes = loadTime_pairDialogTimes(dialogStartTimes,dialogCloseTimes,storyEndTime);
  for (index = 0; index < dialogPairTimes.length; index++) {
    console.log(
      'pt st = ' + dialogPairTimes[index].startTime + 
      ' ct = ' + dialogPairTimes[index].closeTime + 
      ' diff = ' + dialogPairTimes[index].diffTime
    );    
    totalDialogTime += dialogPairTimes[index].diffTime;
  }

  return Math.round(totalDialogTime / 1000);
}

function loadTimeResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];  

    // for the storyTime...
    // get total time spent in dialogs

    var dialogTime = result.storyDialogTime; 
    var totalDialogTime = loadTime_getTotalDialogTime(dialogTime,result.storyEndTime);
    console.log('totalDialogTime = '+totalDialogTime);

    var storyTime = result.storyTime - totalDialogTime;

    // for the storyPracticeTime...
    // get total time spent in dialogs

    dialogTime = result.storyPracticeDialogTime; 
    totalDialogTime = loadTime_getTotalDialogTime(dialogTime,result.storyPracticeEndTime);
    console.log('totalDialogTime = '+totalDialogTime);

    var storyPracticeTime = result.storyPracticeTime - totalDialogTime;    
        
    var insert = "INSERT INTO " + result_table + 
      " (TestNumber, QuestionPracticeTime, StoryPracticeTime, QuestionTime, StoryTime) VALUES(" + 
      "'" + result.testNumber + "', " + 
      "'" + result.questionPracticeTime + "', " +        
      "'" + storyPracticeTime + "', " +
      "'" + result.questionTime + "', " +
      "'" + storyTime + "')";
        
    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) { throw err; }
        console.log('insert complete');
      }
    );
        
    console.log("insert = " + insert);  

  } // resultsloop

}