
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Quiz Results - Load, Evaluate, and Report' });
};