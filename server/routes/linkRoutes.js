const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");
const authMiddleware = require("../middlewares/authMiddleware");



router.post("/", authMiddleware, linkController.createLink);
router.get("/", authMiddleware, linkController.getUserLinks);
router.get("/analytics/:alias", authMiddleware, linkController.getAnalytics);

module.exports = router;
