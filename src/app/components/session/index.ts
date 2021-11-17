import express, { Express } from "express";
import router from "./session.network";

const session: Express = express();
session.use('/session', router);

export default session;