import express, { Router, Request, Response } from "express";
import { Team } from "../../models/team.model";
import teamController from "./team.controller";
import response from '../../modules/response.module'

const router: Router = express.Router();

router.get('/all', getTeams);
router.get('/:id', getTeam);
router.post('/', addTeam);
router.patch('/:id/members', updateTeamMembers);

async function getTeams(req: Request, res: Response){
    try{
        const result: Team[] = await teamController.getTeams();
        response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
};

async function getTeam(req: Request, res: Response){
    const id: string = req.params.id;
    try{
      const result: Team | null = await teamController.getTeam(id);
      response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
};

async function addTeam(req: Request, res: Response){
    const Team: Team = req.body;
    try{
      const result: Team = await teamController.addTeam(Team);
      response.success(req, res, result, 201);
    }
    catch(error){ response.error(req, res, 'Invalid information', error, 500) };
};

async function updateTeamMembers(req: Request, res: Response){
    const id: string = req.params.id;
    const members: string[] = req.body;
    try{
      const result: Team | null = await teamController.updateTeamMembers(id, members);
      response.success(req, res, result, 200);
    }
    catch(error){ response.error(req, res, 'Invalid information',error, 500) };
};
  
export default router;