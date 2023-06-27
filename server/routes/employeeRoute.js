const express = require("express");
const { createEmployee } = require("../controllers/employeeController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post("/", protect, createEmployee);

module.exports = router;
