"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Roles_1 = require("./Roles");
exports.User = database_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    phone: { type: sequelize_1.DataTypes.STRING },
    postalCode: { type: sequelize_1.DataTypes.STRING(10) },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Roles_1.Roles,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    tagsIds: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER) },
    interestIds: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID) },
    friends: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID) },
    follows: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID) },
    groups: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID) },
    avatar: { type: sequelize_1.DataTypes.STRING },
    header: { type: sequelize_1.DataTypes.STRING },
    location: { type: sequelize_1.DataTypes.JSON },
    dateBirth: { type: sequelize_1.DataTypes.DATE },
    blocking: { type: sequelize_1.DataTypes.JSON },
});
exports.User.belongsTo(Roles_1.Roles, {
    foreignKey: "roleId",
});
