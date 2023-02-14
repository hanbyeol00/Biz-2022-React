import express from "express";
import { USER_JOIN_RES, USER_LOGIN_RES } from "../config/api_res_code.js";

import fileUp from "../modules/createrModules.js";
import {
  chkJoin,
  chkLogin,
  profileImageUpdate,
} from "../modules/user_module.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await chkJoin(req.body);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
    const e = JSON.parse(error?.message);
    return res.json(e);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const loginUser = await chkLogin(req.body);
    if (!loginUser)
      throw new Error(JSON.stringify(USER_LOGIN_RES.USER_NOT_LOGIN));
    console.log(loginUser);
    req.session.user = loginUser;
    return res.json(loginUser);
  } catch (e) {
    console.log(e.message);
    return res.json(JSON.parse(e?.message));
  }
});

router.get("/logout", async (req, res) => {
  req.session.user = undefined;
  return res.json(null);
  // console.log(req.session.user);
});

router.get("/session", (req, res) => {
  const user = req.session?.user;
  // console.log(user);
  if (!user) return res.json(USER_JOIN_RES.USER_NOT_SESSION);
  return res.json(user);
});

router.post("/update/:id", fileUp.single("profile"), async (req, res, next) => {
  let image = req.file.path;
  console.log(image);
  //image = image.slice(20 - image.length);
  console.log(image);
  const id = req.params.id;

  try {
    const result = await profileImageUpdate(id, image);
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});
export default router;
