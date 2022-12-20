const Router = require('express-promise-router');
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    // Select user with user id
    const user = await db.query(
      'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
      [req.user]
    );

    return res.json(user.rows[0]);
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
