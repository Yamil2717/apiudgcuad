import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Publication } from "./Publications";
import { User } from "./User";

export const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  idPublication: {
    type: DataTypes.UUID,
    references: {
      model: Publication,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  comment: { type: DataTypes.STRING },
  ownerID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  likePositive: { type: DataTypes.INTEGER, defaultValue: 0 },
  likeNeutral: { type: DataTypes.INTEGER, defaultValue: 0 },
  likeNegative: { type: DataTypes.INTEGER, defaultValue: 0 },
  subComment: { type: DataTypes.BOOLEAN, defaultValue: false },
  idFatherComment: { type: DataTypes.UUID },
});

Comments.belongsTo(Publication, {
  foreignKey: "idPublication",
});

Comments.belongsTo(User, {
  foreignKey: "ownerID",
});
