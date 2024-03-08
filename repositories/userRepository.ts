
import User, { IUser } from '../models/userModel';

export class UserRepository {
  public static async create(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  public static async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public static async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  public static async updateByEmail(email: string, newData: Partial<IUser>): Promise<IUser | null> {
    return await User.findOneAndUpdate({ email }, newData, { new: true });
  }

  public static async updateById(id: string, newData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, newData, { new: true });
  }

  public static async deleteByEmail(email: string): Promise<IUser | null> {
    return await User.findOneAndDelete({ email });
  }
}
