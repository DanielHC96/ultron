import express, { Router, Request, Response } from "express";
import response from '../../modules/response.module'
import payment from '../../modules/payment.module'

const router: Router = express.Router();

router.post('/PaymentOrder', async (req: Request, res: Response) => {
    try{
        const result: any =  await payment.generatePaymentOrder();
        response.success(req, res, result, 200)
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

router.post('/PaymentEmail', async (req: Request, res: Response) => {
    try{
        const result: any =  await payment.generatePaymentEmail();
        response.success(req, res, result, 201)
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});


router.get('/status/:token', async (req: Request, res: Response) => {
    const token: string = req.params.token;
    try{
        const result: any =  await payment.getStatus(token);
        response.success(req, res, result, 201)
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

router.get('/status', async (req: Request, res: Response) => {
    const token: string = req.body.token;
    try{
        const result: any =  await payment.getStatus(token);
        response.success(req, res, result, 201)
    }
    catch (error){
        response.error(req, res, 'Invalid information', error, 500);
    }
});

export default router;