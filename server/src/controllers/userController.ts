import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;