const booksModel = require('../../models/readall/books/bookss.ops');
const booksCategoriesModel = require('../../models/readall/bookscategories/bookscategories.ops');

module.exports = {
  createBooks: async (booksData) => {
    const book = {
      name      : booksData.name,
      baseprice : booksData.baseprice,
      author    : booksData.author,
    };
    const response = await booksModel.insert(book);

    const data = booksData.categories.map((row) => ({ idBook: response.id, idCategory: row }));
    await booksCategoriesModel.insert(data);
    return {};
  },

  readBooks: async () => {
    const result = await booksModel.readBooks();
    return { result };
  },
};
