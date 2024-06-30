import User from '../models/User';

class UserService {
  static async createUser(name: string, email: string, password: string) {
    return await User.create({ name, email, password });
  }

  static async getUsers() {
    return await User.findAll();
  }
}

export default UserService;