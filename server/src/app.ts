import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Read environment variables
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

// Configure Sequelize
const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: 'postgres',
});

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
// ...

// API routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});