import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  // const sql = "select * from test";
  // mysql.query(sql, (err, result, fields) => {
  //   const [{ x, y }] = result;
  //   console.log({ x, y });
  //   res.send({ x, y });
  // });
  res.send({ test: "hi" });
});

export default router;
