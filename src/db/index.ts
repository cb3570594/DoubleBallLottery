import { Sequelize } from 'sequelize-typescript';
import { resolve } from 'path';

const sequelize = new Sequelize({
  database: 'dbl',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  models: [resolve(__dirname, '../model')],
});
export default sequelize;
