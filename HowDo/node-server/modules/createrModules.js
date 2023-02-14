// user profile image upload module

import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const profileImage_dir = path.join("react-client/public/uploads");

const storageOption = {
  //limits: { fileSize: 4 * 1024 * 1024 },
  filename: (req, file, cb) => {
    const uuidPrefix = v4();
    console.log(file.originalname);
    const newFileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("utf8");
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const uploadFileName = newFileName.substring(newFileName.length - 255);
    cb(null, uploadFileName);
  },

  destination: (req, file, cb) => {
    if (!fs.existsSync(profileImage_dir)) {
      fs.mkdirSync(profileImage_dir, { recursive: true });
    }
    cb(null, profileImage_dir);
  },
};

const storage = multer.diskStorage(storageOption);

export default multer({ storage });
