import express, { Router } from "express";
import DB from "../models/index.js";
const router = express.Router();
const Test = DB.models.xyTable;

router.get("/", async (req, res) => {
  try {
    const test = await Test.findAll();
    console.log(test);
    // return res.json(test);
  } catch (er) {
    console.log(er);
    // return res.json({ error: "ERR" });
  }
});

export default router;
