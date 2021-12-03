import express, { Router, Request, Response} from "express";
import meetingController from "./meeting.controller";
import response from '../../modules/response.module';
import { Meeting } from "../../models/meeting.model"

const router: Router = express.Router();

router.get('/all', getMeetings);
router.get('/:name/findName', getMeetingByName);
router.post('/', addMeeting);

async function getMeetings(req: Request, res: Response) {
    try{
        const result: any[] = await meetingController.getMeetings();
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function getMeetingByName(req: Request, res: Response) {
    const name: string = req.params.name;
    try{
        const result: any = await meetingController.getMeetingByName(name);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function addMeeting(req: Request, res: Response) {
    const meeting: Meeting = req.body;
    try{
        const result: any = await meetingController.addMeeting(meeting);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

export default router;