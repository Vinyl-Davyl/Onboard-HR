const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      // remove spaces around email
      trim: true,
      // validate mail
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a paaword"],
      minLenght: [6, "Password must be up to 6 characters"],
      //   would validate on the frontend due to bcrypt exceeding 23 characters
      //   maxLenght: [23, "Password must not exceed 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      // making things not compulsory here, adding default
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },
    bio: {
      type: String,
      maxLenght: [250, "Bio must not exceed 250 characters"],
      default: "bio",
    },
    //   adding timestamps
  },
  {
    timestamps: true,
  }
);

// Encrypt pasword before saving to DB - before saving any piece of data, executes function to hash password(so incase of registering, change password etc)
userSchema.pre("save", async function (next) {
  // If password field is not modified as in case of edit, go to next step
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  // pointing to password inside this file with this.password
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// "User" term being used as save in mongoDB for this database model
const User = mongoose.model("User", userSchema);
module.exports = User;
