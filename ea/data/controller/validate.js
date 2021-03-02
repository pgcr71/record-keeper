var app = require('express');
var validationRouter = app.Router();
var database = require('./database-connection');

validationRouter.post('/phonenumber', function (req, res) {
  var phonenumber = req.body.phonenumber;
  database.then(db => db.getTable('users').select(['phone_number'])
    .where('phone_number = :phonenumber')
    .bind('phonenumber', phonenumber)
    .execute()).then(result => {
      var row = result.fetchOne();
      if (row && row.length) {
        res.status(200).send({ valid: false });
      } else {
        res.status(200).send({ valid: true });
      }
    })
})

validationRouter.post('/username', function (req, res) {
  var username = req.body.username;
  database.then(db => db.getTable('users').select(['user_name'])
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

module.exports = validationRouter;
