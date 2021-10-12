module.exports = {
  up: (queryInterface, DataTypes) => {
    const books = queryInterface.createTable('books', {
      id: {
        type          : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull     : false,
        primaryKey    : true,
      },
      name: {
        type      : DataTypes.STRING(64),
        allowNull : false,
      },
      baseprice: {
        type      : DataTypes.FLOAT(11),
        allowNull : false,
      },
      author: {
        type       : DataTypes.INTEGER,
        allowNull  : false,
        references : {
          model : 'authors',
          key   : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',

      },
    }, {
      timestamps      : false,
      freezeTableName : true,
      tableName       : 'books',
    });

    return books;
  },

  down: (queryInterface) => queryInterface.dropTable('books'),
};
