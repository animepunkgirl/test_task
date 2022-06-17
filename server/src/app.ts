import express from "express";
import "dotenv/config";
import db from "./db";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(router);

app.listen(process.env.PORT, async () => {
  await db.init();
  console.log(`[App ready to work at PORT: ${process.env.PORT}]`);
});
