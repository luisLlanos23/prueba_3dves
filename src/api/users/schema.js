const Joi = require('@hapi/joi');

module.exports = {
  readUsers: {
    query  : Joi.object({}),
    params : Joi.object({
      userId   : Joi.number().min(1),
      username : Joi.string().min(1).max(64).optional(),
      email    : Joi.string().email({ tlds: { allow: ['co', 'es', 'com', 'net'] } }).min(2).max(64),
      level    : Joi.string().valid('superuser', 'admin', 'user', 'maintenance').optional(),
    }),
  },

  insertSchema: {
    headers : Joi.object({}).options({ allowUnknown: true }).label('headers'),
    body    : Joi.object({
      usersData: Joi.array().items(
        Joi.object({
          username: Joi.string().min(1).max(30).alphanum()
            .required(),
          level : Joi.string().valid('superuser', 'admin', 'user', 'maintenance').required(),
          email : Joi.string().email({ tlds: { allow: ['co', 'es', 'com', 'net'] } }).min(2).max(64)
            .required(),
          password: Joi.string().min(4).max(16).regex(/^[a-zA-Z0-9$#\-_@%*!]{4,16}$/)
            .required(),
        }),
      ).required(),
    }),
  },

  updateUsers: {
    query  : Joi.object({}),
    params : Joi.object({
      userId: Joi.number().min(1).required(),
    }),
    body: Joi.object({
      username : Joi.string().min(1).max(30),
      level    : Joi.string().valid('superuser', 'admin', 'user', 'maintenance'),
      email    : Joi.string().email({ tlds: { allow: ['co', 'es', 'com', 'net'] } }).min(2).max(64),
      password : Joi.string().min(4).max(16).regex(/^[a-zA-Z0-9$#\-_@%*!]{4,16}$/),
    }),
  },

  deleteUser: {
    query  : Joi.object({}),
    params : Joi.object({
      userId: Joi.number().min(1).required(),
    }),
    body: Joi.object({}),
  },
};
