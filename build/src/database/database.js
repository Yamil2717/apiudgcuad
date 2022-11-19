"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = __importDefault(require("../utils/env"));
const sequelize = new sequelize_1.Sequelize(env_1.default.db.nameDB, env_1.default.db.user, env_1.default.db.password, {
    host: env_1.default.db.host,
    dialect: env_1.default.db.type
});
exports.sequelize = sequelize;
