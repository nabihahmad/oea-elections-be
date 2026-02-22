const express = require("express");
const router = express.Router();
const engineerController = require("../controllers/engineerController");

router.get("/", engineerController.getEngineerByOeaNumber);
router.get("/:engineerId", engineerController.getEngineerById);
router.post("/:engineerId/checkin", engineerController.checkInEngineer);
router.delete("/:engineerId/checkin", engineerController.checkOutEngineer);
router.post("/:engineerId/mobile", engineerController.updateMobileNumber);
router.delete("/:engineerId/mobile", engineerController.deleteMobileNumber);

module.exports = router;