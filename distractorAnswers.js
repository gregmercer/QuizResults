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
    "p1w20.sabe"
  , "p2w27.conoce"  
  , "p2w51.es"  
  , "p2w63.Es"
  , "p3w1.supone"
  , "p3w18.tiene"
  , "p3w34.son" 
  , "p3w54.son" 
  , "p4w22.cuelga"
  , "p4w29.indica"
  , "p4w34.alimenten"
  , "p4w56.simboliza" 
  , "p5w75.está"  
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