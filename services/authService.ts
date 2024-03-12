
import { IUser } from '../models/userModel';
import { UserService } from './userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationClient } from 'auth0';

const auth0 = new AuthenticationClient({
  domain: 'manage.auth0.com',
  clientId: 'JKQc8uO5D4qO8HNh2vdAZM4bAWS8IF3D',
  clientSecret: 'R8fRG-n3JRlJVtx8q7XXOR1lgQ1Fzwhui6lzyzSqwaClBctDSo121r6KaDNaIGrH'
});

export default auth0;


dotenv.config();

const { JWT_SECRET }: any = process.env;

export class AuthService {
  public static async signup(userData: IUser): Promise<IUser> {
    // Checking if user already exists
    const existingUser = await UserService.getUser(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await UserService.createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        residential_address: userData.residential_address,
        role: userData.role,
      } as IUser);

    return newUser;
  }

//   public static async login(email: string, password: string): Promise<string> {
//     console.log("inside auth0 login")
//     try {
//       // Authenticate user with Auth0
//       const { access_token } = await (auth0 as any).passwordRealm({
//         username: email,
//         password,
//         realm: 'Username-Password-Authentication',
//         scope: 'openid',
//       });
      
//       return access_token;
//     } catch (error) {
//       throw new Error('Invalid email or password');
//     }
//   }

public static async login(email: string, password: string): Promise<string> {
    // Checking if user exists
    const user = await UserService.getUser(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Comparing passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generating JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log("token",token)

    return token;
  }


}


