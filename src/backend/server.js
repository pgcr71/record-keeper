var express = require('express');
var auth = require('./auth');
var CircularJSON = require('circular-json');
var app = express();
var bodyParser = require('body-parser');
const mysqlx = require('@mysql/xdevapi');
const configs = require('./configurations');

var database = mysqlx.getSession(configs.dataBaseConfig)
  .then(session => {
    return session.getSchema('recordkeeper');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.get('/',function (req, res) {

  res.sendFile('index.html',__dirname);
});

app.post('/validatePhoneNumber', function (req, res) {
  var phonenumber = req.body.phonenumber;
  database.then(db => db.getTable('tblusers').select(['phone_number'])
  .where('phone_number = :phonenumber')
  .bind('phonenumber', phonenumber)
  .execute()).then(result => {
    var row = result.fetchOne();
    if (row && row.length) {
      res.status(200).send({ isPhoneNumberValid: true });
    } else {
      res.status(200).send({ isPhoneNumberValid: false });
    }
  })
})


app.post('/signup', function (req, res) {
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;

  var table = database
  .then(x => {
    return x.getTable('tblusers')
  }); 

  table.then(tbl => tbl.insert({
    user_name: username,
    password: password,
    phone_number: phonenumber,
    first_name: firstname,
    last_name: lastname
  }).execute()
  ).catch(error => {
    res.status(401).send('unAuthorized');
    res.end();
  }).then(() => {
    auth.signToken({
      user_name: username,
      password: password,
      phone_number: phonenumber,
      first_name: firstname,
      last_name: lastname
    })
  })
  res.status(200).send({signup:'successfull'})
})


app.post('/login', function (req, res) {

  let phonenumber = req.body.phonenumber;
  let password = req.body.password;

  database.then(db => db.getTable('tblusers').select(['phone_number', 'password'])
    .where('phone_number = :phonenumber && password = :password')
    .bind('phonenumber', phonenumber)
    .bind('password', password)
    .execute()).then(result => {
      var row = result.fetchOne();
      if (row.length) {
        let token = auth.signToken({ phonenumber });
        res.status(200).send({ isAuthorized: true, token: token });
        res.end();
      } else {
        res.status(200).send({ isAuthorized: false });
        res.end();
      }
    }).catch(error => {
      if(error){
      res.status(200).send({ isAuthorized: false });
      res.end();
      }
    })
})

app.listen(4300, function () {
  console.log('The web server is running. Please open http://localhost:4300/ in your browser.');
});