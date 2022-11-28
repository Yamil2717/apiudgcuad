"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Publication = database_1.sequelize.define('publications', {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    description: { type: sequelize_1.DataTypes.STRING },
    pictures: { type: sequelize_1.DataTypes.STRING, defaultValue: '[]' },
    pictureGroup: { type: sequelize_1.DataTypes.STRING },
    groupID: { type: sequelize_1.DataTypes.INTEGER },
    groupName: { type: sequelize_1.DataTypes.STRING },
    categoryID: { type: sequelize_1.DataTypes.INTEGER },
    ownerID: { type: sequelize_1.DataTypes.STRING },
    ownerName: { type: sequelize_1.DataTypes.STRING },
});
