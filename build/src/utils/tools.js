"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    db: {
        type: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        nameDB: process.env.DB_NAME
    },
    api: {
        port: Number(process.env.PORT),
        secret: process.env.SECRET_KEY || '',
    }
};
exports.default = env;
