"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Users = database_1.sequelize.define('users', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: { type: sequelize_1.DataTypes.UUID },
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    phone: { type: sequelize_1.DataTypes.STRING },
    postalCode: { type: sequelize_1.DataTypes.STRING(10) },
    userTypeId: { type: sequelize_1.DataTypes.INTEGER },
    tagsIds: { type: sequelize_1.DataTypes.STRING },
    interestIds: { type: sequelize_1.DataTypes.STRING },
    avatar: { type: sequelize_1.DataTypes.STRING },
    location: { type: sequelize_1.DataTypes.STRING },
    dateBirth: { type: sequelize_1.DataTypes.DATE },
    blocking: { type: sequelize_1.DataTypes.STRING }
});
