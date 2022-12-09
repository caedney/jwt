require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtGenerator(id) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1hr' });
}

module.exports = jwtGenerator;
