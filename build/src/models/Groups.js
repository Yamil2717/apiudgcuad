"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const User_1 = require("./User");
exports.Groups = database_1.sequelize.define("groups", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    description: { type: sequelize_1.DataTypes.STRING },
    picture: { type: sequelize_1.DataTypes.STRING },
    header: { type: sequelize_1.DataTypes.STRING },
    membersCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    membersIDS: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID), defaultValue: [] },
    ownerID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
            key: "id",
        },
        allowNull: false,
    },
});
exports.Groups.belongsTo(User_1.User, {
    foreignKey: "ownerID",
});
