import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/file_upload.js";
import { v4 } from "uuid";
import moment from "moment";
import fs from "fs";

const router = express.Router();

const Video = DB.models.video;
const SHORTS = DB.models.shorts;

router.get("/shorts", async (req, res) => {
  const result = await SHORTS.findAll({
    where: { sh_delete_date: null },
    attributes: ["sh_src"],
  });
  res.json(result);
});

router.get("/main", async (req, res) => {
  const result = await Video.findAll({
    attributes: ["v_code", "v_src", "v_category", "username", "v_title"],
    where: { v_delete_date: null },
  });
  res.json(result);
});

router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  let { v_title, v_detail, v_price, v_category, v_save_file } = JSON.parse(
    req.body.detail
  );
  const { shorts } = JSON.parse(req.body.shorts);
  const user = req.session?.user;
  const v_code = v4();
  if (shorts) {
    v_price = 0;
  }
  const uploadFileInfo = {
    v_code,
    username: user.username,
    v_src: `http://localhost:3000/public/uploads/${req.file?.filename}`,
    v_title,
    v_detail,
    v_price,
    v_category,
    v_series: "?",
    v_save_file,
  };
  if (shorts) {
    const shortsUploadFileInfo = {
      sh_code: v4(),
      v_code,
      sh_src: `http://localhost:3000/public/uploads/${req.file?.filename}`,
      sh_category: v_category,
      sh_title: v_title,
    };
    await Video.create(uploadFileInfo);
    await SHORTS.create(shortsUploadFileInfo);
    const result = Video.findAll();
    return res.json(result);
  } else {
    await Video.create(uploadFileInfo);
    const result = Video.findAll();
    return res.json(result);
  }
});

router.get("/detail/:v_code", async (req, res) => {
  const v_code = req.params.v_code;
  let result = null;
  let category = null;
  try {
    result = await Video.findOne({
      where: { v_code: v_code, v_delete_date: null },
    });
  } catch (e) {
    console.log(123123123123);
    return res.json({ code: 404, message: "데이터가 없습니다", v_price: 0 });
  }
  if (result.v_category) {
    const { v_category } = result;
    category = await Video.findAll({ where: { v_category: v_category } });
  }
  return res.json({ video: result, category });
});

router.post("/delete", async (req, res) => {
  const { Username, v_code } = req.body;
  const date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
  const videoInfo = await Video.findOne({ where: { v_code: v_code } });
  const { username } = videoInfo;
  if (Username === username) {
    await Video.update({ v_delete_date: date }, { where: { v_code: v_code } });
    const shorts = await SHORTS.findOne({ where: { v_code: v_code } });
    if (shorts) {
      await SHORTS.update(
        { sh_delete_date: date },
        { where: { v_code: v_code } }
      );
    }
  } else {
    console.log("삭제안됨");
  }
});

export default router;
