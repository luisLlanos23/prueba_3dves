const Joi = require('@hapi/joi');

module.exports = {
  createBooks: {
    body: Joi.object({
      name       : Joi.string().min(1).max(64).required(),
      baseprice  : Joi.string().regex(/(\d\.\d+)/).required(),
      author     : Joi.number().required(),
      categories : Joi.array().items(Joi.number()).min(1).required(),
    }).label('body'),
  },

  readBooksByAuthor: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      author: Joi.number().min(1),
    }),
    query: Joi.object({}),
  },

  readBooksByCategory: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      category: Joi.number().min(1),
    }),
    query: Joi.object({}),
  },
};
