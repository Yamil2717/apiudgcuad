import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  postalCode: { type: DataTypes.STRING(10) },
  roleId: {
    //type: DataTypes.UUID
    type: DataTypes.INTEGER,
    /*onDelete: "restrict",
    onUpdate: "CASCADE",*/
  },
  tagsIds: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  interestIds: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  avatar: { type: DataTypes.STRING },
  location: { type: DataTypes.JSON },
  dateBirth: { type: DataTypes.DATE },
  blocking: { type: DataTypes.JSON },
});
