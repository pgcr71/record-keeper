var jwt = require('jsonwebtoken');
const configs = require('./configurations');

let secretOrPublicKey = configs.publicKey;

function verify(req, res, next) {
    var bearer = req.headers['authorization'];
    if (bearer) {
        var token = bearer.split(' ')[1];
        verifyJWT(token, res);
        next();
    }
    else {
        res.status(401).send({ authorized: false });
    }

}

function verifyJWT(token, res) {
    try {
        jwt.verify(token, secretOrPublicKey);
        return;
    }
    catch{
        res.status(401).send({ authorized: false });
    }
}


function signToken(userInfo) {
    return jwt.sign(userInfo, secretOrPublicKey, { expiresIn: '1h' })
}

module.exports.verify = verify;
module.exports.signToken = signToken;