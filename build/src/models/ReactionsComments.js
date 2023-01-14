"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsComments = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Comments_1 = require("./Comments");
const User_1 = require("./User");
exports.ReactionsComments = database_1.sequelize.define("reactionsComments", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    idComment: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Comments_1.Comments,
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
exports.ReactionsComments.belongsTo(Comments_1.Comments, {
    foreignKey: "idComment",
});
exports.ReactionsComments.belongsTo(User_1.User, {
    foreignKey: "ownerID",
});
