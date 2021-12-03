import express, { Express } from "express";
import router from "./meeting.network";

const meeting: Express = express();
meeting.use('/meeting', router);

export default meeting;