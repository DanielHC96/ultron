import express, { Router, Request, Response } from "express";
import response from '../../modules/response.module'
import memberController from './member.controller';
import { Member } from '../../models/member.models';

const router: Router = express.Router();

//Componentes
router.get('/', async (req: Request, res: Response) => {
    try{
        const result: any[] = await memberController.getMembers();
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

router.post('/', async(req: Request, res: Response) => {
    const member: Member = req.body;
    try{
        const result: Member = await memberController.addMember(member);
        response.success(req, res, result,201);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

router.patch('/', async(req: Request, res: Response) => {
    const id: string = req.body._id;
    const birthday: Date = req.body.birthday;
    try{
        const result: any = await memberController.addBirthday(id, birthday);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
})

router.get('/:mes/:dia', async(req: Request, res: Response) => {
    const month: number = Number(req.params.mes);
    const day: number = Number(req.params.dia);
    try{
        const result: any[] = await memberController.getBirthday(month, day);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
})

export default router;