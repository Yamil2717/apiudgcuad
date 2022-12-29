"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Comments_1 = require("./Comments");
const Publications_1 = require("./Publications");
const User_1 = require("./User");
exports.Notifications = database_1.sequelize.define("notifications", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    photo: { type: sequelize_1.DataTypes.STRING },
    title: { type: sequelize_1.DataTypes.STRING },
    description: { type: sequelize_1.DataTypes.STRING },
    type: { type: sequelize_1.DataTypes.NUMBER },
    idUserSender: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: User_1.User, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    idUserReceiver: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: User_1.User, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    idPublication: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: Publications_1.Publication, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    idComment: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: Comments_1.Comments, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    visit: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
});
exports.Notifications.belongsTo(User_1.User, {
    foreignKey: "idUserSender",
});
exports.Notifications.belongsTo(User_1.User, {
    foreignKey: "idUserReceiver",
});
exports.Notifications.belongsTo(Publications_1.Publication, {
    foreignKey: "idPublication",
});
exports.Notifications.belongsTo(Comments_1.Comments, {
    foreignKey: "idComment",
});
