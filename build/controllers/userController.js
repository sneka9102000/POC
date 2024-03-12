"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserById = exports.updateUser = exports.getUserByEmail = exports.getUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const validation = __importStar(require("../validations/userValidation"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const createUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = request.payload;
        const newUser = yield userService_1.UserService.createUser(userData);
        const role = yield roleModel_1.default.findOne({ role: userData.role });
        if (!role) {
            const newRole = yield roleModel_1.default.create({ role: userData.role, users: [newUser._id] });
            const roleId = newRole._id;
            console.log(`Role '${userData.role}' created with user '${newUser.name}'`);
        }
        else {
            const roleId = role._id.toString();
            role.users.push({ userid: newUser._id, name: newUser.name });
            yield role.save();
            console.log(`User '${newUser.name}' added to role '${userData.role}'`);
            newUser.role = roleId;
            yield newUser.save();
        }
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});
exports.createUser = createUser;
const getUsers = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.UserService.getUsers();
        return h.response(users).code(200);
    }
    catch (error) {
        return h.response(error.message).code(500);
    }
});
exports.getUsers = getUsers;
const getUserByEmail = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = request.params.email;
        const user = yield userService_1.UserService.getUser(userEmail);
        if (!user) {
            return h.response({ error: 'User not found', email: userEmail }).code(404);
        }
        return h.response(user).code(200);
    }
    catch (error) {
        return h.response({ error: 'Internal server error', message: error.message }).code(500);
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = request.params.email;
        const { error, value } = validation.updateUserSchema.validate(request.payload);
        if (error) {
            return h.response(error.details[0].message).code(400);
        }
        const payload = Object.assign(Object.assign({}, value), { _id: userEmail });
        delete payload._id;
        const updatedUser = yield userService_1.UserService.updateUser(userEmail, payload);
        if (!updatedUser) {
            return h.response('User not found').code(404);
        }
        return h.response(updatedUser).code(200);
    }
    catch (error) {
        return h.response(error.message).code(500);
    }
});
exports.updateUser = updateUser;
const updateUserById = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const { error, value } = validation.updateUserByIdSchema.validate(request.payload);
        if (error) {
            return h.response(error.details[0].message).code(400);
        }
        const payload = Object.assign(Object.assign({}, value), { _id: userId });
        const updatedUser = yield userService_1.UserService.updateUserById(userId, payload);
        if (!updatedUser) {
            return h.response('User not found').code(404);
        }
        return h.response(updatedUser).code(200);
    }
    catch (error) {
        return h.response(error.message).code(500);
    }
});
exports.updateUserById = updateUserById;
const deleteUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = request.params.email;
        const deletedUser = yield userService_1.UserService.deleteUser(userEmail);
        if (!deletedUser) {
            return h.response('User not found').code(404);
        }
        return h.response(deletedUser).code(200);
    }
    catch (error) {
        return h.response(error.message).code(500);
    }
});
exports.deleteUser = deleteUser;
