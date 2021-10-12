const Joi = require('@hapi/joi');

module.exports = {
  createBooks: {
    body: Joi.object({
      name       : Joi.string().min(5).max(64).required(),
      baseprice  : Joi.string().regex(/(\d\.\d+)/).required(),
      author     : Joi.number().required(),
      categories : Joi.array().items(Joi.number()).min(1).required(),
    }).label('body'),
  },
};
