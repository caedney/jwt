require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const accessToken = req.headers['authorization'];
    const bearer = new RegExp(/^Bearer\s(.+)/);

    if (bearer.test(accessToken) === false) {
      return res.status(403).json('Not Authorised');
    }

    const token = accessToken.replace(bearer, '$1');
    const payload = jwt.verify(token, process.env.SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    return res.status(403).json('Not Authorised');
  }
}

module.exports = verifyToken;
