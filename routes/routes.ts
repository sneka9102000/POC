import { ServerRoute } from '@hapi/hapi';
import { createUser, getUsers, getUserByEmail, deleteUser, updateUser,updateUserById } from '../controllers/userController';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/users',
    handler: createUser,
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: getUsers,
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
