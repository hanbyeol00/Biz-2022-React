import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "select * from test";
  mysql.query(sql, (err, result, fields) => {
    res.json({ result });
  });
  // res.send({ test: "hi" });
});

export default router;
