import { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService } from '../services/userService';
import { IUser } from '../models/userModel';
import * as validation from '../validations/userValidation'; 
import RoleModel from '../models/roleModel'; 

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {

    const userData: IUser = request.payload as IUser;
    const newUser = await UserService.createUser(userData);

    const role = await RoleModel.findOne({ role: userData.role });

    if (!role) {
      const newRole = await RoleModel.create({ role: userData.role, users: [newUser._id] });
      console.log(`Role '${userData.role}' created with user '${newUser.name}'`);
    } else {
      role.users.push({ userid: newUser._id, name: newUser.name });
      await role.save();
      console.log(`User '${newUser.name}' added to role '${userData.role}'`);
    }

    return newUser;
  } 
  catch (error) {
    // console.error('Error creating user:', error);
    throw error;
  }
};


export const getUsers = async (request: Request, h: ResponseToolkit) => {
  console.log("hello")
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
