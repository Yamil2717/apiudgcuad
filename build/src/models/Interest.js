"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interest = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Tag_1 = require("./Tag");
exports.Interest = database_1.sequelize.define('interests', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    picture: { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false
});
exports.Interest.hasMany(Tag_1.Tags, {
    foreignKey: 'idCategory',
    sourceKey: 'id'
});
/*Interest.hasMany(Groups, {
    foreignKey: 'idCategory',
    sourceKey: 'id'
});*/
