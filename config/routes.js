const roomController = require('../controllers/roomController.js');

module.exports = function(app) {
  app.route('/dog')
    .post(function(req, res, next) {
      console.log(req.body);
      res.send({dog: "dog"});
    });


}