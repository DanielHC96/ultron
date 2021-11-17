import express, { Router, Request, Response} from "express";
import { Job } from "../../models/job.model";
import response from '../../modules/response.module';
import jobController from './job.controller'

const router: Router = express.Router();

router.get('/all', getJobs);
router.get('/:name/findName', getJobByName);
router.get('/:selector/findSelector', getJobBySelector);
router.get('/:id/findId', getJobById);
router.post('/', addJob);

async function getJobs(req: Request, res: Response) {
    try{
        const result: any[] = await jobController.getJobs();
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function getJobByName(req: Request, res: Response) {
    const name: string = req.params.name;
    try{
        const result: any = await jobController.getJobByName(name);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function getJobBySelector(req: Request, res: Response) {
    const selector: string = req.params.selector;
    try{
        const result: any = await jobController.getJobBySelector(selector);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function getJobById(req: Request, res: Response) {
    const id: string = req.params.id;
    try{
        const result: Job | null = await jobController.getJobById(id);
        response.success(req, res, result, 200);
    }
    catch(error){
        response.error(req, res, 'Invalid information', error, 500);
    }
}

async function addJob(req: Request, res: Response){
    const job: Job = req.body;
    try{
        const result: any = await jobController.addJob(job);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
}

export default router;