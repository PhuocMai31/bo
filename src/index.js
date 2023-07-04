import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { listenError } from "@util";
import { generateClientId } from "@middleware";
import "./lib/overwriteJS";
import router from "./router";
import "./test";
import "./app/cron/index"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
app.use(generateClientId);
listenError();
router(app);
app.use(express.static('src/public'))
// use res.render to load up an ejs view file
app.listen(process.env.PORT, () =>
  console.log("server run  in port ", process.env.PORT)
);
