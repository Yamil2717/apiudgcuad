import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Roles } from "./Roles";

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
    type: DataTypes.UUID,
    references: {
      model: Roles,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  tagsIds: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  interestIds: { type: DataTypes.ARRAY(DataTypes.UUID) },
  friends: { type: DataTypes.JSON, defaultValue: {} },
  follows: { type: DataTypes.JSON, defaultValue: {} },
  groups: { type: DataTypes.JSON, defaultValue: {} },
  avatar: { type: DataTypes.STRING },
  header: { type: DataTypes.STRING },
  location: {
    type: DataTypes.JSON,
    defaultValue: { lat: 0, long: 0, locationName: "No street name" },
  },
  dateBirth: { type: DataTypes.DATE },
  blocking: { type: DataTypes.JSON, defaultValue: { enable: false } },
});

User.belongsTo(Roles, {
  foreignKey: "roleId",
});
