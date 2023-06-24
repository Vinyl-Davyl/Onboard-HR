const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// helps passing any request coming from frontend
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect ot DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Speak Lord, Your server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
