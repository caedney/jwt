const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./auth');
const dashboard = require('./dashboard');

const routes = (app) => {
  // Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  // API
  app.use('/auth', auth);
  app.use('/dashboard', dashboard);
};

module.exports = routes;
