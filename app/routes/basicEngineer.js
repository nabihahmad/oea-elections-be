const express = require("express");
const router = express.Router();
const engineerController = require("../controllers/engineerController");

router.get("/", engineerController.getEngineerBasicInfoByOeaNumber);
router.get("/:engineerId", engineerController.getEngineerBasicInfoById);

module.exports = router;