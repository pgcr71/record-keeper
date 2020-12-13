var app = require("express");
var searchRouter = app.Router();
let database = require("./database-connection");
let auth = require("./auth");

searchRouter.post('/', auth.verify, function (req, res) {
  var searchTerm = req.body.searchTerm;
  console.log(searchTerm)
    database.then(db => db.getTable('users').select('phone_number','first_name', 'id').where('phone_number like :searchTerm OR first_name like :searchTerm')
    .bind('searchTerm', `${searchTerm}%`)
    .execute()).then(result => {
      var rows = result.fetchAll() || [];
        res.status(200).send({ data: rows });
    })
  })

module.exports = searchRouter;
