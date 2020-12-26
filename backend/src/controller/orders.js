var app = require("express");
var orderRouter = app.Router();
let database = require("./database-connection");
let auth = require("./auth");
let uuid = require("uuid");
let con = require('./sql-query-connection');

orderRouter.post("/create", auth.verify, function (req, res) {
  if (
    req &&
    req.decodedData &&
    req.decodedData.rolesid != 4 &&
    req.decodedData.rolesid != 3
  ) {
    res.status(200).send({
      isAuthorized: false,
      message: "You do not have permissions to perform this operation",
    });
    return;
  }

  database
    .then((session) => session.getTable("orders"))
    .then((tbl) =>
      tbl
        .insert("id", "user_id", "product_id", "quantity", "created_by")
        .values(
          uuid.v4(),
          req.body.userId,
          req.body.productId,
          req.body.quantity,
          req.decodedData.id
        )
        .execute()
    )
    .then(() =>
      res.status(200).send({
        done: true,
        message: "Data inserted succesfully",
      })
    )
    .catch((error) => {
      res.status(409).send({
        done: false,
        message: error.info.msg,
      });
    });
});

orderRouter.get("/all", auth.verify, function (req, res) {
  const sqlStatement = `SELECT orders.user_id, user.user_name,
  orders.quantity, products.name, products.unit_price
  FROM orders inner join products on orders.product_id = products.id
  inner join user on orders.user_id = user.id`;
  if (req && req.decodedData && req.decodedData.rolesid === 1) {
    con
      .then((db) => db.sql(`${sqlStatement} where orders.user_id = :id`).bind("id", req.decodedData.id).execute())
      .then((results) =>
        res.status(200).send({
          data: results.fetchAll(),
          message: "Data fetched Succesfully",
        })
      );
    return;
  } else {
    con.then(db => db.sql(`${sqlStatement}`).execute())
      .then((results) =>
        res.status(200).send({
          data: results.fetchAll(),
          message: "Data fetched Succesfully",
        })
      );
    return;
  }
});

module.exports = orderRouter;
