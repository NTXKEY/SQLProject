import multer from "multer";
import fs from "fs";
import path from "path";
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.params.username;

    const uploadPath = path.join("src", "uploads", username, "profile");
    console.log(uploadPath);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });
