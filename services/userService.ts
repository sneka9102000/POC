  // services/user.service.ts

  import { IUser } from '../models/userModel';
  import { UserRepository } from '../repositories/userRepository';

  export class UserService {
    public static async createUser(userData: IUser): Promise<IUser> {
      return await UserRepository.create(userData);
    }

    public static async getUsers(): Promise<IUser[]> {
      return await UserRepository.findAll();
    }

    public static async getUser(email: string): Promise<IUser | null> {
      return await UserRepository.findByEmail(email);
    }

    public static async updateUser(email: string, newData: Partial<IUser>): Promise<IUser | null> {
      return await UserRepository.updateByEmail(email, newData);
    }
    public static async updateUserById(id: string, newData: Partial<IUser>): Promise<IUser | null> {
      return await UserRepository.updateById(id, newData);
    }

    public static async deleteUser(email: string): Promise<IUser | null> {
      return await UserRepository.deleteByEmail(email);
    }
  }
  export function createUser(userData: IUser) {
    throw new Error('Function not implemented.');
  }

