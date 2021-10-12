const booksServices = require('../../services/books/books.service');

module.exports = {
  createBooks: async (req, res, next) => {
    try {
      const booksData = { ...req.body };
      return next(await booksServices.createBooks(booksData));
    } catch (error) { return next({ error }); }
  },

  readBooks: async (req, res, next) => {
    try {
      return next(await booksServices.readBooks());
    } catch (error) { return next({ error }); }
  },

  readBook: async (req, res, next) => {
    try {
      const id = { ...req.params };
      return next(await booksServices.readBookById(id));
    } catch (error) { return next({ error }); }
  },
};
