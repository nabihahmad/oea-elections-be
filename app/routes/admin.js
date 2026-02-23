const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAdmin);
router.get("/list", adminController.listAdmins);
router.post("/", adminController.createAdmin);
router.post("/:adminId", adminController.updateAdmin);
router.delete("/:adminId", adminController.deleteAdmin);

module.exports = router;