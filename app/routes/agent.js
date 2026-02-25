const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

router.get("/ballot-box", agentController.getBallotBox);
router.post("/ballot-box", agentController.updateBallotBox);
router.get("/vote-count", agentController.getVoteCount);

module.exports = router;