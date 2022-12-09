"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getTypesUser = exports.loginUser = exports.createUser = void 0;
const tools_1 = require("../lib/tools");
const UserServices_1 = __importDefault(require("../services/UserServices"));
const resAPI = new tools_1.Response();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createUser(req, res) {
    try {
        let { name, email, password, phone, postalCode, roleId, tagsIds, interestIds, location, dateBirth, avatar, } = req.body;
        let user = await UserServices_1.default.userRegister(name, email, password, phone, postalCode, roleId, tagsIds, interestIds, location, dateBirth, avatar);
        console.info(`USER CREATED, UUID: ${user.id}`);
        resAPI.success(res, { message: "Se ha registrado correctamente." });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 409);
    }
}
exports.createUser = createUser;
async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        let token = await UserServices_1.default.userLogin(email, password);
        res.cookie("refresh_token", token.refreshToken, { httpOnly: true });
        console.info(`USER LOGIN, EMAIL: ${email}`);
        resAPI.success(res, { message: "Ha ingresado correctamente.", ...token });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.loginUser = loginUser;
async function getTypesUser(req, res) {
    try {
        let typesUser = await UserServices_1.default.userTypes();
        console.info("SOMEONE GOT THE LIST OF USER TYPES");
        resAPI.success(res, typesUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getTypesUser = getTypesUser;
async function getUserById(req, res) {
    try {
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.userGetById(payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getUserById = getUserById;
