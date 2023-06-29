const express = require("express");
const {
  createEmployee,
  getEmployees,
  getEmployee,
} = require("../controllers/employeeController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createEmployee);
router.get("/", protect, getEmployees);
router.get("/:id", protect, getEmployee);

module.exports = router;
