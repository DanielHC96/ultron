import express, { Router, Request, Response} from "express";
import meetingController from "./meeting.controller";
import response from '../../modules/response.module';
import { Meeting } from "../../models/meeting.model"

const router: Router = express.Router();

router.get('/all', getMeetings);

async function getMeetings(req: Request, res: Response) {
    try{
        const result: any[] = await meetingController.getMeetings();
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

export default router;