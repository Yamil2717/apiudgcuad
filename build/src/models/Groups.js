"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Interest_1 = require("./Interest");
exports.Groups = database_1.sequelize.define("groups", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    picture: { type: sequelize_1.DataTypes.STRING },
    membersCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    membersIDS: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID), defaultValue: [] },
    idInterest: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Interest_1.Interest,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});
exports.Groups.belongsTo(Interest_1.Interest, {
    foreignKey: "idInterest",
});
