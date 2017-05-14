const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./config/routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('listening on port: ',app.get('port'));
});