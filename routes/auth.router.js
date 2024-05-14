const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authController = require("../modules/auth/auth.controller");

router.use(bodyParser.json());

// register user
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
