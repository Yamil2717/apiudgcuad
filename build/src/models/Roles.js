"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Roles = database_1.sequelize.define('userRoles', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false
});
/*Roles.hasMany(User, {
    foreignKey: 'userType',
    sourceKey: 'id'
});*/ 
