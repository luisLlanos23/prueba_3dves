const tablesMigrationOrder = {
  readall: [
    { filename: 'users' },
    { filename: 'authors' },
    { filename: 'books' },
    { filename: 'categories' },
    { filename: 'bookscategories' },
  ],
};

module.exports = tablesMigrationOrder;
