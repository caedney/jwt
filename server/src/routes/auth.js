const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/**
 * Create new user
 */
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

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
      [first_name, last_name, email, bcryptPassword]
    );

    // Generate new token
    const token = jwtGenerator(user.rows[0].id);

    return res.json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
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
    console.log(error.message);
    return res.status(500);
  }
});

module.exports = router;
