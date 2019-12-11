var http = require('http');

function main(request,response){
    response.end('welcome');
}

var server = http.createServer(main);
server.listen(4300);