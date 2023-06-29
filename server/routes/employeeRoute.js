const express = require("express");
const { createEmployee } = require("../controllers/employeeController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createEmployee);

module.exports = router;
