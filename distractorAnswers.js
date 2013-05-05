/*

p1

sabe

p2

conoce
es
Es

p3

supone
tiene
son
son

p4

cuelga
indica
alimenten
simboliza

p5

está

*/

var distractorAnswers = [
    "p1.sabe"
  , "p2.conoce"  
  , "p2.es"  
  , "p2.Es"
  , "p3.supone"
  , "p3.tiene"
  , "p3.son" 
  , "p3.son" 
  , "p4.cuelga"
  , "p4.indica"
  , "p4.alimenten"
  , "p4.simboliza" 
  , "p5.está"  
];

module.exports.all = distractorAnswers;

module.exports.find = function(word) {

  // strip any mark off the word
  var index = word.indexOf("[");
  if (index != -1) {
    word = word.substring(0,index--);
  }  

  var found = false;
  wordsloop: for (word_index in distractorAnswers) {
    var distractorWord = distractorAnswers[word_index];
    if (distractorWord == word) {
      found = true;
      break wordsloop;
    }
  };
  
  return found;
}