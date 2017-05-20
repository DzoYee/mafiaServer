const roomController = require('../controllers/roomController.js');

module.exports = function(app) {
  app.route('/dog')
    .get(function(req, res, next) {
      res.send({dog: "dog"});
    });


}