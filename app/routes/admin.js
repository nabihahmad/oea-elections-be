const express = require("express");
const router = express.Router();
const engineerController = require("../controllers/adminController");

router.get("/", engineerController.getAdmin);
router.post("/", engineerController.createAdmin);
router.post("/:adminId", engineerController.updateAdmin);
router.delete("/:adminId", engineerController.deleteAdmin);

module.exports = router;