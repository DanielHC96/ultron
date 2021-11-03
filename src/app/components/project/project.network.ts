import  express, { Router, Request, Response} from "express";
import response from '../../modules/response.module';
import projectController from "./project.controller";


const router: Router = express.Router();

//Componentes
router.get('/all', async (req: Request, res: Response) => {
    try{
        const result: any[] = await projectController.getProjects();
        response.success(req, res, result, 200);
    }
    catch(error){
        response.error(req, res, 'Invalid information', error, 500);
    }
})

export default router;