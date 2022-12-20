require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const token = req.header('token');

    if (!token) {
      return res.status(403).json('Not Authorised');
    }

    const payload = jwt.verify(token, process.env.SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    return res.status(403).json('Not Authorised');
  }
}

module.exports = verifyToken;
