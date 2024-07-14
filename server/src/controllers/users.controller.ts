import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserAttributes, UserInstance } from '../models/User';
import User from '../models/User';

class UserController {
  static async getUsers(req: Request, res: Response): Promise<Response<UserAttributes[]>> {
    try {
      const users: UserInstance[] = await User.findAll();
      return res.status(StatusCodes.OK).json(users.map((user) => user.toJSON()));
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<Response<UserAttributes>> {
    try {
      const { id } = req.params;
      const user: UserInstance | null = await User.findByPk(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      return res.status(StatusCodes.OK).json(user.toJSON());
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  static async createUser(req: Request, res: Response): Promise<Response<UserAttributes>> {
    try {
      const { name, email, password }: UserAttributes = req.body;
      const user: UserInstance = await User.create({ name, email, password });
      return res.status(StatusCodes.CREATED).json(user.toJSON());
    } catch (err: unknown) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response<UserAttributes>> {
    try {
      const { id } = req.params;
      const { name, email, password }: UserAttributes = req.body;
      const user: UserInstance | null = await User.findByPk(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      await user.update({ name, email, password });
      return res.status(StatusCodes.OK).json(user.toJSON());
    } catch (err: unknown) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response<{ message: string }>> {
    try {
      const { id } = req.params;
      const user: UserInstance | null = await User.findByPk(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      await user.destroy();
      return res.status(StatusCodes.NO_CONTENT).json({ message: 'User deleted' });
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }
}

export default UserController;