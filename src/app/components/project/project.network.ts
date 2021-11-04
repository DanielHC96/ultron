import  express, { Router, Request, Response} from "express";
import response from '../../modules/response.module';
import projectController from "./project.controller";
import { Project } from "../../models/project.model"


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

router.post('/', async (req: Request, res: Response) => {
    const project: Project = req.body;
    try{
        const result: Project = await projectController.addProject(project);
        response.success(req, res, result, 201);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

router.get('/:projectName', async (req: Request, res: Response) => {
    const projectName: string = req.params.projectName;
    try{
        const result: any[] = await projectController.getProjectName(projectName);
        response.success(req, res, result, 200);
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

export default router;