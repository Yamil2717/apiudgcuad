"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.createUser = void 0;
const tools_1 = require("../lib/tools");
const UserServices_1 = __importDefault(require("../services/UserServices"));
const resAPI = new tools_1.Response();
async function createUser(req, res) {
    try {
        let { name, email, password, phone, postalCode, userType, tagsIds, interestIds, location, dateBirth } = req.body;
        let user = await UserServices_1.default.userRegister(name, email, password, phone, postalCode, userType, tagsIds, interestIds, location, dateBirth);
        console.info(`USER CREATED, UUID: ${user.id}`);
        resAPI.success(res, { message: 'Se ha registrado correctamente.' });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.createUser = createUser;
async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        let token = await UserServices_1.default.userLogin(email, password);
        res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
        console.info(`USER LOGIN, EMAIL: ${email}`);
        resAPI.success(res, { message: 'Ha ingresado correctamente.', ...token });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.loginUser = loginUser;
async function getUserById(req, res) {
    console.log(req.body);
    res.send('Create user');
}
exports.getUserById = getUserById;
