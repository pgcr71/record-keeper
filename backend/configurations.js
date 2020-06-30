var dataBaseConfig = {
    host: 'localhost',
    port: '33060',
    user: 'gani7112',
    password: 'G@ni7112',
    schema: 'recordkeeper',
    debug: true,
};

var poolingSettings =  { enabled: true, maxIdleTime: 30000, maxSize: 25, queueTimeout: 10000 };

var publicKey = 'hello ganesh';

var staticFilesLocation = 'dist/record-keeper'

module.exports.dataBaseConfig = dataBaseConfig;
module.exports.publicKey = publicKey;
module.exports.staticFilesLocation = staticFilesLocation;
module.exports.poolingSettings = poolingSettings;
