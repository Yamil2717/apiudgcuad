"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Roles = database_1.sequelize.define("roles", {
    id: {
        /*type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,*/
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
}, {
    timestamps: false,
});
