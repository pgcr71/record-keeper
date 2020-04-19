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
  usersTable.then(tbl => getUserTblData(tbl)).then((result) => {
    row = result.fetchOne();
    if (row && row.length) {
      return userRolesMapTable.then(tbl => getUserRole(tbl, row[2]));
    } else {
      return Promise.reject({ message: 'User Not Found', code: 0, isAuthorized: false })
    }
  }).then(data => {
    if (data) {
      let row1 = data.fetchOne()
      let token = auth.signToken({
        'id': row[2],
        'rolesid': row1[0],
        'firstname': row[0],
        'lastname': row[1]
      })
      res.status(200).send({ isAuthorized: true, token: token });
      res.end();
    }
    else {
      Promise.reject({ message: 'User Role Not Found', code: 1, isAuthorized: false })
    }
  }).catch((message) => {
    console.log(message)
    res.status(404).send(message);
    res.end();
  })
})

app.get('/stock', auth.verify, function (req, res, next) {

  database.then(x => {
    return x.getTable('inventory').select('name', 'quantity', 'price','id').execute()
  }).then(data => {
    var rows = data.fetchAll();
    res.status(200).send({ data: rows, message: 'Data fetched succesfully' });
  }).catch()

})

app.post('/stock', auth.verify, function (req, res, next) {
  if (req && req.decodedData && (req.decodedData.rolesid != 1 && req.decodedData.rolesid != 3)) {
    res.status(200).send({ isAuthorized: false, message: 'You do not have permissions to perform this operation' });
    return
  }

  var id = uuid.v4();

  var inventoryTbl = database
    .then(x => {
      return x.getTable('inventory');
    });

  inventoryTbl.then(result => {
    return result.insert("id", "userid", "name", "quantity","price")
      .values(id, req.decodedData.id, req.body.name, req.body.quantity, req.body.price)
      .execute();
  }).then(obj => {
    res.status(200).send({
      done: true,
      message: 'Data inserted succesfully'
    });
  }).catch(error => {
    res.status(409).send({
      done: false,
      message: error.info.msg
    });
  })
})

app.post('/finance', auth.verify, function (req, res, next) {
  if (req && req.decodedData && (req.decodedData.rolesid != 4 && req.decodedData.rolesid != 3)) {
    res.status(200).send({ isAuthorized: false, message: 'You do not have permissions to perform this operation' });
    return
  }

  var id = uuid.v4();
  database
    .then(session => session.getTable('user_finance'))
    .then(tbl => tbl.insert('id', 'inserted_by', 'product_id', 'product_name', 'quantity', 'price', 'phone_number', 'email', 'product_given_to')
      .values(id, req.decodedData.id, req.body.productId, req.body.productName, req.body.quantity, req.body.price, req.body.phoneNumber, req.body.email, req.body.productGivenTo)
      .execute()).then(obj => res.status(200).send({
        done: true,
        message: 'Data inserted succesfully'
      })).catch(error => {
        res.status(409).send({
          done: false,
          message: error.info.msg
        });
      })
})

app.get('/finance', auth.verify, function (req, res, next) {
  if (req && req.decodedData && (req.decodedData.rolesid != 4 && req.decodedData.rolesid != 3)) {
    database
      .then(db => db.getTable('user_finance'))
      .then(tbl => tbl.select().where('phone_number=:phone_number').bind('phone_number', req.decodedData.phoneNumber).execute())
      .then(results => res.status(200).send({ data: results.fetchAll(), message: "Data fetched Succesfully" })
      )
    return;
  } else {
    database
      .then(db => db.getTable('user_finance'))
      .then(tbl => tbl.select().execute())
      .then(results => res.status(200).send({ data: results.fetchAll(), message: "Data fetched Succesfully" }))
    return;
  }
});

app.listen(4300, function () {
  console.log('The web server is running. Please open http://localhost:4300/ in your browser.');
});
