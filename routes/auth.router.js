const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authController = require("../modules/users/users.controller");

router.use(bodyParser.json());

// register user
router.post("/register", (req, res) => authController.register(req, res));
router.post("/register", (req, res) => authController.register(req, res));

module.exports = router;
