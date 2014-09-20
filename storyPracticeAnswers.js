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
    "p1w13.tenía[Imp]"    
  , "p1w16.sufrió[Pret]"
  , "p1w25.sobrevivió,[Pret]"
  , "p1w32.quedó[Pret]"
  , "p1w45.era[Imp]" 
  , "p1w53.mantenía[Imp]"
  , "p2w1.hacía[Imp]"    
  , "p2w12.pintó[Pret]"         
  , "p2w29.causaban[Imp]"     
  , "p2w34.pintaba[Imp]"     
  , "p2w45.utilizaba[Imp]"     
  , "p2w74.apoderó[Pret]"     
  , "p2w89.vieron[Pret]"     
  , "p2w97.murió[Pret]"  
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
