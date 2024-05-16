const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../modules/users/users.controller");
router.use(bodyParser.json());

router.put("/:id", (req, res) => userController.update(req, res));

router.delete("/:id", (req, res) => userController.remove(req, res));

router.post("/", (req, res) => userController.create(req, res));

// router.get("/all/:username", (req, res) =>
//   userController.getByUserName(req, res)
// );

module.exports = router;
