module.exports = {
  up: (queryInterface, DataTypes) => {
    const authors = queryInterface.createTable('authors', {
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
      lastname: {
        type      : DataTypes.STRING(64),
        allowNull : false,
      },
    }, {
      timestamps      : false,
      freezeTableName : true,
      tableName       : 'authors',
    });

    return authors;
  },

  down: (queryInterface) => queryInterface.dropTable('authors'),
};
