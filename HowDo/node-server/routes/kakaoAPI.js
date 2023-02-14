import express from "express";
import DB from "../models/index.js";
import { SYSTEM_RES } from "../config/api_res_code.js";
import { subPayReq, subCancel } from "../modules/pay_module.js";
import schedule from "node-schedule";
import moment from "moment";

const SUBSCRIBE = DB.models.subscribe;
const USER = DB.models.user;

const router = express.Router();

// 정기 결제 데이터 인서트
router.post("/sub", async (req, res) => {
  console.log(req.body);
  try {
    await SUBSCRIBE.create(req.body);
  } catch (e) {
    console.log("정기 결제 승인 인서트 오류", e);
  }
});

// 날마다 만료된 유저 정보 가져오기
const job = schedule.scheduleJob("0 0 * * *", async () => {
  const MonthLater = moment().subtract(1, "d").format("YYYY-MM-DD");
  console.log(MonthLater);
  let result;
  try {
    result = await SUBSCRIBE.findAll({
      attributes: ["partner_user_id", "partner_order_id", "sid"],
      where: { approved_at: MonthLater },
      include: [{ model: USER, attributes: ["price"] }],
      raw: true,
    });
    console.log(result);
  } catch (e) {
    console.log(`${SYSTEM_RES.SQL_ERROR} \n`, e);
  }

  // 배열로 카카오페이에 요청할 데이터 만들기
  if (result[0]) {
    const subPayBody = await result?.map((r) => {
      return {
        cid: "TCSUBSCRIP",
        sid: r.sid,
        partner_order_id: r.partner_order_id,
        partner_user_id: r.partner_user_id,
        item_name: r.partner_order_id,
        quantity: 1,
        total_amount: r["user.price"],
        tax_free_amount: 0,
        vat_amount: Math.round((r["user.price"] - 0) / 11),
      };
    });

    console.log(subPayBody);
    // 배열에 있는 개수만큼 결제 요청
    for (let i = 0; i < subPayBody.length; i++) {
      await subPayReq(subPayBody, i);
    }
  }
});

job.cancel();

// 구독 취소 요청
router.get("/cancel/:username/:orderUser", async (req, res) => {
  const username = req.params.username;
  const orderUser = req.params.orderUser;
  console.log(username, orderUser);

  try {
    const expireInfo = await SUBSCRIBE.findOne({
      attributes: ["sid"],
      where: { partner_user_id: username, partner_order_id: orderUser },
      raw: true,
    });
    console.log(expireInfo);

    // console.log(cancelBody);

    const inactive_date = await subCancel({
      cid: "TCSUBSCRIP",
      sid: expireInfo?.sid,
    });
    console.log("받아온 값", inactive_date);

    await SUBSCRIBE.update(
      { inactivated_at: inactive_date.substr(0, 10) },
      { where: { partner_user_id: username, partner_order_id: orderUser } }
    );
  } catch (e) {
    console.log("구독 취소 sql 오류", e);
  }
});

export default router;
