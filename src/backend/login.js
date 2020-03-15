var data = require('./dummydatabase');

export function verifylogin(req,res) {
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    var index = data.findIndex((userInfo) => {
        userInfo.phonenumber == phonenumber && userInfo.password == password
    })

    if(index <0){
        
    }
}