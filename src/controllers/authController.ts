import { Request, Response } from 'express';
import { Response as response } from '../lib/tools';
const resAPI = new response();
import JWT from 'jsonwebtoken';
import env from '../utils/env';
import AuthService from '../services/AuthService';

async function refreshToken(req: Request, res: Response) {
    try {
        console.log(req.cookies)
        let { refreshToken } = req.cookies.refresh_token;
        if (!refreshToken) return resAPI.error(res, 'No autorizado.', 401);
        JWT.verify(refreshToken, env.api.refreshSecret, (error: any, user: any) => {
            if (error) return resAPI.error(res, error.message);
            console.log(user);
            let tokens = AuthService.generateToken(user.id, user.name, user.email);
            console.info(`USER REFRESH TOKEN, UUID: ${user.id}`);
            res.cookie('refresh_token', tokens.refreshToken, { ...(env.api.cookieDomain && { domain: env.api.cookieDomain }), httpOnly: true, sameSite: 'none', secure: true })
            return res.json(tokens);
        })
        resAPI.success(res, { message: 'Se ha actualizado su token correctamente', data: 'xd' });
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

export { refreshToken }