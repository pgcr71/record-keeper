var express = require('express');
var auth = require('./auth');
var CircularJSON = require('circular-json')
  //set an instance of exress
  app = express();


app.use(function (req, res, next) {
  console.log('da')
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//tell express what to do when the / route is requested
app.get('/',auth,function (req, res) {
  res.header('Content-Type', 'text/json');
 // console.log(JsonCircular.stringify(req))
 var t = {
   req:req,
  
 }
 res['token'] = 'ganes'
 console.log(res.headers)
   res.write(CircularJSON.stringify(t))
    
  res.end()
});


//wait for a connection
app.listen(4300, function () {
  console.log('The web server is running. Please open http://localhost:4300/ in your browser.');
});