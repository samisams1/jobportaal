import express, { Express, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import config from './config/config';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Configure Sequelize
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres',
  }
);

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
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const User = sequelize.define<User>('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
}, {
  timestamps: true,
});

// API routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Job Portal!');
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});