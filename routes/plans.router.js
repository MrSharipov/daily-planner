const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const planController = require("../modules/plans/plans.controller");
const { getAuthorization } = require("../middlewares/auth-middleware");
router.use(bodyParser.json());

router.put("/:id", getAuthorization, (req, res) =>
  planController.update(req, res)
);

router.delete("/:id", getAuthorization, (req, res) =>
  planController.remove(req, res)
);

router.post("/", getAuthorization, (req, res) =>
  planController.create(req, res)
);

router.get("/:id", getAuthorization, (req, res) =>
  planController.getById(req, res)
);

router.put("/:id/complete", getAuthorization, (req, res) =>
  planController.makeCompleted(req, res)
);

router.get("/", getAuthorization, (req, res) =>
  planController.getAll(req, res)
);

module.exports = router;
