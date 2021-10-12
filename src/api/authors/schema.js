const Joi = require('@hapi/joi');

module.exports = {
  createAuthor: {
    body: Joi.object({
      authors: Joi.array().items({
        name     : Joi.string().max(64).required(),
        lastname : Joi.string().max(64).required(),
      }).min(1).required(),
    }).label('body'),

    headers : Joi.object({}),
    params  : Joi.object({}),
    query   : Joi.object({}),
  },

  readAuthorById: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },

  updateAuthorById: {
    body: Joi.object({
      name     : Joi.string().max(64),
      lastname : Joi.string().max(64),
    }),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },

  removeAuthorById: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({
      id: Joi.number().min(1).required(),
    }),
    query: Joi.object({}),
  },
};
