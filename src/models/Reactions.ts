import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Publication } from "./Publications";
import { User } from "./User";

export const Reactions = sequelize.define("reactions", {
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
    onDelete: "CASCADE",
  },
  ownerID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  action: { type: DataTypes.INTEGER },
});

Reactions.belongsTo(Publication, {
  foreignKey: "idPublication",
});

Reactions.belongsTo(User, {
  foreignKey: "ownerID",
});
