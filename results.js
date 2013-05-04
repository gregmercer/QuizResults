/***

http://quiz-gmercer.dotcloud.com/

var results = Results.find({}); 

$.each(results.collection.docs, function (doc) { 

  console.log(JSON.stringify(results.collection.docs[doc])); 

});

TestNumber,Question,Answer,Correct
123,q1,q1a2,Yes

***/

var results = [
  {"testNumber":"3102x","answers":[{"questionId":"q1","answer":"q1a2"},{"questionId":"q2","answer":"q2a1"},{"questionId":"q3","answer":"q3a3"},{"questionId":"q4","answer":"q4a1"},{"questionId":"q5","answer":"q5a4"},{"questionId":"q6","answer":"q6a3"},{"questionId":"q7","answer":"q7a3"},{"questionId":"q8","answer":"q8a4"},{"questionId":"q9","answer":"q9a4"},{"questionId":"q10","answer":"q10a2"}],"words":["p1.encontró[Pret]","p1.Daba[Imp]","p1.poseía[Pret]","p1.sacrificaron[Pret]","p2.construyeron[Pret]","p2.admiraban.[Imp]","p2.dieron[Pret]","p3.empezaron[Pret]","p3.adoraba[Imp]","p3.demostraban[Imp]","p4.colocaron[Pret]","p4.hacia[Imp]","p5.encontró[Pret]","p5.Estaba[Imp]","p5.honraban[Imp]","p5.colocaron[Pret]"],"storyTime":273,"questionTime":155} 
, {"testNumber":"2103x","answers":[{"questionId":"q1","answer":"q1a3"},{"questionId":"q2","answer":"q2a1"},{"questionId":"q3","answer":"q3a2"},{"questionId":"q4","answer":"q4a1"},{"questionId":"q5","answer":"q5a4"},{"questionId":"q6","answer":"q6a4"},{"questionId":"q7","answer":"q7a1"},{"questionId":"q8","answer":"q8a4"},{"questionId":"q9","answer":"q9a3"},{"questionId":"q10","answer":"q10a1"}],"words":["p4.hacia","p4.fuera","p4.incluía","p5.Estaba","p5.vuelto","p5.hacia","p5.podía","p5.honraban"],"storyTime":335,"questionTime":359}
, {"testNumber":"1104x","answers":[{"questionId":"q1","answer":"q1a1"},{"questionId":"q2","answer":"q2a1"},{"questionId":"q3","answer":"q3a2"},{"questionId":"q4","answer":"q4a4"},{"questionId":"q5","answer":"q5a4"},{"questionId":"q6","answer":"q6a3"},{"questionId":"q7","answer":"q7a1"},{"questionId":"q8","answer":"q8a4"},{"questionId":"q9","answer":"q9a1"},{"questionId":"q10","answer":"q10a2"}],"words":[],"storyTime":370,"questionTime":145}
, {"testNumber":"3005x","answers":[{"questionId":"q1","answer":"q1a4"},{"questionId":"q2","answer":"q2a1"},{"questionId":"q3","answer":"q3a2"},{"questionId":"q4","answer":"q4a3"},{"questionId":"q5","answer":"q5a4"},{"questionId":"q6","answer":"q6a1"},{"questionId":"q7","answer":"q7a3"},{"questionId":"q8","answer":"q8a2"},{"questionId":"q9","answer":"q9a1"},{"questionId":"q10","answer":"q10a2"}],"words":["p1.encontró[Pret]","p1.Daba[Imp]","p1.poseía[Imp]","p1.sacrificaron[Pret]","p2.construyeron","p2.admiraban.[Imp]","p2.era[Imp]","p2.dieron[Pret]","p3.empezaron[Pret]","p3.adoraba[Imp]","p3.pusieron[Pret]","p3.demostraban[Imp]","p4.colocaron[Pret]","p5.encontró[Pret]","p5.Estaba[Imp]","p5.hacia","p5.abajo,","p5.podía[Imp]","p5.honraban[Imp]","p5.trasladaron[Pret]","p5.colocaron[Pret]"],"storyTime":502,"questionTime":166}
];

module.exports.all = results;
