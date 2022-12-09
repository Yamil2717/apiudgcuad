import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Interest } from "./Interest";

export const Tags = sequelize.define(
  "tags",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hashtag: { type: DataTypes.STRING, unique: true },
    idInterest: {
      type: DataTypes.UUID,
      references: {
        model: Interest,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    timestamps: false,
  }
);

Tags.belongsTo(Interest, {
  foreignKey: "idInterest",
});
