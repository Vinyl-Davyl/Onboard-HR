const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
    },
    //   Generate on FE
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter a category"],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, "Please enter a salary amount"],
      trim: true,
    },
    rating: {
      type: String,
      required: [true, "Please enter a rating"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
