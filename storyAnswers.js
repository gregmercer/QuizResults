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
    "p1w6.descubrió[Pret]"    
  , "p1w25.daba[Imp]"
  , "p1w43.poseía[Imp]"
  , "p1w66.sacrificaron[Pret]"  
  , "p2w2.construyeron[Pret]"  
  , "p2w11.admiraban.[Imp]"  
  , "p2w18.era[Imp]"  
  , "p2w43.dio[Pret]"  
  , "p3w6.empezó[Pret]"
  , "p3w28.querían[Imp]"
  , "p3w50.incluyó[Pret]" 
  , "p3w65.demostraban[Imp]"    
  , "p4w6.pusieron[Pret]"
  , "p4w45.incluían[Imp]"
  , "p5w1.encontró[Pret]"  
  , "p5w10.Estaba[Imp]"  
  , "p5w22.podía[Imp]"  
  , "p5w32.honraban[Imp]"  
  , "p5w53.trasladaron[Pret]"  
  , "p5w62.colocaron[Pret]"   
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
