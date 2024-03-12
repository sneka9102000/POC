
import { Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService } from '../services/authService';
import { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';


const JWT_SECRET = process.env.JWT_SECRET ;

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
    return h.response(newUser).code(201);
  } catch (error:any) {
    console.error('Error signing up user:', error);
    return h.response(error.message).code(500);
  }
};



export const login = async (request: Request, h: ResponseToolkit) => {
  try {
    const { email, password } = request.payload as { email: string; password: string };
    const token = await AuthService.login(email, password);
    return h.response({ token }).code(200);
  } catch (error:any) {
    console.error('Error logging in user:', error);
    return h.response(error.message).code(500);
  }
};


const axios = require('axios');

export const fetchProfileData = async (request: Request, h: ResponseToolkit) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    console.log("Token in BE:", token);

    if (!token) {
      throw new Error('Token not provided');
    }

    // Making a request to Auth0's /userinfo endpoint
    const response = await axios.get('https://dev-pwgws0wqro5atj3i.us.auth0.com/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // User data received from Auth0
      const userData = response.data;
      
      // Checking  if the user exists in Auth0
      if (userData.sub) {
        console.log("User Exists in Auth0")
        console.log("userData",userData)
        return h.response("User verified from Auth0").code(200);
      } else {
        throw new Error('User not found in Auth0');
      }
    } else {
      // Token validation failed
      throw new Error('Token validation failed');
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return h.response('Error fetching profile data').code(500);
  }
};






