import express from "express";
const app = express();
import test from "./Router/test.js";

app.use("/api", test);

const port = 5000;
app.listen(port, () => console.log(`${port}`));
