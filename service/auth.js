const jwt = require('jsonwebtoken');
const secret = "Nikhil$123@"

function setUser(user) {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      }, 
      secret, 
    );                              // returns a token.
}

function getUser(token) {           // token aaya h usko verify krenge.
  if(!token) return null;
  try {
    return jwt.verify(token,secret);   // verify krenge secret key daal kr .
  }
  catch(error){
    return null;
  }

}

module.exports = {
  setUser,
  getUser,
};
