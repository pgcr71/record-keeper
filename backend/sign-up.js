var app = require("express");
var signupRouter = app.Router();
const uuid = require("uuid");
var database = require("./database-connection");
var auth = require("./auth");

signupRouter.post("/", function (req, res) {
  let id = uuid.v4();
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  if (!phonenumber || !username || !password) {
    res
      .status(401)
      .send({ signup: false, message: "Please enter all required fields" });
    res.end();
    return;
  }

  var usersTable = database.then((x) => {
    return x.getTable("user");
  });

  function insertDataIntoUsersTable(result) {
    return result
      .insert(
        "id",
        "user_name",
        "password",
        "phone_number",
        "first_name",
        "last_name",
        "registration_status_id",
        "role_id"
      )
      .values(id, username, password, phonenumber, firstname, lastname, 1, 1)
      .execute();
  }

  usersTable
    .then((result) => insertDataIntoUsersTable(result))
    .then((obj) => {
      let token = auth.signToken({
        id: 1,
        rolesid: 1,
        first_name: firstname,
        last_name: lastname,
      });
      res.status(200).send({
        signup: true,
        message: "Welcome" + firstname,
        token: token,
      });
      return obj;
    })
    .catch((error) => {
      console.log(error);
      res.status(401).send({ signup: false, message: "Cant sign you up" });
    });
});

module.exports = signupRouter;
