const express = require("express");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createEmployee);
router.patch("/:id", protect, upload.single("image"), updateEmployee);
router.get("/", protect, getEmployees);
router.get("/:id", protect, getEmployee);
router.delete("/:id", protect, deleteEmployee);

module.exports = router;
