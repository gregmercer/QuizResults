
var confusionAnswers = [
    "p4.hacia"
  , "p5.hacia"
];

module.exports.all = confusionAnswers;

module.exports.find = function(word) {

  // strip any mark off the word
  var index = word.indexOf("[");
  if (index != -1) {
    word = word.substring(0,index--);
  }  

  var found = false;
  wordsloop: for (word_index in confusionAnswers) {
    var confusionWord = confusionAnswers[word_index];
    if (confusionWord == word) {
      found = true;
      break wordsloop;
    }
  };
  
  return found;
}