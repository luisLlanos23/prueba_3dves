const Joi = require('@hapi/joi');

module.exports = {
  payment: {
    body: Joi.object({
      trolley: Joi.array().items(
        Joi.object({
          userId  : Joi.number().min(1),
          idBook  : Joi.number().min(1),
          paidOut : Joi.string().regex(/(\d\.\d+)/).required(),
        }),
      ).required(),
    }),
    headers : Joi.object({}),
    params  : Joi.object({}),
    query   : Joi.object({}),
  },

  allSales: {
    body    : Joi.object({}),
    headers : Joi.object({}),
    params  : Joi.object({}),
    query   : Joi.object({}),
  },
};
