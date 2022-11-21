"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const tools_1 = require("../lib/tools");
const resAPI = new tools_1.Response();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../utils/env"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
async function refreshToken(req, res) {
    try {
        let { refreshToken } = req.cookies.refresh_token;
        if (!refreshToken)
            return resAPI.error(res, 'No autorizado.', 401);
        jsonwebtoken_1.default.verify(refreshToken, env_1.default.api.refreshSecret, (error, user) => {
            if (error)
                return resAPI.error(res, error.message);
            let tokens = AuthService_1.default.generateToken(user.id, user.name, user.email);
            console.info(`USER REFRESH TOKEN, UUID: ${user.id}`);
            res.cookie('refresh_token', tokens.refreshToken, { ...(env_1.default.api.cookieDomain && { domain: env_1.default.api.cookieDomain }), httpOnly: true, sameSite: 'none', secure: true });
            return res.json(tokens);
        });
        resAPI.success(res, { message: 'Se ha actualizado su token correctamente', data: 'ok' });
    }
    catch (error) {
        console.error(error?.message);
        return resAPI.error(res, error?.message, 500);
    }
}
exports.refreshToken = refreshToken;
