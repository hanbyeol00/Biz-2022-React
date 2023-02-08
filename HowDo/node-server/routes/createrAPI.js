import express from "express";
import DB from "../models/index.js";
import { Op } from "sequelize";
const router = express.Router();
const V_CONTENT = DB.models.video;
const USER = DB.models.user;
const POST = DB.models.post;
const REPLY = DB.models.reply;
router.get("/search", async (req, res, next) => {
  try {
    const v_result = await V_CONTENT.findAll({ attributes: ["v_title"] });
    const u_result = await USER.findAll({ attributes: ["nickname"] });
    return res.json({ keyword_v: v_result, keyword_u: u_result });
  } catch (error) {
    return res.json(error);
  }
});
router.get("/creater", async (req, res, next) => {
  console.log("여기");
  try {
    const result = await USER.findAll({
      attributes: ["username", "profile_image", "nickname"],
      order: ["nickname"],
    });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/total/:query", async (req, res, next) => {
  const query = req.params.query;
  console.log("object");
  try {
    const v_result = await V_CONTENT.findAll({
      attributes: ["v_title", "v_views", "v_src", "v_code"],
      where: { v_title: { [Op.like]: `%${query}%` } },
    });
    const u_result = await USER.findAll({
      attributes: ["username", "nickname", "profile_image"],
      where: { nickname: { [Op.like]: `%${query}%` } },
    });
    const p_result = await POST.findAll({
      attributes: ["p_title", "p_code", "p_replies", "p_views", "p_upvote"],
      where: { p_title: { [Op.like]: `%${query}%` } },
    });
    // const r_result = await REPLY.findAll({
    // attributes: ["r_code", "username", "r_content"],
    // where: { r_content: { [Op.like]: `%${query}%` } },
    // });
    console.log(v_result, u_result, p_result);
    return res.json({
      v_result: v_result,
      u_result: u_result,
      p_result: p_result,
      // r_result: r_result,
    });
  } catch (error) {}
});
router.get("/creater/:id", async (req, res, next) => {
  const nickname = req.params.id;
  console.log(nickname);
  let userid;
  try {
    const id = await USER.findOne({
      attributes: ["profile_image", "title_image", "nickname", "username"],
      where: { nickname: nickname },
      raw: true,
    });
    userid = id.username;
    const result = await V_CONTENT.findAll({
      where: { username: userid },
      limit: 10,
    });
    return res.json({ u_result: id, v_result: result });
  } catch (err) {
    console.log(err);
    return res.json({ u_result: null, v_result: null });
  }
});
router.get("/:username", async (req, res, next) => {
  const nickname = req.params.username;
  let userid;
  try {
    const id = await USER.findOne({
      where: { nickname: nickname },
      raw: true,
    });
    console.log(id.username);
    userid = id.username;
    const result = await V_CONTENT.findAll({
      where: { username: userid },
      limit: 10,
    });
    const group = await V_CONTENT.findAll({
      group: "v_series",
    });
    const count = await V_CONTENT.count({
      group: "v_series",
    });
    // console.log(group, count);
    // console.log(result);
    //  const favorite = await V_CONTENT.findAll({ order: ["v_views", "DESC"] });
    //  console.log(favorite);

    return res.json({
      STATUS: 200,
      recent: result,
      group: group,
      count: count,
    });
  } catch (error) {}
});

export default router;
