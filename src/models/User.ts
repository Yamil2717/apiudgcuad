import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const User = sequelize.define('users', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, allowNull: false },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING(10) },
    userType: { type: DataTypes.INTEGER },
    tagsIds: { type: DataTypes.STRING },
    interestIds: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    dateBirth: { type: DataTypes.DATE },
    blocking: { type: DataTypes.STRING }
});