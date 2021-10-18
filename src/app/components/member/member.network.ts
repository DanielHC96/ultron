import response from '../../../modules/response.module'
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

//Componentes
router.get('/', (req: Request, res: Response) => {
    response.success(req, res, 'Lista de miembros', 200);
});

router.post('/', (req: Request, res: Response) => {
    response.success(req, res, 'Creado correctamente', 201);
});

export default router;