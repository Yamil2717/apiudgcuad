"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.addFriend = exports.addGroup = exports.toggleFollow = exports.updateHeader = exports.updateAvatar = exports.updateData = exports.getUserByID = exports.getUserByToken = exports.getTypesUser = exports.loginUser = exports.createUser = void 0;
const tools_1 = require("../lib/tools");
const UserServices_1 = __importDefault(require("../services/UserServices"));
const resAPI = new tools_1.Response();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createUser(req, res) {
    try {
        let { name, email, password, countryIndicator, phone, postalCode, roleId, tagsIds, interestIds, location, dateBirth, avatar, } = req.body;
        let user = await UserServices_1.default.userRegister(name, email, password, countryIndicator, phone, postalCode, roleId, tagsIds, interestIds, location, dateBirth, avatar);
        console.info(`USER CREATED, UUID: ${user.id}`);
        resAPI.success(res, { message: "Se ha registrado correctamente." });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 409);
    }
}
exports.createUser = createUser;
async function updateData(req, res) {
    try {
        let { name, email, password, countryIndicator, phone, postalCode, roleId, oldPassword, } = req.body;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let user = await UserServices_1.default.updateData(payloadToken.id, oldPassword, {
            name,
            email,
            password,
            countryIndicator,
            phone,
            postalCode,
            roleId,
        });
        console.info(`USER DATA UPDATE, UUID: ${payloadToken.id}`);
        resAPI.success(res, user);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 409);
    }
}
exports.updateData = updateData;
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
async function getUserByToken(req, res) {
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
exports.getUserByToken = getUserByToken;
async function getUserByID(req, res) {
    try {
        let { id } = req.params;
        if (!id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.userGetById(id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getUserByID = getUserByID;
async function updateAvatar(req, res) {
    try {
        let { url } = req.body;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.userUpdateAvatar(url, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.updateAvatar = updateAvatar;
async function updateHeader(req, res) {
    try {
        let { url } = req.body;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.userUpdateHeader(url, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.updateHeader = updateHeader;
async function toggleFollow(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.toggleFollow(id, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.toggleFollow = toggleFollow;
async function addGroup(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.addGroup(id, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.addGroup = addGroup;
async function addFriend(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.addFriend(id, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.addFriend = addFriend;
async function deleteFriend(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let dataUser = await UserServices_1.default.deleteFriend(id, payloadToken.id);
        resAPI.success(res, dataUser);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.deleteFriend = deleteFriend;
