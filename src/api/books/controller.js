const booksServices = require('../../services/books/books.service');

module.exports = {
  createBooks: async (req, res, next) => {
    try {
      const booksData = { ...req.body };
      return next(await booksServices.createBooks(booksData));
    } catch (error) { return next({ error }); }
  },
};
