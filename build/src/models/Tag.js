"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Tags = database_1.sequelize.define('tags', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hashtag: { type: sequelize_1.DataTypes.STRING },
    idCategory: { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false
});
