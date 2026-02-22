const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");

router.get("/", voteController.getVotesByOeaNumber);
router.get("/:engineerId", voteController.getVotesByEngineerId);
router.put("/:engineerId", voteController.castVote);
router.delete("/:engineerId", voteController.deleteVote);

module.exports = router;