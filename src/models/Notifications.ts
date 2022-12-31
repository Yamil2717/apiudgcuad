import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Comments } from "./Comments";
import { Publication } from "./Publications";
import { User } from "./User";

export const Notifications = sequelize.define("notifications", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  photo: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  type: { type: DataTypes.INTEGER },
  idUserSender: {
    type: DataTypes.UUID,
    references: { model: User, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  idUserReceiver: {
    type: DataTypes.UUID,
    references: { model: User, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  idPublication: {
    type: DataTypes.UUID,
    references: { model: Publication, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  idComment: {
    type: DataTypes.UUID,
    references: { model: Comments, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  visit: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Notifications.belongsTo(User, {
  foreignKey: "idUserSender",
});

Notifications.belongsTo(User, {
  foreignKey: "idUserReceiver",
});

Notifications.belongsTo(Publication, {
  foreignKey: "idPublication",
});

Notifications.belongsTo(Comments, {
  foreignKey: "idComment",
});
