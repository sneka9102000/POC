import { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService } from '../services/userService';
import { IUser } from '../models/userModel';
import * as validation from '../validations/userValidation'; 

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userData: IUser = request.payload as IUser;
     if (userData.residential_address) {
      delete userData.residential_address._id;
    }
    const { error, value } = validation.createUserSchema.validate(userData);
    if (error) {
      return h.response(error.details[0].message).code(400); 
    }
    const newUser = await UserService.createUser(userData);
    return h.response(newUser).code(201);
  } catch (error:any) {
    return h.response(error.message).code(500);
  }
};

export const getUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const users = await UserService.getUsers();
    return h.response(users).code(200);
  } catch (error:any) {
    return h.response(error.message).code(500);
  }
};

export const getUserByEmail = async (request: Request, h: ResponseToolkit) => {
  try {
    const userEmail = request.params.email;
    const user = await UserService.getUser(userEmail);
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
        const { error, value } = validation.updateUserSchema.validate(request.payload);
    if (error) {
      return h.response(error.details[0].message).code(400);
    }
    const payload: Partial<IUser> = { ...value, _id: userEmail };
    delete payload._id; 

    const updatedUser = await UserService.updateUser(userEmail, payload);
    if (!updatedUser) {
      return h.response('User not found').code(404);
    }
    return h.response(updatedUser).code(200);
  } catch (error:any) {
    return h.response(error.message).code(500);
  }
};



export const updateUserById = async (request: Request, h: ResponseToolkit) => {
  try {
    const userId = request.params.id; 
    const { error, value } = validation.updateUserByIdSchema.validate(request.payload);
    if (error) {
      return h.response(error.details[0].message).code(400);
    }

    const payload: Partial<IUser> = { ...value, _id: userId };


    const updatedUser = await UserService.updateUserById(userId, payload);
    if (!updatedUser) {
      return h.response('User not found').code(404);
    }
    return h.response(updatedUser).code(200);
  } catch (error:any) {
    return h.response(error.message).code(500);
  }
};




export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userEmail = request.params.email;
    const deletedUser = await UserService.deleteUser(userEmail);
    if (!deletedUser) {
      return h.response('User not found').code(404);
    }
    return h.response(deletedUser).code(200);
  } catch (error:any) {
    return h.response(error.message).code(500);
  }
};
