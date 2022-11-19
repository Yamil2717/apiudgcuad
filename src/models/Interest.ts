import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';


sequelize.define('interests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    picture: { type: DataTypes.STRING }
});