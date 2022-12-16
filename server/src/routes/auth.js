const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validCredentials = require('../middleware/validCredentials');
const authorisation = require('../middleware/authorisation');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/**
 * Create new user
 */
router.post('/register', validCredentials, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Select user with submitted email address
    const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // Return Unauthenticated status code if user exists
    if (checkUser.rows.length > 0) {
      return res.status(401).json('User already exists');
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
    const token = jwtGenerator(user.rows[0].id);

    return res.json({ token });
  } catch (error) {
    return res.status(500);
  }
});

/**
 * Sign in
 */
router.post('/sign-in', validCredentials, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Select user with submitted email address
    const user = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // Return Unauthenticated status code if user doesn't exist
    if (user.rows.length < 1) {
      return res.status(401).json('Email or Password is incorrect');
    }

    // Check if the password matches in database
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json('Email or Password is incorrect');
    }

    // Generate new token
    const token = jwtGenerator(user.rows[0].id);

    return res.json({ token });
  } catch (error) {
    return res.status(500);
  }
});

/**
 * Verified
 */
router.get('/verified', authorisation, async (req, res) => {
  try {
    return res.json({
      verified: true,
    });
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
