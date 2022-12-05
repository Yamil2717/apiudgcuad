import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  idPost: { type: DataTypes.UUID },
  comment: { type: DataTypes.STRING },
  ownerID: { type: DataTypes.UUID },
  ownerName: { type: DataTypes.STRING },
  photoUrl: { type: DataTypes.STRING },
  subCommentsCounter: { type: DataTypes.INTEGER },
});
