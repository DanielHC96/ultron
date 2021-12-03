import express, { Express } from "express";
import router from "./payment.network";

const member: Express = express();
member.use('/payment', router);

export default member;