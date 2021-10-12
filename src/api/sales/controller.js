const salesModel = require('../../models/readall/sales/sales.ops');

module.exports = {
  payment: async (req, res, next) => {
    try {
      const { trolley } = { ...req.body };
      return next(await salesModel.insert(trolley));
    } catch (error) { return next({ error }); }
  },

  readSales: async (req, res, next) => {
    try {
      return next(await salesModel.read({}));
    } catch (error) { return next({ error }); }
  },
};
