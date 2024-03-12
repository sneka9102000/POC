"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByIdSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
// Joi schema for creating a new user
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    residential_address: joi_1.default.object({
        address: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
    }).required(),
    role: joi_1.default.string().valid('admin', 'employee', 'user').optional(),
});
// Joi schema for updating a user by email
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string(),
    residential_address: joi_1.default.object({
        address: joi_1.default.string(),
        state: joi_1.default.string(),
        city: joi_1.default.string(),
    }),
    role: joi_1.default.string().valid('admin', 'employee', 'user').optional(),
});
// Joi schema for updating a user by ID
exports.updateUserByIdSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string(),
    residential_address: joi_1.default.object({
        address: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        city: joi_1.default.string().required()
    }).required(),
    role: joi_1.default.string().valid('admin', 'employee', 'user').optional(),
});
