var http = require('http');

function main(request,response){
    response.end('1233');
}

var server = http.createServer(main);
server.listen(4300);

