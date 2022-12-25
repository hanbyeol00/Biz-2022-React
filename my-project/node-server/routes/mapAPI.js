import express from "express";
import DB from "../models/index.js";
import { QueryTypes } from "sequelize";
const router = express.Router();
const Test = DB.models.animal_hospital;

router.get("/", async (req, res) => {
  const add = req.body.add;
  console.log(add);
  let page = req.body.page;
  let offset = 0;
  const limit = 7;

  if (page > 1) {
    offset = limit * (page - 1);
  }
  try {
    const sql = `select * from animal_hospital where a_add like '${add}%' limit ${limit} offset ${offset}`;
    const List = await Test.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    res.json(List);
    console.log(List);
  } catch (er) {
    console.log(er);
    return res.json({ error: "ERR" });
  }
});
router.post("/list", async (req, res) => {
  const add = req.body.add;
  let page = req.body.page;
  let offset = 0;
  const limit = 7;

  if (page > 1) {
    offset = limit * (page - 1);
  }

  try {
    const sql = `select * from animal_hospital where a_add like '${add}%' limit ${limit} offset ${offset}`;
    const List = await Test.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    res.json(List);
    console.log(List);
  } catch (er) {
    console.log(er);
    return res.json({ error: "ERR" });
  }
});
router.post("/list/length", async (req, res) => {
  const add = req.body.add;
  try {
    const sql = `select * from animal_hospital where a_add like '${add}%'`;
    const List = await Test.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    res.json(List);
  } catch (er) {
    console.log(er);
    return res.json({ error: "ERR" });
  }
});

router.post("/xyData", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const data = await Test.findByPk(id);
    res.json(data);
  } catch (er) {
    console.log(er);
    return res.json({ error: "ERR" });
  }
});

export default router;
