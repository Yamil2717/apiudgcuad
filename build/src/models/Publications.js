"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Groups_1 = require("./Groups");
const Interest_1 = require("./Interest");
const User_1 = require("./User");
exports.Publication = database_1.sequelize.define("publications", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    description: { type: sequelize_1.DataTypes.STRING },
    pictures: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING), defaultValue: [] },
    categoryID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Interest_1.Interest,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    ownerID: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: User_1.User, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    groupID: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: Groups_1.Groups, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    likePositive: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    likeNeutral: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    likeNegative: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    commentCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
});
exports.Publication.belongsTo(Interest_1.Interest, {
    foreignKey: "categoryID",
});
exports.Publication.belongsTo(User_1.User, {
    foreignKey: "ownerID",
});
exports.Publication.belongsTo(Groups_1.Groups, {
    foreignKey: "groupID",
});
