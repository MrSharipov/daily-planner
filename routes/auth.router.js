const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authController = require('../modules/auth/auth.controller');

router.use(bodyParser.json());

// register user
router.post('/register', (req, res) => authController.register(req, res));

module.exports = router;