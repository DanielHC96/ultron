import express, { Express } from "express";
import router from "./project.network";


const project: Express = express();
project.use('/project', router);

export default project;