import DB from "../models/index.js";
import {
  USER_JOIN_RES,
  SYSTEM_RES,
  USER_LOGIN_RES,
} from "../config/api_res_code.js";
import crypto from "crypto";
const USER = DB.models.user;

export const chkJoin = async (info) => {
  const { username, password, re_password, nickname, birthdate } = info;

  if (!username) throw new Error(JSON.stringify(USER_JOIN_RES.REQ_USERNAME));

  let resultUser;
  try {
    resultUser = await USER.findByPk(username);
  } catch (e) {
    console.log(e);
    throw new Error(JSON.stringify(SYSTEM_RES.SQL_ERROR));
  }

  if (resultUser)
    throw new Error(JSON.stringify(USER_JOIN_RES.OVERLAP_USERNAME));

  // 닉네임
  if (!nickname) throw new Error(JSON.stringify(USER_JOIN_RES.REQ_NICKNAME));

  let resultNickname;
  try {
    resultNickname = await USER.findOne({ where: { nickname: nickname } });
  } catch (e) {
    console.log(e);
    throw new Error(JSON.stringify(SYSTEM_RES.SQL_ERROR));
  }

  if (resultNickname)
    throw new Error(JSON.stringify(USER_JOIN_RES.OVERLAP_NICKNAME));

  // 비밀번호 및 비밀번호 확인

  if (!password) throw new Error(JSON.stringify(USER_JOIN_RES.REQ_PASSWORD));
  if (!re_password)
    throw new Error(JSON.stringify(USER_JOIN_RES.REQ_RE_PASSWORD));
  if (password !== re_password)
    throw new Error(JSON.stringify(USER_JOIN_RES.MATCH_NOT_RE_PASSWORD));

  // 비밀번호 암호화
  const encPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  info.password = encPassword;

  // 권한 설정
  try {
    const userCount = await USER.count();
    if (!userCount) {
      info.level = 9;
    } else {
      info.level = 1;
    }
  } catch (error) {
    console.log(e.message);
    throw new Error(JSON.stringify(SYSTEM_RES.SQL_ERROR));
  }

  // 인서트하기
  if (info.name === "BUTTON") {
    try {
      await USER.create(info);
      return info.username;
    } catch (e) {
      console.log(e.message);
      throw new Error(JSON.stringify(USER_JOIN_RES.USER_NOT_CREATE));
    }
  }
};

export const chkLogin = async (info) => {
  const { id, password } = info;

  if (!id) throw new Error(JSON.stringify(USER_JOIN_RES.REQ_USERNAME));
  let resultUser = {};
  try {
    resultUser = await USER.findByPk(id);
  } catch (e) {
    console.log(e.message);
    throw new Error(JSON.stringify(SYSTEM_RES.SQL_ERROR));
  }

  if (!resultUser)
    throw new Error(JSON.stringify(USER_LOGIN_RES.MATCH_NOT_USERNAME));

  if (!password) throw new Error(JSON.stringify(USER_JOIN_RES.REQ_PASSWORD));

  const encPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  if (encPassword !== resultUser.password)
    throw new Error(JSON.stringify(USER_LOGIN_RES.MATCH_NOT_PASSWORD));

  return resultUser;
};

export const profileImageUpdate = async (id, image) => {
  const result = await USER.update(
    { profile_image: image },
    { where: { username: id } }
  );
  return result;
};
