module.exports = {
  up: (queryInterface, DataTypes) => {
    const bookscategories = queryInterface.createTable('bookscategories', {
      id: {
        type          : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull     : false,
        primaryKey    : true,
      },
      idBook: {
        type       : DataTypes.INTEGER,
        allowNull  : false,
        references : {
          model : 'books',
          key   : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
      idCategory: {
        type       : DataTypes.INTEGER,
        allowNull  : false,
        references : {
          model : 'categories',
          key   : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
    }, {
      timestamps      : false,
      freezeTableName : true,
      tableName       : 'bookscategories',
    });

    return bookscategories;
  },

  down: (queryInterface) => queryInterface.dropTable('bookscategories'),
};
