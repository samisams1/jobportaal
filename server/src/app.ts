import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { Sequelize, Options as SequelizeOptions } from 'sequelize';
import Routes from './routes'; // Import the Routes class



// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = 3000;
app.use(express.json());
// Read environment variables
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

// Configure Sequelize
const sequelizeOptions: SequelizeOptions = {
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432'),
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Define your Sequelize models here

// Initialize the Routes class
new Routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});