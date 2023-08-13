const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = { upload };
