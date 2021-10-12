const authorsModel = require('../../models/readall/authors/authors.ops');

module.exports = {
  createAuthors: async (req, res, next) => {
    try {
      const { authors } = { ...req.body };
      return next(await authorsModel.insert(authors));
    } catch (error) { return next({ error }); }
  },

  readAuthors: async (req, res, next) => {
    try {
      return next(await authorsModel.read({}));
    } catch (error) { return next({ error }); }
  },

  readAuthorById: async (req, res, next) => {
    try {
      const author = { ...req.params };
      return next(await authorsModel.read(author));
    } catch (error) { return next({ error }); }
  },

  updateAuthor: async (req, res, next) => {
    try {
      const authorId = { ...req.params };
      const authorData = { ...req.body };
      return next(await authorsModel.update(authorData, authorId));
    } catch (error) { return next({ error }); }
  },

  removeAuthor: async (req, res, next) => {
    try {
      const authorId = { ...req.params };
      return next(await authorsModel.delete(authorId));
    } catch (error) { return next({ error }); }
  },
};
