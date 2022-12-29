import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Interest } from "./Interest";
import { User } from "./User";

export const Groups = sequelize.define("groups", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING },
  header: { type: DataTypes.STRING },
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
  ownerID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

Groups.belongsTo(Interest, {
  foreignKey: "idInterest",
});

Groups.belongsTo(User, {
  foreignKey: "ownerID",
});
