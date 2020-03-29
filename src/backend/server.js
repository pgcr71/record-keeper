var express = require('express');
var auth = require('./auth');
var CircularJSON = require('circular-json');
var app = express();
var bodyParser = require('body-parser');
const mysqlx = require('@mysql/xdevapi');
const configs = require('./configurations');
const uuid = require('uuid');
var path = require('path');

var staticFilesLocation = path.join(__dirname, '..', '..', 'dist/record-keeper');


// var staticFolder =  path.join('../../dist/record-keeper/',__dirname);

var database = mysqlx.getSession(configs.dataBaseConfig)
  .then(session => {
    return session.getSchema('recordkeeper');
  }).catch(error => {

  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: staticFilesLocation });
});

app.use('/', express.static(staticFilesLocation))

app.post('/validatePhoneNumber', function (req, res) {
  var phonenumber = req.body.phonenumber;
  database.then(db => db.getTable('tblusers').select(['phone_number'])
    .where('phone_number = :phonenumber')
    .bind('phonenumber', phonenumber)
    .execute()).then(result => {
      var row = result.fetchOne();
      if (row && row.length) {
        res.status(200).send({ isPhoneNumberValid: false });
      } else {
        res.status(200).send({ isPhoneNumberValid: true });
      }
    })
})



app.post('/validateUsername', function (req, res) {
  var username = req.body.username;
  database.then(db => db.getTable('tblusers').select(['user_name'])
    .where('user_name = :username')
    .bind('username', username)
    .execute()).then(result => {
      var row = result.fetchOne();
      if (row && row.length) {
        res.status(200).send({ valid: false });
      } else {
        res.status(200).send({ valid: true });
      }
    })
})

app.post('/signup', function (req, res) {

  let id = uuid.v4();
  let rolesid = uuid.v4();
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;

  if (!phonenumber || !username || !password) {
    res.status(401).send({ signup: false, message: 'Please enter all required fields' });
    res.end();
    return
  }

  var usersTable = database
    .then(x => {
      return x.getTable('tblusers');
    });

  var userRolesMapTable = database.then(x => {
    return x.getTable('user_roles_map');
  })

  function insertDataIntoUsersTable(result) {
    return result.insert("id", "user_name", "password", "phone_number", "first_name", "last_name")
      .values(id, username, password, phonenumber, firstname, lastname).execute();
  }

  function insertDataIntoUserRolesMapTable(result) {
    return result.insert("id", "userid", "rolesid")
      .values(rolesid, id, 2).execute();
  }

  Promise.all([usersTable, userRolesMapTable]).then((results => {
    return Promise.all([
      insertDataIntoUsersTable(results[0]),
      insertDataIntoUserRolesMapTable(results[1])
    ])
  })).then(obj => {
    let token = auth.signToken({
      id: id,
      rolesid: rolesid,
      first_name: firstname,
      last_name: lastname
    })
    res.status(200).send({ signup: true, message: 'Awesome, you are signed up', token: token });
    return obj;
  }).catch(error => {
    console.log(error)
    res.status(401).send({ signup: false, message: 'Cant sign you up' });
  })
})

app.post('/login', function (req, res) {
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;

  var usersTable = database.then(db => db.getTable('tblusers'));
  var userRolesMapTable = database.then(db => db.getTable('user_roles_map'));

  function getUserTblData(result) {
    return result.select(['first_name', 'last_name', 'id'])
      .where('phone_number = :phonenumber && password = :password')
      .bind('phonenumber', phonenumber)
      .bind('password', password)
      .execute()
  }

  function getUserRole(result, userid) {
    return result.select(['rolesid'])
      .where('userid = :userid')
      .bind('userid', userid)
      .execute()
  }

  let row = [];
  usersTable.then(tbl => getUserTblData(tbl)).then(result => {
    row = result.fetchOne();
    if (row && row.length) {
      return userRolesMapTable.then(tbl => getUserRole(tbl, row[2]));
    } else {
      res.status(200).send({ isAuthorized: false });
      res.end();
    }
  }).then(data => {
    let row1 = data.fetchOne()
    let token = auth.signToken({
      'id': row[2],
      'rolesid': row1[0],
      'firstname': row[0],
      'lastname': row[1]
    })
    res.status(200).send({ isAuthorized: true, token: token });
    res.end();
  }).catch(error => {
    console.log('error')
    res.status(200).send({ isAuthorized: false });
    res.end();

  })
})

app.listen(4300, function () {
  console.log('The web server is running. Please open http://localhost:4300/ in your browser.');
});