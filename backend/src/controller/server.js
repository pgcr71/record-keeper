var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var validationRoutes = require('./validate');
var loginRoutes =  require('./login')
var signUpRouter = require('./sign-up');
var productsRouter = require('./product');
var orderRoutes = require('./orders');
const searchRouter = require('./search');

var staticFilesLocation = path.join(__dirname, '..', '..', 'dist/record-keeper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.use('/validate',validationRoutes);

app.use('/login',loginRoutes);

app.use('/signup', signUpRouter);

app.use('/products', productsRouter);

app.use('/orders', orderRoutes);

app.use('/search', searchRouter);

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: staticFilesLocation });
});

app.use('/', express.static(staticFilesLocation))

app.listen(4300, function () {
  console.log('The web server is running. Please open http://localhost:4300/ in your browser.');
});
