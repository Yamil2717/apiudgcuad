import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Tags } from './Tag';

export const Interest = sequelize.define('interests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    picture: { type: DataTypes.STRING }
}, {
    timestamps: false
});

Interest.hasMany(Tags, {
    foreignKey: 'idCategory',
    sourceKey: 'id'
});