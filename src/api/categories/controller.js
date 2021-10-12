const categoriesServices = require('../../models/readall/categories/categories.ops');

module.exports = {
  createCategory: async (req, res, next) => {
    try {
      const dataCategory = { ...req.body };
      return next(await categoriesServices.insert(dataCategory));
    } catch (error) { return next({ error }); }
  },

  readCategory: async (req, res, next) => {
    try {
      return next(await categoriesServices.read({}));
    } catch (error) { return next({ error }); }
  },

  updateCategory: async (req, res, next) => {
    try {
      const categoryId = { ...req.params };
      const categoryData = { ...req.body };
      return next(await categoriesServices.update(categoryData, categoryId));
    } catch (error) { return next({ error }); }
  },

  removeCategory: async (req, res, next) => {
    try {
      const categoryId = { ...req.params };
      return next(await categoriesServices.delete(categoryId));
    } catch (error) { return next({ error }); }
  },
};
