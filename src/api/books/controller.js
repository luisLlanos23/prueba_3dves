module.exports = {
  createBooks: async (req, res, next) => {
    try {
      const booksData = { ...req.body };
      console.log(booksData);
      return next({});
    } catch (error) { return next({ error }); }
  },
};
