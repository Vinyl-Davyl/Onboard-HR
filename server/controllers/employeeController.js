const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const { fileSizeFormatter } = require("../utils/fileUpload");

// Create Employee *--main (Saving to database first)
const createEmployee = asyncHandler(async (req, res) => {
  // Destructuring what's needed first, Img not compulsory
  const { name, sku, category, quantity, price, description } = req.body;

  // Validation
  if (!name || !sku || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Handle Image Upload
  let fileData = {}
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Employee
  const employee = await Employee.create({
    // Gets the Id of user and attach to employee so ID shows on DB, helps tracks employee of a specific HR
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(employee);
});

module.exports = { createEmployee };
