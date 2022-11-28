import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Tags } from './Tag';
import { Groups } from './Groups';

export const Interest = sequelize.define('interests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    picture: { type: DataTypes.STRING }
}, {
    timestamps: false
});

Interest.hasMany(Tags, {
    foreignKey: 'idCategory',
    sourceKey: 'id'
});

Interest.hasMany(Groups, {
    foreignKey: 'idCategory',
    sourceKey: 'id'
});
