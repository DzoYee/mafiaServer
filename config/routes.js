module.exports = function(app) {
  app.route('/dog')
    .get(function(req, res, next) {
      res.send({dog: "dog"});
    });
}