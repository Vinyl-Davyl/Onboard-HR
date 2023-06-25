// ditching try-catch blocks and using express-async-handlers
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User -- *main
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  //  Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exist");
  }

  // Encrypt password before saving to DB
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  // Creat new user
  const user = await User.create({
    name,
    email,
    // point to hashed passwrd instead of raw
    //password: hashedPassword,
    password,
  });

  // Generate Token(needs to be under create user)
  const token = generateToken(user._id);

  //   Send HTTP-only cookie .."token" being name of cookie"
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // FE/BE can have diff urls
    sameSite: "none",
    secure: true,
  });

  // If user created, send back these details to database in json
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User -- *main
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add an email and a password");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, Please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate Token
  const token = generateToken(user._id);

  //   Send HTTP-only cookie .."token" being name of cookie"
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // FE/BE can have diff urls
    sameSite: "none",
    secure: true,
  });

  // If everything's correct, return this back to database
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout User -- *main
const logoutUser = asyncHandler(async (req, res) => {
  // Expire the cookie(hence the sue of empty string instead of save token)
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    message: "Logout Successful",
  });
});

// get User -- *main
const getUser = asyncHandler(async (req, res) => {
  res.send("Get user Data");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
