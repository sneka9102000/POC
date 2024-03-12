"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const routes = [
    {
        method: 'POST',
        path: '/api/signup',
        handler: authController_1.signup,
    },
    // {
    //   method: 'GET',
    //   path: "/login", 
    //   handler: login,
    // },
    {
        method: 'POST',
        path: "/api/login",
        handler: authController_1.login,
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: userController_1.createUser,
        // options: {
        //   auth: 'jwt',
        // },
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: userController_1.getUsers,
        // options: {
        //   auth: 'jwt',
        // },
    },
    {
        method: 'GET',
        path: '/api/users/{email}',
        handler: userController_1.getUserByEmail,
    },
    {
        method: 'PUT',
        path: '/api/users/{email}',
        handler: userController_1.updateUser,
    },
    {
        method: 'PUT',
        path: '/api/users/update/{id}',
        handler: userController_1.updateUserById,
    },
    {
        method: 'DELETE',
        path: '/api/users/{email}',
        handler: userController_1.deleteUser,
    },
];
exports.default = routes;
