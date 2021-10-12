const tablesMigrationOrder = {
  readall: [
    { filename: 'users' },
    { filename: 'authors' },
    { filename: 'books' },
    { filename: 'categories' },
    { filename: 'bookscategories' },
    { filename: 'sales' },
  ],
};

module.exports = tablesMigrationOrder;
