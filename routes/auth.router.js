const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authController = require("../modules/auth/auth.controller");
const userUpdateDto = require("../helpers/dtos/users/userUpdate.dto");
router.use(bodyParser.json());

// register user
router.post("/register", (req, res) => authController.register(req, res));

router.post("/login", (req, res) => authController.login(req, res));

router.put("/update/:id", (req, res) => userUpdateDto.update(req, res));

router.delete("/delete", (req, res) => authController.login(req, res));

router.post("/create", (req, res) => authController.login(req, res));

router.get("/getByUserName", (req, res) => authController.login(req, res));

module.exports = router;
