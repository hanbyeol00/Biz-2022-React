import express from "express";
import DB from "../models/index.js";
import { SYSTEM_RES } from "../config/api_res_code.js";
import schedule from "node-schedule";
import moment from "moment";

const SUBSCRIBE = DB.models.subscribe;
const USER = DB.models.user;

const router = express.Router();

router.post("/sub", async (req, res) => {
  console.log(req.body);
  try {
    await SUBSCRIBE.create(req.body);
  } catch (e) {
    console.log("정기 결제 승인 인서트 오류", e);
  }
});

//  날마다? "0 0 * * *"
const job = schedule.scheduleJob("*/10 * * * * *", async () => {
  console.log("매 15초마다 실행");
  const now = moment().format("YYYY/MM/DD");
  const MonthLater = moment().add(30, "d").format("YYYY/MM/DD HH:mm:ss");
  console.log(now);
  console.log(MonthLater);

  try {
    const result = await SUBSCRIBE.findAll({
      attributes: ["partner_user_id", "partner_order_id", "sid"],
      where: { approved_at: now },
      include: { model: USER, as: "f_sub_user", attributes: ["price"] },
      // where: { approved_at: now },
    });
    console.log(result);
  } catch (e) {
    console.log(`${SYSTEM_RES.SQL_ERROR} \n`, e);
  }
});

job.cancel();

router.get("/expire", async (req, res) => {});

export default router;
