/*

p1

descubrió[Pret]
daba[Imp]
poseía[Imp]
sacrificaron[Pret]

p2

construyeron[Pret]
admiraban.[Imp]
era[Imp]
dio[Pret]

p3

empezó[Pret]
querían[Imp]
incluyó[Pret]
demostraban[Imp]

p4

pusieron[Pret]
incluían[Imp]

p5

encontró[Pret]
Estaba[Imp]
podía[Imp]
honraban[Imp]
trasladaron[Pret]
colocaron[Pret]

*/

var storyAnswers = [
    "p1.descubrió[Pret]"    
  , "p1.daba[Imp]"
  , "p1.poseía[Imp]"
  , "p1.sacrificaron[Pret]"  
  , "p2.construyeron[Pret]"  
  , "p2.admiraban.[Imp]"  
  , "p2.era[Imp]"  
  , "p2.dio[Pret]"  
  , "p3.empezó[Pret]"
  , "p3.querían[Imp]"
  , "p3.incluyó[Pret]" 
  , "p3.demostraban[Imp]"    
  , "p4.pusieron[Pret]"
  , "p4.incluían[Imp]"
  , "p5.encontró[Pret]"  
  , "p5.Estaba[Imp]"  
  , "p5.podía[Imp]"  
  , "p5.honraban[Imp]"  
  , "p5.trasladaron[Pret]"  
  , "p5.colocaron[Pret]"   
];

module.exports.all = storyAnswers;

module.exports.find = function(word,dropMark) {
  var found = false;
  wordsloop: for (word_index in storyAnswers) {
    var storyWord = storyAnswers[word_index];
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
