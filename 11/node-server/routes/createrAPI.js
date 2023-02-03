import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const V_CONTENT = DB.models.video;
const USER = DB.models.user;
router.get("/:username", async (req, res, next) => {
  const username = req.params.username;

  try {
    const result = await V_CONTENT.findAll({
      where: { username: username },
      limit: 4,
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

router.get("/search/search", async (req, res, next) => {
  console.log("여기ddd");

  try {
    const v_result = await V_CONTENT.findAll({ attributes: ["v_title"] });

    const u_result = await USER.findAll({ attributes: ["nickname"] });
    return res.json({ keyword_v: v_result, keyword_u: u_result });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
