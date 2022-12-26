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
  const { title, category, content, page, id } = req.body;
  const date = moment().format(dateFormat);
  const time = moment().format(timeFormat);
  const limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }

  const b_create_date = date + " " + time;
  if (id) {
    const item = {
      b_category: category,
      b_nickname: "익명",
      b_title: title,
      b_content: content,
      b_create_date,
      user_id: "익명",
    };
    await Board.update(item, { where: { seq: id } });
    const sql = `select * from board_detail order by seq DESC limit ${limit} offset ${offset}`;
    const List = await Board.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return res.json(List);
  }
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
    const sql = `select * from board_detail order by seq DESC limit ${limit} offset ${offset}`;
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
    const sql = `update board_detail set b_views = b_views +1 where seq = ${seq}`;
    await Board.sequelize.query(sql, { type: QueryTypes.UPDATE });
    const detail = await Board.findByPk(seq);
    console.log(detail);
    return res.json(detail);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:seq", async (req, res) => {
  const seq = req.params.seq;
  const page = 1;
  const limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  try {
    await Board.destroy({ where: { seq: seq } });
    const sql = `select * from board_detail order by seq DESC limit ${limit} offset ${offset}`;
    const List = await Board.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return res.json(List);
  } catch (err) {
    console.log(err);
  }
});

router.get("/select/:seq", async (req, res) => {
  const seq = req.params.seq;
  try {
    const item = await Board.findByPk(seq);
    return res.json(item);
  } catch (err) {
    console.log(err);
  }
});

router.post("/select", async (req, res) => {
  const { input, select, page } = req.body;
  const limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  if (!input) {
    const sql = `select * from board_detail order by seq DESC limit ${limit} offset ${offset}`;
    const List = await Board.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return res.json(List);
  }
  const boardSql = `SELECT * FROM board_detail where ${select} like '%${input}%' limit ${limit} offset ${offset}`;
  const boardsList = await Board.sequelize.query(boardSql, {
    type: QueryTypes.SELECT,
  });
  return res.json(boardsList);
});

router.post("/length", async (req, res) => {
  const { input, select } = req.body;
  const boardSql = `SELECT * FROM board_detail where ${select} like '%${input}%'`;
  const boardsList = await Board.sequelize.query(boardSql, {
    type: QueryTypes.SELECT,
  });
  return res.json(boardsList);
});

export default router;
