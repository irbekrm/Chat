require('dotenv').load();
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      db = require('./db'),
      auth = require('./routes/auth');

  app.set('views', './views');
  app.set('view engine', 'pug');

  app.use('/auth', auth);

  app.get('/', (req, res) => {
    res.render('index');
  });
 
module.exports = app;
