const { Sequelize } = require('sequelize');
const booksModel = require('../books/books.model');
const usersModel = require('../users/users.model');

module.exports = (ConnectionInterface, DataTypes) => {
  const books = booksModel(ConnectionInterface, DataTypes);
  const users = usersModel(ConnectionInterface, DataTypes);

  const sales = ConnectionInterface.define('sales', {
    id: {
      type          : DataTypes.INTEGER,
      autoIncrement : true,
      allowNull     : false,
      primaryKey    : true,
    },
    userId: {
      type       : DataTypes.INTEGER,
      allowNull  : false,
      references : {
        model : 'users',
        key   : 'userId',
      },
      onUpdate: 'CASCADE',
    },
    idBook: {
      type       : DataTypes.INTEGER,
      allowNull  : false,
      references : {
        model : 'books',
        key   : 'id',
      },
      onUpdate: 'CASCADE',
    },
    paidOut: {
      type      : DataTypes.FLOAT(11),
      allowNull : false,
    },
    created_at: {
      type         : DataTypes.DATE,
      defaultValue : Sequelize.NOW,
      allowNull    : true,
    },
  }, {
    timestamps      : false,
    freezeTableName : true,
    tableName       : 'sales',
  });

  sales.hasMany(books, { foreignKey: 'id', sourceKey: 'idBook' });
  sales.hasOne(users, { foreignKey: 'userId', sourceKey: 'userId' });

  return sales;
};
