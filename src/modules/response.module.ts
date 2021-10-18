import {Request, Response} from "express";

function success(req: Request, res: Response, message: any, status?: number) {
  res.status(status || 200).send({
    error: '',
    message,
    status
  });
}

function error(req: Request, res: Response, message: any, details:any, status?: number) {
  console.log(details);
  res.status(status || 500).send({
    error: message,
    message: '',
    status
  });
}

export default { success, error };