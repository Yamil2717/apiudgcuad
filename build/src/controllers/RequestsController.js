"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequestUser = exports.getRequestUser = exports.sendRequestUserFriend = void 0;
const tools_1 = require("../lib/tools");
const RequestsService_1 = __importDefault(require("../services/RequestsService"));
const resAPI = new tools_1.Response();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function sendRequestUserFriend(req, res) {
    try {
        let { id } = req.body;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let request = await RequestsService_1.default.sendRequestUser(payloadToken.id, id, 1);
        console.info(`THE USER ID ${payloadToken.id} SEND A FRIEND REQUEST TO USER ID ${id}`);
        resAPI.success(res, request);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.sendRequestUserFriend = sendRequestUserFriend;
async function getRequestUser(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let request = await RequestsService_1.default.getRequestUser(payloadToken.id, id);
        console.info(`THE USER ID ${payloadToken.id} GET IF HAVE A REQUEST TO USER ID ${id}`);
        resAPI.success(res, request);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.getRequestUser = getRequestUser;
async function deleteRequestUser(req, res) {
    try {
        let { id } = req.params;
        let authorization = req.headers.authorization;
        let token = authorization.split(" ");
        let payloadToken = jsonwebtoken_1.default.decode(token[1]);
        if (!payloadToken.id) {
            resAPI.error(res, "No se ha podido obtener el id del usuario.");
        }
        let request = await RequestsService_1.default.deleteRequestUser(payloadToken.id, id);
        console.info(`THE USER ID ${payloadToken.id} DELETE THE REQUEST TO USER ID ${id}`);
        resAPI.success(res, request);
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.deleteRequestUser = deleteRequestUser;
