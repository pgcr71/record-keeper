var app = require("express");
var productRouter = app.Router();
let database = require("./database-connection");
let auth = require("./auth");
let uuid = require("uuid");

productRouter.get("/all", auth.verify, function (req, res) {
  database
    .then((x) => {
      return x
        .getTable("products")
        .select("name", "quantity", "unit_price", "id")
        .execute();
    })
    .then((data) => {
      var rows = data.fetchAll();
      res.status(200).send({ data: rows, message: "Data fetched succesfully" });
    })
    .catch();
});

productRouter.post("/add", auth.verify, function (req, res) {
  if (
    req &&
    req.decodedData &&
    req.decodedData.rolesid != 2 &&
    req.decodedData.rolesid != 4
  ) {
    res.status(200).send({
      isAuthorized: false,
      message: "You do not have permissions to perform this operation",
    });
    return;
  }

  var id = uuid.v4();

  var inventoryTbl = database.then((x) => {
    return x.getTable("products");
  });

  inventoryTbl
    .then((result) => {
      return result
        .insert("id", "name", "quantity", "unit_price", "created_by")
        .values(id, req.body.name, req.body.quantity, req.body.price, req.body.userId)
        .execute();
    })
    .then(() => {
      res.status(200).send({
        done: true,
        message: "Data inserted succesfully",
      });
    })
    .catch((error) => {
      res.status(409).send({
        done: false,
        message: error.info.msg,
      });
    });
});

module.exports = productRouter;
