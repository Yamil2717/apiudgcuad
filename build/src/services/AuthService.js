"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../utils/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class authService {
    generateToken(id, name, email) {
        const user = { id, name, email };
        const accessToken = jsonwebtoken_1.default.sign(user, env_1.default.api.accessSecret, { expiresIn: '1d' });
        const refreshToken = jsonwebtoken_1.default.sign(user, env_1.default.api.refreshSecret, { expiresIn: '14d' });
        return { accessToken, refreshToken };
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, env_1.default.api.accessSecret);
    }
    refreshToken(token) {
    }
}
let AuthService = new authService;
exports.default = AuthService;
