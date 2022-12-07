require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const app = express();

routes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
