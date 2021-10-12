
module.exports = {
  up: (queryInterface, DataTypes) => {
    const categories = queryInterface.createTable('categories', {
      id: {
        type          : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull     : false,
        primaryKey    : true,
      },
      name: {
        type      : DataTypes.STRING(64),
        unique    : true,
        allowNull : false,
      },
    }, {
      timestamps      : false,
      freezeTableName : true,
      tableName       : 'categories',
    });

    return categories;
  },

  down: (queryInterface) => queryInterface.dropTable('categories'),
};
