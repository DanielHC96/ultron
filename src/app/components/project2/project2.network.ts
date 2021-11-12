import  express, { Router, Request, Response} from "express";
import response from '../../modules/response.module';
//import project2Controller from "./project2.controller";
//import { Project2 } from "../../models/project2.model"

const router: Router = express.Router();

router.get('/all', getProjects2);
router.post('/', postProject2);
router.get('/:selector', getProject2);

async function getProjects2(req: Request, res: Response) {
    try{
        response.success(req, res, 'Funciona', 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function postProject2(req: Request, res: Response) {
    try{
        response.success(req, res, 'Funciona', 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

async function getProject2(req: Request, res: Response) {
    const selector: string = req.params.selector;
    try{
        response.success(req, res, `El selectotor es ${selector}`, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    };
};

export default router;