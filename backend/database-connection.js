const mysqlx = require("@mysql/xdevapi");
const configs = require("./configurations");

var client = mysqlx.getClient(configs.dataBaseConfig, {
  pooling: configs.poolingSettings,
});

const database = client
.getSession(configs.dataBaseConfig)
.then((session) => session.getSchema("recordkeeper"))
.catch((error) => error);

module.exports =  database;
