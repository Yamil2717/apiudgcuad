import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Groups } from "./Groups";
import { User } from "./User";

export const Requests = sequelize.define("requests", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  senderRequestID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
  },
  receiverRequestID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
  },
  groupRequestID: {
    type: DataTypes.UUID,
    references: {
      model: Groups,
      key: "id",
    },
  },
  action: { type: DataTypes.INTEGER },
});

Requests.belongsTo(User, {
  foreignKey: "senderRequestID",
});

Requests.belongsTo(User, {
  foreignKey: "receiverRequestID",
});

Requests.belongsTo(Groups, {
  foreignKey: "groupRequestID",
});
