"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Groups_1 = require("./Groups");
const User_1 = require("./User");
exports.Requests = database_1.sequelize.define("requests", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    senderRequestID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
            key: "id",
        },
    },
    receiverRequestID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.User,
            key: "id",
        },
    },
    groupRequestID: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Groups_1.Groups,
            key: "id",
        },
    },
    action: { type: sequelize_1.DataTypes.INTEGER },
});
exports.Requests.belongsTo(User_1.User, {
    foreignKey: "senderRequestID",
});
exports.Requests.belongsTo(User_1.User, {
    foreignKey: "receiverRequestID",
});
exports.Requests.belongsTo(Groups_1.Groups, {
    foreignKey: "groupRequestID",
});
