"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interest = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Interest = database_1.sequelize.define("interests", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    picture: { type: sequelize_1.DataTypes.STRING },
}, {
    timestamps: false,
});
