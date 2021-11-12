import express, { Express } from "express";
import router from "./project2.network";

const project2: Express = express();
project2.use('/project2', router);

export default project2;