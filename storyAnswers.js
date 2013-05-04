/*

p1

descubrió[Pret]
sabe
daba[Imp]
poseía[Imp]
sacrificaron[Pret]

p2

construyeron[Pret]
admiraban.[Imp]
era[Imp]
conoce
dio[Pret]
es
Es

p3

supone
empezó[Pret]
tiene
querían[Imp]
son
incluyó[Pret]
son
demostraban[Imp]

p4

pusieron[Pret]
cuelga
indica
alimenten
incluían[Imp]
simboliza

p5

encontró[Pret]
Estaba[Imp]
podía[Imp]
honraban[Imp]
trasladaron[Pret]
colocaron[Pret]
está

*/

var storyAnswers = [
    "p1.descubrió[Pret]"    
  , "p1.sabe"
  , "p1.daba[Imp]"
  , "p1.poseía[Imp]"
  , "p1.sacrificaron[Pret]"  
  , "p2.construyeron[Pret]"  
  , "p2.admiraban.[Imp]"  
  , "p2.era[Imp]"  
  , "p2.conoce"  
  , "p2.dio[Pret]"  
  , "p2.es"  
  , "p2.Es"
  , "p3.supone"
  , "p3.empezó[Pret]"
  , "p3.tiene"
  , "p3.querían[Imp]"
  , "p3.son" 
  , "p3.incluyó[Pret]" 
  , "p3.son" 
  , "p3.demostraban[Imp]"    
  , "p4.pusieron[Pret]"
  , "p4.cuelga"
  , "p4.indica"
  , "p4.alimenten"
  , "p4.incluían[Imp]"
  , "p4.simboliza"
  , "p5.encontró[Pret]"  
  , "p5.Estaba[Imp]"  
  , "p5.podía[Imp]"  
  , "p5.honraban[Imp]"  
  , "p5.trasladaron[Pret]"  
  , "p5.colocaron[Pret]"  
  , "p5.está"  
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
