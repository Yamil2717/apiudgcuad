import { NextFunction, Response as ExpressResponse, Request } from 'express';
import { Response } from '../lib/tools';

const Auth = (role: any, response: Response, includeData: boolean = false) => async (req: Request, res: ExpressResponse, next: NextFunction) => {
    try {
        let { authorization } = req.headers;
        if (!authorization) return response.error(res, 'No autorizado.', 401);
        let token = authorization.split(' ')[1];
        if (!token) return response.error(res, 'No autorizado', 401);
        return next();
    } catch (error) {
        console.error(error);
        return response.error(res, 'No autorizado.', 401);
    }
}

export { Auth };
