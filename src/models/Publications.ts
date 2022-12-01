import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Publication = sequelize.define("publications", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  description: { type: DataTypes.STRING },
  pictures: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  pictureGroup: { type: DataTypes.STRING },
  groupID: { type: DataTypes.INTEGER },
  groupName: { type: DataTypes.STRING },
  categoryID: { type: DataTypes.INTEGER },
  ownerID: { type: DataTypes.STRING },
  ownerName: { type: DataTypes.STRING },
});
