var storyAnswers = [
    "p1.encontró[Pret]"    
  , "p1.Daba[Imp]"
  , "p1.poseía[Imp]"
  , "p1.sacrificaron[Pret]" 
  , "p2.construyeron[Pret]"
  , "p2.admiraban.[Imp]"
  , "p2.era[Imp]"
  , "p2.dieron[Pret]"
  , "p3.empezaron[Pret]"
  , "p3.adoraba[Imp]"
  , "p3.pusieron[Pret]"
  , "p3.demostraban[Imp]"
  , "p4.colocaron[Pret]"
  , "p4.incluía[Imp]"
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
