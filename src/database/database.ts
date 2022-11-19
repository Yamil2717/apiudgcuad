import { Sequelize } from 'sequelize';
import env from '../utils/env';

const sequelize = new Sequelize(env.db.nameDB, env.db.user, env.db.password, {
    host: env.db.host,
    dialect: env.db.type
});

export { sequelize };