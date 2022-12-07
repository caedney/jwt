const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// Create user
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Select user with submitted email address
    const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // Return Unauthenticated status code if user exists
    if (checkUser.rows.length > 0) {
      return res.status(401).send('User already exists');
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

    return res.status(200).json({
      user: user.rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
});

module.exports = router;
