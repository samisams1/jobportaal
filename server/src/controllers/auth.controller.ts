import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../errors/ApiError';
import UserInstance, { UserAttributes } from '../models/User';
type SignupRequest =  {
  name: string;
  email: string;
  password: string;
}
export default class AuthController {
  
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserInstance.findOne({ where: { email } });

      // If user account is not found, throw an error
      if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User account not found", []);
      }

      // If user account is found, compare the password
      if (!(user as any).comparePassword(password)) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password", []);
      }

      // Send a response with the user account details and token
      res.status(StatusCodes.OK).json({
        user,
        token: (user as any).generateJWT(),
      });
    } catch (error) {
      next(error);
    }
  }
  
  public static async signup(req: Request, res: Response, next: NextFunction) {
    try {

      const { name, email, password } = req.body;
       // Check if the user already exists
       const existingUser = await UserInstance.findOne({ where: { email } });
       if (existingUser) {
         throw new ApiError(StatusCodes.CONFLICT, 'User with this email already exists', []);
       }
          // Create a new user
      const newUser = await UserInstance.create({
        name,
        email,
        password,
      });
      console.log(name);
      // Rest of the code...
    } catch (error) {
      console.error('Error in signup:', error);
      next(error);
    }
  }

  public static async me(req: Request, res: Response, next: NextFunction) {
    try {
      // Retrieve the authenticated user from the request
      const user =" req.user as UserAttributes;"

      // Send a response with the user account details
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  } 
  // Add other controller methods like sign-up, user profile, etc.
}