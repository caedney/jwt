const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./auth');
const dashboard = require('./dashboard');

var corsOptions = {
  origin: 'http://localhost:3000',
};

const routes = (app) => {
  // Middleware
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(express.json());
  // API
  app.use('/auth', auth);
  app.use('/dashboard', dashboard);
};

module.exports = routes;
