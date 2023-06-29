const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

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
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary before uploading to fileData
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Onboard HR",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      //   filePath: req.file.path,(using cloudinary file path instead)
      filePath: uploadedFile.secure_url,
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

// Get all Employees *--main
const getEmployees = asyncHandler(async (req, res) => {
  // Finds all employee on DB
  //const employees = await Employee.find()

  //Specific user
  const employees = await Employee.find({ user: req.user.id }).sort(
    "-createdAt"
  );
  res.status(200).json(employees);
});

// Get a single Employees *--main
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  //   If employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  //   Match employee
  if (employee.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User not authorized");
  }
  res.status(200).json(employee);
});

// Delete a single Employees *--main
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  // if employee doesnt exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  // Match employee to its user
  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Employee.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Employee deleted." });
});

// Update Employees *--main
const updateEmployee = asyncHandler(async (req, res) => {
  // Destructuring what's needed first, Img not compulsory
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const employee = await Employee.findById(id);

  //    If employee doesnt exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Match employee to its user
  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image Upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary before uploading to fileData
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Onboard HR",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      //   filePath: req.file.path,(using cloudinary file path instead)
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Employee, (findByIdAndUpdate taking in 3 parameters, id, what is to be updated, validators)
  const updatedEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: fileData || employee.image,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedEmployee);
});

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
