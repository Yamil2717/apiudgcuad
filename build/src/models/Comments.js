"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Publications_1 = require("./Publications");
const User_1 = require("./User");
exports.Comments = database_1.sequelize.define("comments", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    idPublication: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Publications_1.Publication,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    comment: { type: sequelize_1.DataTypes.STRING },
    ownerID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    likePositive: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    likeNeutral: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    likeNegative: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    subComment: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    idFatherComment: { type: sequelize_1.DataTypes.UUID },
});
exports.Comments.belongsTo(Publications_1.Publication, {
    foreignKey: "idPublication",
});
exports.Comments.belongsTo(User_1.User, {
    foreignKey: "ownerID",
});
