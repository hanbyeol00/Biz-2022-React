import { Op } from "sequelize";
import { KAKAO_APP_ADMIN_KEY, URL } from "../config/kakao_config.js";
import DB from "../models/index.js";

const SUBSCRIBE = DB.models.subscribe;

export const subPayReq = async (body, i) => {
  const fetchOption = {
    method: "POST",
    body: new URLSearchParams(body[i]),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.SUBSCRIPTION, fetchOption);
    const result = await res.json();
    console.log(result);
    await SUBSCRIBE.update(
      { approved_at: result.approved_at.substr(0, 10) },
      {
        where: {
          [Op.and]: [
            { partner_user_id: result.partner_user_id },
            { partner_order_id: result.partner_order_id },
          ],
        },
      }
    );
  } catch (e) {
    console.log("정기결제 승인 날짜 수정 실패 \n", e);
  }
};

export const subCancel = async (body) => {
  console.log(body);
  const fetchOption = {
    method: "POST",
    body: new URLSearchParams(body),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.SUBSCRIPTION_INACTIVE, fetchOption);
    const result = await res.json();
    console.log(result);
    return result.inactivated_at;
  } catch (e) {
    console.log("구독 취소 카카오 요청 실패", e);
  }
};
