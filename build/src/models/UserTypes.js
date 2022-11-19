"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypes = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.UserTypes = database_1.sequelize.define('userTypes', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING }
});
