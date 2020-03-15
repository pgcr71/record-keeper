function verifyEmail(){

}

function newUser(req,res,next){
   var body = req.body;
   var userName = body.userName;
   var passWord = body.password;
   jwt.sign(req.body)
}
