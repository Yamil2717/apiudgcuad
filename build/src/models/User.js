"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
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
        //type: DataTypes.UUID
        type: sequelize_1.DataTypes.INTEGER,
        /*onDelete: "restrict",
        onUpdate: "CASCADE",*/
    },
    tagsIds: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER) },
    interestIds: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER) },
    avatar: { type: sequelize_1.DataTypes.STRING },
    location: { type: sequelize_1.DataTypes.JSON },
    dateBirth: { type: sequelize_1.DataTypes.DATE },
    blocking: { type: sequelize_1.DataTypes.JSON },
});
