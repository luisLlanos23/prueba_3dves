const Joi = require('@hapi/joi');

module.exports = {
  createCategory: {
    body: Joi.object({
      name: Joi.string().min(5).max(64).required(),
    }).label('body'),
    headers : Joi.object({}),
    params  : Joi.object({}),
    query   : Joi.object({}),
  },

  readCategoryById: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },

  updateCategoryById: {
    body: Joi.object({
      name: Joi.string().min(5).max(64).required(),
    }),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },

  removeCategory: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },
};
