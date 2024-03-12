import { ServerRoute } from '@hapi/hapi';
import { createUser, getUsers, getUserByEmail, deleteUser, updateUser,updateUserById } from '../controllers/userController';
import { fetchProfileData, login, signup } from '../controllers/authController';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/signup', 
    handler: signup,
  },
  // {
  //   method: 'GET',
  //   path: "/login", 
  //   handler: login,
  // },
  {
    method: 'POST',
    path: "/api/login", 
    handler: login,
  },
  {
    method: 'GET',
    path: '/api/profile',
    handler: fetchProfileData,
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: createUser,
    // options: {
    //   auth: 'jwt',
    // },
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: getUsers,
    // options: {
    //   auth: 'jwt',
    // },
  },
  {
    method: 'GET',
    path: '/api/users/{email}',
    handler: getUserByEmail,
  },
  {
    method: 'PUT',
    path: '/api/users/{email}',
    handler: updateUser,
  },
  {
    method: 'PUT',
    path: '/api/users/update/{id}',
    handler: updateUserById,
  },
  {
    method: 'DELETE',
    path: '/api/users/{email}',
    handler: deleteUser,
  },
];

export default routes;
