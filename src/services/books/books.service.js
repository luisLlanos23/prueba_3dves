const booksModel = require('../../models/readall/books/bookss.ops');

module.exports = {
  createBooks: async (booksData) => {
    const book = {
      name      : booksData.name,
      baseprice : booksData.baseprice,
      author    : booksData.author,
    };
    const response = await booksModel.insert(book);
    console.log(response);
    return { response };
  },
};
