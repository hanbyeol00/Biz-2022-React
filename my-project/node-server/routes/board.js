import express from "express";
import DB from "../models/index.js";
import { QueryTypes } from "sequelize";
import moment from "moment";
const router = express.Router();
const Board = DB.models.board_detail;
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";

router.get("/", async (req, res) => {
  const boardList = await Board.findAll();
  return res.json(boardList);
});

router.get("/item/:page", async (req, res) => {
  let page = req.params.page;
  let offset = 0;
  const limit = 10;

  if (page > 1) {
    offset = limit * (page - 1);
  }

  try {
    const sql = `select * from board_detail order by seq DESC limit ${limit} offset ${offset}`;
    const List = await Board.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return res.json(List);
  } catch (err) {
    console.log(err);
  }
});

router.post("/insert", async (req, res) => {
  const { title, category, content, page } = req.body;
  const date = moment().format(dateFormat);
  const time = moment().format(timeFormat);
  const b_create_date = date + " " + time;
  const item = {
    b_category: category,
    b_nickname: "익명",
    b_title: title,
    b_content: content,
    b_create_date,
    user_id: "익명",
  };
  try {
    await Board.create(item);
    const sql = `select * from board_detail limit ${limit} offset ${offset}`;
    const List = await Board.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return res.json(List);
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail/:seq", async (req, res) => {
  const seq = req.params.seq;
  try {
    const detail = await Board.findByPk(seq);
    console.log(detail);
    return res.json(detail);
  } catch (err) {
    console.log(err);
  }
});

export default router;
