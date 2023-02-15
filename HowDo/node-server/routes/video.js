import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/createrModules.js";
import { v4 } from "uuid";
import moment from "moment";
import fs from "fs";
import path from "path";
import sequelize from "sequelize";

const router = express.Router();

const Video = DB.models.video;
const SHORTS = DB.models.shorts;
const USER = DB.models.user;

router.get("/shorts", async (req, res) => {
  const result = await SHORTS.findAll({
    where: { sh_delete_date: null },
    attributes: ["sh_src"],
  });
  res.json(result);
});

router.get("/main/:page", async (req, res) => {
  const page = req.params.page;
  const limit = 4;
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  const result = await Video.findAll({
    attributes: ["v_code", "v_src", "v_category", "username", "v_title"],
    where: { v_delete_date: null },
    limit: limit,
    offset: offset,
  });
  return res.json(result);
});

router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  let { v_title, v_detail, v_price, v_category } = JSON.parse(req.body.detail);
  const { shorts } = JSON.parse(req.body.shorts);
  const user = req.session?.user;
  const v_code = v4();
  if (shorts) {
    v_price = 0;
  }

  const uploadFileInfo = {
    v_code,
    username: user.username,
    v_src: `/uploads/${req.file?.filename}`,
    v_title,
    v_detail,
    v_price,
    v_category,
    v_series: "?",
    v_save_file: req.file?.filename,
  };
  if (shorts) {
    const shortsUploadFileInfo = {
      sh_code: v4(),
      v_code,
      sh_src: `/uploads/${req.file?.filename}`,
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
    await Video.update(
      { v_views: sequelize.literal("v_views + 1") },
      { where: { v_code: v_code } }
    );
    result = await Video.findOne({
      attributes: [
        "v_code",
        "username",
        "v_src",
        "v_title",
        "v_detail",
        "v_price",
        "v_category",
        "v_views",
        "v_create_date",
      ],
      where: { v_code: v_code, v_delete_date: null },
      include: [{ model: USER, as: "f_user_video" }],
    });
  } catch (e) {
    return res.json({ code: 404, message: "데이터가 없습니다", v_price: 0 });
  }
  if (result.v_category) {
    const { v_category } = result;
    category = await Video.findAll({
      where: { v_category: v_category, v_delete_date: null },
    });
  }
  return res.json({ video: result, category });
});

router.post("/delete", async (req, res) => {
  const { Username, v_code } = req.body;
  const UploadDir = path.join("react-client/public/uploads");
  let files;
  try {
    files = await Video.findAll({ where: { v_code: v_code } });
  } catch (e) {
    console.log(e);
  }

  await files.forEach(async (video) => {
    try {
      const delFile = path.join(UploadDir, video.v_save_file);
      fs.statSync(delFile);
      fs.unlinkSync(delFile);
    } catch (e) {
      console.log(video.v_save_file, "없음");
    }
  });

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

router.post("/editing", async (req, res) => {
  let { url, v_code, v_title, v_detail, v_price, v_category } = req.body.detail;
  const { shorts } = req.body.shorts;
  const date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
  if (shorts) {
    v_price = 0;
  }
  try {
    await Video.update(
      {
        v_title: v_title,
        v_detail: v_detail,
        v_price: v_price,
        v_category: v_category,
      },
      { where: { v_code: v_code } }
    );
    if (!shorts) {
      const shortsVideo = await SHORTS.findOne({
        where: { v_code: v_code, sh_delete_date: null },
      });
      if (shortsVideo) {
        await SHORTS.update(
          { sh_delete_date: date },
          { where: { v_code: v_code } }
        );
      } else {
        return false;
      }
    } else {
      const shortsUploadFileInfo = {
        sh_code: v4(),
        v_code,
        sh_src: url,
        sh_category: v_category,
        sh_title: v_title,
      };
      const shortsVideo = await SHORTS.findOne({
        where: { v_code: v_code, sh_delete_date: null },
      });
      if (shortsVideo) {
        return false;
      } else {
        await SHORTS.create(shortsUploadFileInfo);
      }
    }
  } catch (e) {
    console.log("업데이트 실패");
  }
});

router.get("/editing/select/:v_code", async (req, res) => {
  const V_code = req.params.v_code;
  try {
    const video = await Video.findOne({ where: { v_code: V_code } });
    const { v_code, v_src, v_title, v_detail, v_price, v_category } = video;
    const videoInfo = {
      v_code,
      url: v_src,
      v_title,
      v_detail,
      v_price,
      v_category,
      video: true,
    };
    let shorts;
    try {
      const sh = await SHORTS.findOne({
        where: { v_code: V_code, sh_delete_date: null },
      });
      if (sh) {
        shorts = { shorts: true };
      }
    } catch {
      console.log("쇼츠 없음");
    }
    return res.json({ videoInfo, shorts });
  } catch (e) {
    console.log(e);
  }
});

export default router;
