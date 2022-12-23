"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reactions = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Publications_1 = require("./Publications");
const User_1 = require("./User");
exports.Reactions = database_1.sequelize.define("reactions", {
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
        onDelete: "CASCADE",
    },
    ownerID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    action: { type: sequelize_1.DataTypes.INTEGER },
});
exports.Reactions.belongsTo(Publications_1.Publication, {
    foreignKey: "idPublication",
});
exports.Reactions.belongsTo(User_1.User, {
    foreignKey: "ownerID",
});
