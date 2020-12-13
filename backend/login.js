var app = require("express");
var database = require('./database-connection');
var loginRouter = app.Router();
var auth = require('./auth');

loginRouter.post("/", function (req, res) {
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;
  var usersTable = database.then((db) => db.getTable("users"));

  function getUserData(result) {
    return result
      .select(["first_name", "last_name", "id", "role_id"])
      .where("phone_number = :phonenumber && password = :password")
      .bind("phonenumber", phonenumber)
      .bind("password", password)
      .execute();
  }

  usersTable
    .then((tbl) => getUserData(tbl))
    .then((result) => {
      let row = result.fetchOne();
      if (row && row.length) {
        const userInfo = {
          id: row[2],
          rolesid: row[3],
          firstname: row[0],
          lastname: row[1],
        }
        let token = auth.signToken(userInfo);
        res.status(200).send({ isAuthorized: true, token: token, data: userInfo });
        res.end();
      }
    })
    .catch((message) => {
      res.status(404).send(message);
      res.end();
    });
});

module.exports = loginRouter;
