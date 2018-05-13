const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      authController = require('../controllers/auth'),
      verifyToken = require('../controllers/verifyToken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true }));

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.signup);

module.exports = router;
