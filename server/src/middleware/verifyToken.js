require('dotenv').config();
const jwt = require('jsonwebtoken');

function catchError(err, res) {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(403)
      .send({ message: 'Unauthorized! Access Token was expired!' });
  }

  return res.sendStatus(403).send({ message: 'Unauthorized!' });
}

function verifyToken(req, res, next) {
  try {
    const accessToken = req.headers['authorization'];
    const bearer = new RegExp(/^Bearer\s(.+)/);

    if (!bearer.test(accessToken)) {
      return res.status(401).send({ message: 'Invalid token!' });
    }

    const token = accessToken.replace(bearer, '$1');

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }

      req.user = decoded.user;

      next();
    });
  } catch (error) {
    return res.status(401).send({ message: 'Unauthenticated!' });
  }
}

module.exports = verifyToken;
