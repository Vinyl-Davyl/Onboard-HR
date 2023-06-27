// ditching try-catch blocks and using express-async-handlers
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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

// Get User -- *main
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Get Login Status -- *main
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Update User -- *main
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    // don't want email to change hence
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    // Save
    const updatedUser = await user.save();
    // Send info back
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Change Password -- *main
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  // Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // Check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password changed successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Forgot Password -- *main
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email already exist in DB
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB(for reset of password func)
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  //console.log(resetToken);
  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log(hashedToken);
  // Save token to DB(from model format)
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 mins
  }).save();

  // Construct reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>You requested for a password reset</p>
    <p>Please use the url below to reset your password</p>
    <p>This reset link is valid for only 30 minutes.</p>

    <a href=${resetUrl} clicktracking=off>
      ${resetUrl}
    </>

    <p>Regards,</p>
    <p>Onboard X Team.</p>
  `;

  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
};
