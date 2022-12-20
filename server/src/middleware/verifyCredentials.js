function verifyCredentials(req, res, next) {
  const { email, firstName, lastName, password } = req.body;

  function isValidEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    if (![email, firstName, lastName, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!isValidEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  }

  if (req.path === '/sign-in') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!isValidEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  }

  next();
}

module.exports = verifyCredentials;
