"use strict";
// services/user.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.create(userData);
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.findAll();
        });
    }
    static getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.findByEmail(email);
        });
    }
    static updateUser(email, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.updateByEmail(email, newData);
        });
    }
    static updateUserById(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.updateById(id, newData);
        });
    }
    static deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.UserRepository.deleteByEmail(email);
        });
    }
}
exports.UserService = UserService;
function createUser(userData) {
    throw new Error('Function not implemented.');
}
exports.createUser = createUser;
