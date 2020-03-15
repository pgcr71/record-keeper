var jwt = require('jsonwebtoken');
var userData = require('./dummydatabase');

let secretOrPublicKey = 'hello ganesh'
function verify(req, res, next) {
    var bearer = req.headers['authorization'];
    if (bearer) {
        var token = bearer.split(' ')[1];
        verifyJWT(token,res);
        next();
    }
    else {
        res.status(401).send({});
        res.end();
    }
   
}

function verifyJWT(token ,res) {
    try{
        jwt.verify(token, secretOrPublicKey);
        return;
    }
    catch{
        res.status(401).send('unAuthorized');
        res.end();
    }
}


function signToken(userInfo){
    return jwt.sign(userInfo,secretOrPublicKey,{ expiresIn: '1h' })
}
 
module.exports.verify = verify;
module.exports.signToken = signToken;