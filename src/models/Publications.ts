import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Groups } from "./Groups";
import { Interest } from "./Interest";
import { User } from "./User";

export const Publication = sequelize.define("publications", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  description: { type: DataTypes.STRING },
  pictures: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  categoryID: {
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
    references: { model: User, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  groupID: {
    type: DataTypes.UUID,
    references: { model: Groups, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  likePositive: { type: DataTypes.INTEGER, defaultValue: 0 },
  likeNeutral: { type: DataTypes.INTEGER, defaultValue: 0 },
  likeNegative: { type: DataTypes.INTEGER, defaultValue: 0 },
  commentCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Publication.belongsTo(Interest, {
  foreignKey: "categoryID",
});

Publication.belongsTo(User, {
  foreignKey: "ownerID",
});

Publication.belongsTo(Groups, {
  foreignKey: "groupID",
});
