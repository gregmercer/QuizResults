
var questionAnswers = [
    { "questionId":"q1", "answer":"q1a4" }  
  , { "questionId":"q2", "answer":"q2a1" }  
  , { "questionId":"q3", "answer":"q3a4" }  
  , { "questionId":"q4", "answer":"q4a3" }  
  , { "questionId":"q5", "answer":"q5a4" }  
  , { "questionId":"q6", "answer":"q6a1" } 
  , { "questionId":"q7", "answer":"q7a1" }  
  , { "questionId":"q8", "answer":"q8a4" }  
  , { "questionId":"q9", "answer":"q9a1" }  
  , { "questionId":"q10", "answer":"q10a1" }  
];

module.exports.all = questionAnswers;

module.exports.find = function(id) {
  var found = null;
  answersloop: for (answer_index in questionAnswers) {
    var answer = questionAnswers[answer_index];
    if (answer.questionId == id) {
      found = answer;
      break answersloop;
    }
  };
  return found;
}


