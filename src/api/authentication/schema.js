const Joi = require('@hapi/joi');

module.exports = {
  post_login: {
    body: Joi.object({
      username : Joi.string().max(16).alphanum().required(),
      password : Joi.string().min(4).max(16).regex(/^[a-zA-Z0-9$#\-_@%*!]{4,16}$/)
        .required(),
      rememberme: Joi.boolean().strict().optional(),
    }).label('body'),
  },

  get_logout: Joi.object({
    headers: Joi.object({
    }),

    params: Joi.object({
    }),

    query: Joi.object({
    }),

    body: Joi.object({
    }),
  }),
};
