"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Comments = database_1.sequelize.define("comments", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    idPost: { type: sequelize_1.DataTypes.UUID },
    comment: { type: sequelize_1.DataTypes.STRING },
    ownerID: { type: sequelize_1.DataTypes.UUID },
    ownerName: { type: sequelize_1.DataTypes.STRING },
    photoUrl: { type: sequelize_1.DataTypes.STRING },
    subCommentsCounter: { type: sequelize_1.DataTypes.INTEGER },
});
