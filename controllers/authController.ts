
import { Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService } from '../services/authService';
import { IUser } from '../models/userModel';

export const signup = async (request: Request, h: ResponseToolkit) => {
  try {
    const payload = request.payload;
    if (!payload) {
      throw new Error('Request payload is undefined');
    }

    const { email, password } = payload as { email: string; password: string };
    if (!email || !password) {
      throw new Error('Email or password is missing in request payload');
    }


    const userData: IUser = request.payload as IUser;
    const newUser = await AuthService.signup(userData);
    console.log("userData",request.payload)
    return h.response(newUser).code(201);
  } catch (error:any) {
    console.error('Error signing up user:', error);
    return h.response(error.message).code(500);
  }
};



export const login = async (request: Request, h: ResponseToolkit) => {
    console.log("inside Auth Controller")
  try {
    console.log("request",request.payload)
    const { email, password } = request.payload as { email: string; password: string };
    const token = await AuthService.login(email, password);
    console.log("token",token)
    return h.response({ token }).code(200);
  } catch (error:any) {
    console.error('Error logging in user:', error);
    return h.response(error.message).code(500);
  }
};



