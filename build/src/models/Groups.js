"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Groups = database_1.sequelize.define('groups', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    picture: { type: sequelize_1.DataTypes.STRING },
    membersCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    membersIDS: { type: sequelize_1.DataTypes.STRING, defaultValue: '[]' },
    idCategory: { type: sequelize_1.DataTypes.INTEGER }
});
