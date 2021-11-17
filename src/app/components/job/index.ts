import express, { Express } from "express";
import router from "./job.network";

const project2: Express = express();
project2.use('/job', router);

export default project2;