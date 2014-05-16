
/*
 * GET loadphase page.
 */

// quiz results  
  
var results = require("../results");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_story_phase_results';
   
var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: ''
});

client.useDatabase(database);

exports.loadphase = function(req, res) {

  loadPhaseResults();

  res.render('loadphase', { title: 'Quiz Results - Load Phase Results', ret_string: "status: Load phase results complete."} );

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
   "storyTimeOut": "",

   "storyTime": 255,
   "storyStartTime": 1398196968352,
   "storyStartTime2": -1,
   "storyStartTime3": -1,
   "storyDialogTime": " s:1398197220889 c:1398197222886",
   "storyEndTime": 1398197222881,
   "storyPracticeTimeOut": "",

*/

function loadPhase_getDialogTimes(dialogTime,timeMarker) {

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

function loadPhase_pairDialogTimes(dialogStartTimes, dialogCloseTimes, endTime) {

  var pairTimes = new Array();

  if (dialogStartTimes.length == dialogCloseTimes.length) {
    for (var index = 0; index < dialogStartTimes.length; index++) {
    var closeTime = dialogCloseTimes[index];
      if (endTime < closeTime) {
        closeTime = endTime;
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
    if (endTime < closeTime) {
      closeTime = endTime;
    }
    pairTimes[index] = {
      'startTime': startTime, 
      'closeTime': closeTime,
      'diffTime':  closeTime - startTime,
    };    
  }  

  return pairTimes;
}

function loadPhase_getTotalDialogTime(dialogTime,startTime,endTime) {

  console.log('dialogTime = ' + dialogTime);    

  var dialogStartTimes = loadPhase_getDialogTimes(dialogTime,"s");    
  for (index = 0; index < dialogStartTimes.length; index++) {
    console.log('st = ' + dialogStartTimes[index]);    
  }

  var dialogCloseTimes = loadPhase_getDialogTimes(dialogTime,"c");    
  for (index = 0; index < dialogCloseTimes.length; index++) {
    console.log('ct = ' + dialogCloseTimes[index]);    
  }

  var totalDialogTime = 0;
  var dialogPairTimes = loadPhase_pairDialogTimes(dialogStartTimes,dialogCloseTimes,endTime);
  for (index = 0; index < dialogPairTimes.length; index++) {
    if (dialogPairTimes[index].startTime >= startTime) {
      console.log(
        'pt st = ' + dialogPairTimes[index].startTime + 
        ' ct = ' + dialogPairTimes[index].closeTime + 
        ' diff = ' + dialogPairTimes[index].diffTime
      );    
      totalDialogTime += dialogPairTimes[index].diffTime;
    }
  }

  return totalDialogTime;
}

function loadPhase_getPhaseInfo(result) {

  // Set the Practice Story Phase Info

  var completedInPhase1 = 'No';
  var completedInPhase2 = 'No';
  var timePhase3 = 'n/a';

  var storyType = 'Practice';

  if (result.storyPracticeStartTime2 == -1) {
    completedInPhase1 = 'Yes';
  } else if (result.storyPracticeStartTime3 == -1) {
    completedInPhase2 = 'Yes';
  } else {
    totalDialogTime = loadPhase_getTotalDialogTime(result.storyPracticeDialogTime,result.storyPracticeStartTime3,result.storyPracticeEndTime);
    console.log('totalDialogTime = '+totalDialogTime);    
    timePhase3 = Math.round( ((result.storyPracticeEndTime - result.storyPracticeStartTime3) - totalDialogTime) / 1000 );
  }

  // Insert Practice Story values  

  var insert = "INSERT INTO " + result_table + 
    " (TestNumber, StoryType, Completed_In_Phase_One, Completed_In_Phase_Two, Time_In_Phase_Three) VALUES(" + 
    "'" + result.testNumber + "', " + 
    "'" + storyType + "', " + 
    "'" + completedInPhase1 + "', " + 
    "'" + completedInPhase2 + "', " +     
    "'" + timePhase3 + "')"; 
    
  client.query(insert,
    function selectCb(err, results, fields) {
      if (err) { throw err; }
      console.log('insert complete');
    }
  );
    
  console.log("insert = " + insert);  

  // Set the Story Phase Info

  completedInPhase1 = 'No';
  completedInPhase2 = 'No';
  timePhase3 = 'n/a';  

  storyType = 'Story';

  if (result.storyStartTime2 == -1) {
    completedInPhase1 = 'Yes';
  } else if (result.storyStartTime3 == -1) {
    completedInPhase2 = 'Yes';
  } else {
    totalDialogTime = loadPhase_getTotalDialogTime(result.storyDialogTime,result.storyStartTime3,result.storyEndTime);
    console.log('totalDialogTime = '+totalDialogTime);    
    timePhase3 = Math.round( ((result.storyEndTime - result.storyStartTime3) - totalDialogTime) / 1000 );
  }

  // Insert Story values  

  var insert = "INSERT INTO " + result_table + 
    " (TestNumber, StoryType, Completed_In_Phase_One, Completed_In_Phase_Two, Time_In_Phase_Three) VALUES(" + 
    "'" + result.testNumber + "', " + 
    "'" + storyType + "', " + 
    "'" + completedInPhase1 + "', " + 
    "'" + completedInPhase2 + "', " +     
    "'" + timePhase3 + "')"; 
    
  client.query(insert,
    function selectCb(err, results, fields) {
      if (err) { throw err; }
      console.log('insert complete');
    }
  );
    
  console.log("insert = " + insert);    

}

function loadPhaseResults() {

  resultsloop: for (index in results.all) {
    
    var result = results.all[index];
    loadPhase_getPhaseInfo(result);
    
  } // resultsloop

}
