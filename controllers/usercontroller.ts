import { Request, ResponseToolkit } from '@hapi/hapi';
import User, { IUser } from '../models/usermodel';
import mongoose, { UpdateQuery } from 'mongoose';

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const user: IUser = new User(request.payload);
    await user.save();
    return h.response(user).code(201);
  } catch (error: any) { 
    console.error(error); 
    return h.response({ message: "Internal Server Error" }).code(500);
  }
};


export const getUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const users: IUser[] = await User.find();
    return h.response(users).code(200);
  } catch (error:any) {
    return h.response(error).code(500);
  }
};


export const getUserByEmail = async (request: Request, h: ResponseToolkit) => {
  try {
    const userEmail = request.params.email;
    const user: IUser | null = await User.findOne({ email: userEmail });
    if (!user) {
      return h.response({ error: 'User not found', email: userEmail }).code(404);
    }
    return h.response(user).code(200);
  } catch (error:any) {
    return h.response({ error: 'Internal server error', message: error.message }).code(500);
  }
};


export const updateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userEmail = request.params.email;
    // Parse the payload if it's a string
    const payload: UpdateQuery<IUser> = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
    
    // Perform the update operation
    await User.findOneAndUpdate(
      { email: userEmail },
      payload,
      { new: true } // Returns the updated document
    );

    // Fetch the updated user
    const updatedUser: IUser | null = await User.findOne({ email: userEmail });
    if (!updatedUser) {
      return h.response('User not found').code(404);
    }
    return h.response(updatedUser).code(200);
  } catch (error:any) {
    return h.response(error).code(500);
  }
};



export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userEmail = request.params.email;
    const deletedUser: IUser | null = await User.findOneAndDelete({ email: userEmail });
    if (!deletedUser) {
      return h.response('User not found').code(404);
    }
    return h.response(deletedUser).code(200);
  } catch (error:any) {
    return h.response(error).code(500);
  }
};
