
var questionAnswers = [
    { "questionId":"pq1", "answer":"pq1a2" }  
  , { "questionId":"pq2", "answer":"pq2a3" }  
  , { "questionId":"pq3", "answer":"pq3a2" }  
  , { "questionId":"pq4", "answer":"pq4a4" } 
  , { "questionId":"q1", "answer":"q1a3" }  
  , { "questionId":"q2", "answer":"q2a4" }  
  , { "questionId":"q3", "answer":"q3a1" }  
  , { "questionId":"q4", "answer":"q4a1" }  
  , { "questionId":"q5", "answer":"q5a1" }  
  , { "questionId":"q6", "answer":"q6a4" } 
  , { "questionId":"q7", "answer":"q7a2" }  
  , { "questionId":"q8", "answer":"q8a3" }  
  , { "questionId":"q9", "answer":"q9a3" }  
  , { "questionId":"q10", "answer":"q10a4" }  
  , { "questionId":"q11", "answer":"q11a1" }  
  , { "questionId":"q12", "answer":"q12a4" }  
  , { "questionId":"q13", "answer":"q13a1" }  
  , { "questionId":"q14", "answer":"q14a3" }  
  , { "questionId":"q15", "answer":"q15a1" }  
  , { "questionId":"q16", "answer":"q16a1" }  
  , { "questionId":"q17", "answer":"q17a4" }  
  , { "questionId":"q18", "answer":"q18a1" }
  , { "questionId":"q19", "answer":"q19a1" } 
  , { "questionId":"q20", "answer":"q20a2" }             
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


