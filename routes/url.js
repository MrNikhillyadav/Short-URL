const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetShortURL,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId",handleGetShortURL );
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
