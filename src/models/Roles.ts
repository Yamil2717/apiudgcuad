import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { User } from './User';

export const Roles = sequelize.define('userRoles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
}, {
    timestamps: false
});

Roles.hasMany(User, {
    foreignKey: 'userType',
    sourceKey: 'id'
});