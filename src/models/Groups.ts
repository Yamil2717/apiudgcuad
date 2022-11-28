import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Groups = sequelize.define('groups', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    picture: { type: DataTypes.STRING },
    membersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    membersIDS: { type: DataTypes.STRING, defaultValue: '[]' },
    idCategory: { type: DataTypes.INTEGER }
});
