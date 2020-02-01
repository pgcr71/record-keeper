 var jwt = require('jsonwebtoken');
 
 let secretOrPublicKey = 'hello ganesh'
 function auth(req,res,next){
     if(req.headers['autorization']){

     }
    //jwt.verify('', secretOrPublicKey, )
     //jwt.sign()
     else{
         res.statusMessage = 'unautorized';
         res.status('401').send('unautorized');
         res.end();
     }
     console.log('authentication hapenning');
    next();
}


module.exports = auth;