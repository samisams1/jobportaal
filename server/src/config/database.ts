import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgress',
  password: 'samisams',
  database: 'postgres',
  logging: false,
});

export default sequelize;