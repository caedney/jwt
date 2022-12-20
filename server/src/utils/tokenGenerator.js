require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenGenerator(id) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 }); // 24hrs
}

module.exports = tokenGenerator;
