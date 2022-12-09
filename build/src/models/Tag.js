"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Interest_1 = require("./Interest");
exports.Tags = database_1.sequelize.define("tags", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hashtag: { type: sequelize_1.DataTypes.STRING, unique: true },
    idInterest: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Interest_1.Interest,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
}, {
    timestamps: false,
});
exports.Tags.belongsTo(Interest_1.Interest, {
    foreignKey: "idInterest",
});
