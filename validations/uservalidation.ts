import Joi from '@hapi/joi';

// Define Joi schema for creating a new user
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Define Joi schema for updating a user
export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});
