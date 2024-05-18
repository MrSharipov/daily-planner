const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const planController = require("../modules/plans/plans.controller");
router.use(bodyParser.json());

router.put("/:id", (req, res) => planController.update(req, res));

router.delete("/:id", (req, res) => planController.remove(req, res));

router.post("/", (req, res) => planController.create(req, res));

// router.get("/", (req, res) => planController.getByTi(req, res));

module.exports = router;
