const mongoose = require("mongoose");

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
      maxLenght: [23, "Password must not exceed 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      // to make things not compulsory here, adding default
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

const User = mongoose.model("User", userSchema);
module.exports = User;
