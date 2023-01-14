import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Comments } from "./Comments";
import { User } from "./User";

export const ReactionsComments = sequelize.define("reactionsComments", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  idComment: {
    type: DataTypes.UUID,
    references: {
      model: Comments,
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

ReactionsComments.belongsTo(Comments, {
  foreignKey: "idComment",
});

ReactionsComments.belongsTo(User, {
  foreignKey: "ownerID",
});
