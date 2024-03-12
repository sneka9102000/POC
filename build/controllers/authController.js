"use strict";
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
exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const signup = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.payload;
        if (!payload) {
            throw new Error('Request payload is undefined');
        }
        const { email, password } = payload;
        if (!email || !password) {
            throw new Error('Email or password is missing in request payload');
        }
        const userData = request.payload;
        const newUser = yield authService_1.AuthService.signup(userData);
        console.log("userData", request.payload);
        return h.response(newUser).code(201);
    }
    catch (error) {
        console.error('Error signing up user:', error);
        return h.response(error.message).code(500);
    }
});
exports.signup = signup;
const login = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside Auth Controller");
    try {
        console.log("request", request.payload);
        const { email, password } = request.payload;
        const token = yield authService_1.AuthService.login(email, password);
        console.log("token", token);
        return h.response({ token }).code(200);
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return h.response(error.message).code(500);
    }
});
exports.login = login;
