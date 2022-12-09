import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Interest } from "./Interest";

export const Groups = sequelize.define("groups", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, unique: true },
  picture: { type: DataTypes.STRING },
  membersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  membersIDS: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
  idInterest: {
    type: DataTypes.UUID,
    references: {
      model: Interest,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});

Groups.belongsTo(Interest, {
  foreignKey: "idInterest",
});
