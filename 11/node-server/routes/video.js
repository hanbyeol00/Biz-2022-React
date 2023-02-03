import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/file_upload.js";
import { v4 } from "uuid";

const router = express.Router();

const Video = DB.models.video;

router.get("/", async (req, res) => {
  const result = await Video.findAll({
    attributes: ["v_src"],
  });
  res.json(result);
});
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  const { v_title, v_detail, v_price, v_category, v_save_file } = JSON.parse(
    req.body.detail
  );
  const { shorts } = JSON.parse(req.body.shorts);
  const user = req.session?.user;
  console.log(user);
  console.log(shorts);

  const uploadFileInfo = {
    v_code: v4(),
    username: user.username,
    v_src: `http://localhost:5000/uploads/${req.file?.filename}`,
    v_title,
    v_detail,
    v_price: v_price || 0,
    v_category,
    v_series: "?",
    v_save_file,
  };
  console.log(uploadFileInfo);
  if (!shorts) {
    console.log(123);
    // return await Video.create(uploadFileInfo);
  } else {
    console.log(12333);
  }
});

export default router;
