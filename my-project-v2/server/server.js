import express from "express";
import cors from "cors";
const app = express();
import test from "./Router/test.js";

app.use(cors());

app.use("/api", test);

const port = 5000;
app.listen(port, () => console.log(`${port}`));
