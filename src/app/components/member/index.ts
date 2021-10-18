import express, { Express } from "express";
import router from "./member.network";

const member: Express = express();
member.use('/member', router);

export default member;