import express, { Express } from "express";
import router from "./team.network";

const team: Express = express();
team.use('/team', router);

export default team;