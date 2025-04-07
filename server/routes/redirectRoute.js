const express = require("express");
const router = express.Router();
const { redirect } = require("../controllers/redirectController");

router.get("/:alias", redirect);

module.exports = router;
