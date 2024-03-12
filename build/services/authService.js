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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userService_1 = require("./userService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth0_1 = require("auth0");
const auth0 = new auth0_1.AuthenticationClient({
    domain: 'manage.auth0.com',
    clientId: 'JKQc8uO5D4qO8HNh2vdAZM4bAWS8IF3D',
    clientSecret: 'R8fRG-n3JRlJVtx8q7XXOR1lgQ1Fzwhui6lzyzSqwaClBctDSo121r6KaDNaIGrH'
});
exports.default = auth0;
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
class AuthService {
    static signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Checking if user already exists
            const existingUser = yield userService_1.UserService.getUser(userData.email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hashing the password
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const newUser = yield userService_1.UserService.createUser({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                residential_address: userData.residential_address,
                role: userData.role,
            });
            return newUser;
        });
    }
    //   public static async login(email: string, password: string): Promise<string> {
    //     console.log("inside auth0 login")
    //     try {
    //       // Authenticate user with Auth0
    //       const { access_token } = await (auth0 as any).passwordRealm({
    //         username: email,
    //         password,
    //         realm: 'Username-Password-Authentication',
    //         scope: 'openid',
    //       });
    //       return access_token;
    //     } catch (error) {
    //       throw new Error('Invalid email or password');
    //     }
    //   }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Checking if user exists
            const user = yield userService_1.UserService.getUser(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }
            // Comparing passwords
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }
            // Generating JWT token
            const token = jsonwebtoken_1.default.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            console.log("token", token);
            return token;
        });
    }
}
exports.AuthService = AuthService;
