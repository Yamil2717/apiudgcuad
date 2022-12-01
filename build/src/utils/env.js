"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        type: process.env.DB_DIALECT,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        nameDB: process.env.DB_NAME
    },
    api: {
        port: Number(process.env.PORT),
        accessSecret: process.env.SECRET_ACCESS_KEY || '',
        refreshSecret: process.env.SECRET_REFRESH_KEY || '',
        cookieDomain: process.env.COOKIE_DOMAIN || '',
        adminEmail: process.env.ADMIN_EMAIL || '',
        urlAPI: process.env.URL_API || ''
    }
};
exports.default = env;
