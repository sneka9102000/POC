import Joi from '@hapi/joi';

// Joi schema for creating a new user
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  residential_address: Joi.object({
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  }).required(),
  role: Joi.string().valid('admin', 'employee', 'user').optional(), 
});

// Joi schema for updating a user by email
export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  residential_address: Joi.object({
    address: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
  }),
  role: Joi.string().valid('admin', 'employee', 'user').optional(),
});


// Joi schema for updating a user by ID
export const updateUserByIdSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  residential_address: Joi.object({
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required()
  }).required(),
  role: Joi.string().valid('admin', 'employee', 'user').optional(), 
});
