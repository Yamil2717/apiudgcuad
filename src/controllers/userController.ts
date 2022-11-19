import { Request, Response } from 'express';
import { Response as response } from '../lib/tools';
import UserService from '../services/UserServices';
const resAPI = new response();

async function createUser(req: Request, res: Response) {
    try {
        let { name, email, password, phone, postalCode, userType, tagsIds, interestIds, location, dateBirth } = req.body;
        let user: any = await UserService.userRegister(name, email, password, phone, postalCode, userType, tagsIds, interestIds, location, dateBirth);
        console.info(`USER CREATED, UUID: ${user.id}`)
        resAPI.success(res, { message: 'Se ha registrado correctamente.' });
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        let { email, password } = req.body;
        let token = await UserService.userLogin(email, password);
        res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
        console.info(`USER LOGIN, EMAIL: ${email}`)
        resAPI.success(res, { message: 'Ha ingresado correctamente.', ...token })
    } catch (error) {
        console.error((error as Error)?.message);
        return resAPI.error(res, (error as Error)?.message, 500);
    }
}

async function getUserById(req: Request, res: Response) {
    console.log(req.body);
    res.send('Create user');
}

export { createUser, loginUser, getUserById }