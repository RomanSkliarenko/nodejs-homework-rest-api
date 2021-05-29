const multer = require("multer");
const path = require("path");
require("dotenv").config();

// const uploadImageDir = path.join(process.cwd(), "public", "avatars");
const tempDir = path.join(process.cwd(), "public", "temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    const now = new Date();
    const prefix = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    cb(null, `${prefix}_${file.originalname}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
