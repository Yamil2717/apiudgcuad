import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';


sequelize.define('tags', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hashtag: { type: DataTypes.STRING },
});