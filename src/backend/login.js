
function login (req, res) {
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    database.then(db => db.getTable('tblusers').select(['phone_number', 'password'])
      .where('phone_number = :phonenumber && password = :password')
      .bind('phonenumber', phonenumber)
      .bind('password', password)
      .execute()).then(result => {
        var row = result.fetchOne();
        if (row && row.length) {
          let token = auth.signToken({ phonenumber });
          res.status(200).send({ isAuthorized: true, token: token });
          res.end();
        } else {
          res.status(200).send({ isAuthorized: false });
          res.end();
        }
      }).catch(error => {
        res.status(200).send({ isAuthorized: false });
        res.end();
      })
  }

  module.exports = login;