const multer = require("multer");

// Define file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Calback, calling folder where file should be stored, uploads in this case
    cb(null, 'uploads')
  },
//   defining the file name, converts date to ISOString(24/13/23) and replacing / with - (24-13-23)
  filename: function (req, file, cb) {
    cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname)
  }
})

// Specify file format that can be saved
function fileFilter (req, file, cb) {
    if  (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        // Allow file be uploaded
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({ storage, fileFilter})

module.exports = { upload };