import { NextFunction, Request, Response as ExpressResponse } from 'express';
import { AnyObjectSchema } from 'yup';

import { Response } from '../lib/tools';

export const Validations = (schema: AnyObjectSchema, response: Response) => async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction,
) => {
    try {
        await schema.validate({
            body: req.body,
        });
        return next();
    } catch (error) {
        response.error(res, (error as Error)?.message, 400);
    }
};
