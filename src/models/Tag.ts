import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Tags = sequelize.define('tags', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hashtag: { type: DataTypes.STRING, unique: true },
    idCategory: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});
