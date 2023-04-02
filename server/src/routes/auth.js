const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');
const tokenGenerator = require('../utils/tokenGenerator');
const verifyCredentials = require('../middleware/verifyCredentials');
const verifyToken = require('../middleware/verifyToken');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/**
 * Create new user
 */
router.post('/register', verifyCredentials, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Select user with submitted email address
    const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // Return Unauthenticated status code if user exists
    if (checkUser.rows.length > 0) {
      return res.status(401).send({ message: 'User already exists' });
    }

    // Decrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await db.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, bcryptPassword]
    );

    // Generate new token
    const accessToken = tokenGenerator(user.rows[0].id);

    return res.json({
      id: user.rows[0].id,
      first_name: user.rows[0].first_name,
      last_name: user.rows[0].last_name,
      email: user.rows[0].email,
      accessToken,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
});

/**
 * Sign in
 */
router.post('/sign-in', verifyCredentials, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Select user with submitted email address
    const user = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // Return Unauthenticated status code if user doesn't exist
    if (user.rows.length < 1) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the password matches in database
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (isPasswordValid === false) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password',
      });
    }

    // Generate new token
    const accessToken = tokenGenerator(user.rows[0].id);

    return res.json({
      id: user.rows[0].id,
      first_name: user.rows[0].first_name,
      last_name: user.rows[0].last_name,
      email: user.rows[0].email,
      accessToken,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
});

/**
 * Verified
 */
router.get('/verify', verifyToken, async (req, res) => {
  try {
    return res.json({
      verified: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
});

module.exports = router;
