const jwt = require('jsonwebtoken');
const secret = 'thisismysecret';
const localStorage = require('localStorage');


const withAuth = function(req, res, next) {
  const token = localStorage.getItem('token');
  console.log(token);

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = withAuth;