const categories = require('../categories/categories.model');

module.exports = (ConnectionInterface, DataTypes) => {
  const caregory = categories(ConnectionInterface, DataTypes);

  const bookscategories = ConnectionInterface.define('bookscategories', {
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

  bookscategories.hasMany(caregory, { foreignKey: 'id', sourceKey: 'idCategory' });

  return bookscategories;
};
