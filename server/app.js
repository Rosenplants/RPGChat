/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const morgan = require('morgan');

// initialize the app
const app = express();
module.exports = app;

// set up logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// API routers
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// serve up static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, _next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
