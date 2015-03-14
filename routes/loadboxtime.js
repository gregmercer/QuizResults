
/*
 * GET loadboxtime page.
 */

// quiz results

var results = require("../results");

// mysql

var mysql = require('mysql');

var database = 'fred';
var result_table = 'quiz_boxtime_results';

var client = mysql.createClient({
  host: 'localhost',
  port: '33066',
  user: 'root',
  password: 'root'
});

client.useDatabase(database);

exports.loadboxtime = function(req, res) {

  loadBoxtimeResults();
  res.render('loadboxtime', { title: 'Quiz Results - Load Boxtime Results', ret_string: "status: Load boxtime results complete."} );

};

function loadBoxtimeResults() {

	// loop thru the results

  resultsloop: for (index in results.all) {

    var result = results.all[index];

    var boxTimes = result.storyDialogTime.trim();

    boxTimes = boxTimes.split(" ");

    //console.log(boxTimes);

    var output = 'testNumber = ' + result.testNumber + ' ';

    var outBoxTimes = [];
    var totalBoxTime = 0;
    for ( var index = 0; index < boxTimes.length; index++ ) {
      var sTime = boxTimes[index];
      index++;
      var cTime = boxTimes[index];
      sTime = sTime.replace('s:','');
      cTime = cTime.replace('c:','');
      var boxTime = cTime - sTime;
      output += ' boxTime = ' + boxTime;
      outBoxTimes[outBoxTimes.length] = boxTime;
      totalBoxTime += boxTime;
    }

    console.log(output);
    console.log(outBoxTimes);

    var boxTime1 = '';
    var boxTime2 = '';
    var boxTime3 = '';
    var boxTime4 = '';
    var boxTime5 = '';

    if (outBoxTimes[0] != undefined) {
      boxTime1 = outBoxTimes[0];
    }
    if (outBoxTimes[1] != undefined) {
      boxTime2 = outBoxTimes[1];
    }
    if (outBoxTimes[2] != undefined) {
      boxTime3 = outBoxTimes[2];
    }

    // StoryTime - includes box times

    var insert = "INSERT INTO " + result_table +
        " (TestNumber, BoxTime1, BoxTime2, BoxTime3, BoxTime4, BoxTime5, TotalBoxTime, StoryTime ) VALUES(" +
        "'" + result.testNumber + "', " +
        "'" + boxTime1 + "', " +
        "'" + boxTime2 + "', " +
        "'" + boxTime3 + "', " +
        "'" + boxTime4 + "', " +
        "'" + boxTime5 + "', " +
        "'" + totalBoxTime + "', " +
        "'" + result.storyTime +
        "')";

    client.query(insert,
      function selectCb(err, results, fields) {
        if (err) {
          throw err;
        }
        //console.log('insert complete');
      }
    );

  }	// end resultsloop

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

