import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Interest = sequelize.define(
  "interests",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, unique: true },
    picture: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);
