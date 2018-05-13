const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      chatController = require('../controllers/chatController'),
      verifyToken = require('../controllers/verifyToken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/main', verifyToken, chatController.main);

router.get('/mainVerified', chatController.mainVerified);

module.exports = router; 
