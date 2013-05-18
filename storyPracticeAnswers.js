/*

p1

tenía[Imp]
sufrió[Pret]
sobrevivió,[Pret]
quedó[Pret]
era[Imp]
mantenía[Imp]   

p2

hacía[Imp]
pintó[Pret] 
causaban[Imp]
pintaba[Imp] 
utilizaba[Imp] 
apoderó[Pret] 
vieron[Pret] 
murió[Pret]  

*/

var storyPracticeAnswers = [
    "p1.tenía[Imp]"    
  , "p1.sufrió[Pret]"
  , "p1.sobrevivió,[Pret]"
  , "p1.quedó[Pret]"
  , "p1.era[Imp]" 
  , "p1.mantenía[Imp]"
  , "p2.hacía[Imp]"    
  , "p2.pintó[Pret]"         
  , "p2.causaban[Imp]"     
  , "p2.pintaba[Imp]"     
  , "p2.utilizaba[Imp]"     
  , "p2.apoderó[Pret]"     
  , "p2.vieron[Pret]"     
  , "p2.murió[Pret]"            
];

module.exports.all = storyPracticeAnswers;

module.exports.find = function(word,dropMark) {
  var found = false;
  wordsloop: for (word_index in storyPracticeAnswers) {
    var storyWord = storyPracticeAnswers[word_index];
    if (dropMark) {
      var index = storyWord.indexOf("[");
      if (index != -1) {
        storyWord = storyWord.substring(0,index--);
      }
    }
    if (storyWord == word) {
      found = true;
      break wordsloop;
    }
  };
  return found;
}
