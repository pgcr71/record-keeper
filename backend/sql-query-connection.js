const mysqlx = require("@mysql/xdevapi");
const configs = require("./configurations");

var client = mysqlx.getClient(configs.dataBaseConfig, {
  pooling: configs.poolingSettings,
});

const session = client
.getSession(configs.dataBaseConfig)

module.exports =  session;
