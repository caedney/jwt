const jwt = require('jsonwebtoken');
require('dotenv').config();

function authorisation(req, res, next) {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json('Not Authorised');
    }

    const payload = jwt.verify(jwtToken, process.env.SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    return res.status(403).json('Not Authorised');
  }
}

module.exports = authorisation;
