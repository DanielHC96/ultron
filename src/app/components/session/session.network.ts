import express, { Router, Request, Response } from "express";
import { Session } from "../../models/session.model";
import controller from "./session.controller";
import response from '../../modules/response.module'

const router: Router = express.Router();

router.get('/all', getSessions);
router.get('/:teamId/:monthYear/all', getMonthHoursMemberSessions);
router.get('/:teamId/:memberId/:monthYear/all', getSessionsTeamMember);
router.post('/all', getTeamMemberSessions);

async function getSessions(req: Request, res: Response){
    try{
        const result: any[] = await controller.getSessions();
        response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) }
};

async function getMonthHoursMemberSessions(req: Request, res: Response){
    const teamId = req.params.teamId;
    const monthYear = req.params.monthYear;
    try{
      const result: any[] = await controller.getMonthHoursMemberSessions(teamId, monthYear);
      response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
};

async function getSessionsTeamMember(req: Request, res: Response){
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;
    const monthYear = req.params.monthYear;
    try{
        const result: any[] = await controller.getSessionsTeamMember(teamId, memberId, monthYear);
        response.success(req, res, result);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
}

async function getTeamMemberSessions(req: Request, res: Response){
    const member: string | undefined = req.body.member;
    const team: string | undefined = req.body.team;
    try {
      const result: Session[] = await controller.getTeamMemberSessions(member, team);
      response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
};

export default router;