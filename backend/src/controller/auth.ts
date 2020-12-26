import jwt from 'jsonwebtoken';
const configs = require('./configurations');

let secretOrPublicKey = configs.publicKey;

export function verify(req, res, next) {
    var bearer = req.headers['authorization'];
    var token = bearer && bearer.split(' ')[1];
    if (token) {
        var decodedData = verifyJWT(token, res);
        req.decodedData = decodedData;
        next();
    }
    else {
        res.status(401).send({ token:false,authorized: false,message:'You might have cleared your cache. Please log in again' });
    }

}

export function verifyJWT(token, res) {
    try {
        return jwt.verify(token, secretOrPublicKey);
    }
    catch{
        res.status(401).send({token:true, authorized: false, message: 'Your session has expired. Please log in again'});
    }
}


export function signToken(userInfo) {
    return jwt.sign(userInfo, secretOrPublicKey, { expiresIn: '1h' })
}

