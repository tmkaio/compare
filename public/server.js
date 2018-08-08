const ejs = require('ejs');
const express = require('express');
const routes = require('./routes/index.js');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const app = express();

app.use('/public', express.static(process.cwd()));
app.use('/src', express.static(process.cwd() + '/src'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

routes(app);

app.listen(port, function() {
    console.log('Server listening on port ' + port + '…');
});