import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Roles = sequelize.define(
  "roles",
  {
    id: {
      /*type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,*/
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, unique: true },
  },
  {
    timestamps: false,
  }
);
