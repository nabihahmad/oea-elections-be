const express = require("express");
const router = express.Router();
const reportingController = require("../controllers/reportingController");

router.get("/main-counts", reportingController.getMainCounts);
router.get("/votes-timeseries", reportingController.getVotesTimeSeries);

module.exports = router;