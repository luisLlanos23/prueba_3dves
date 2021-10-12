module.exports = (ConnectionInterface, DataTypes) => {
  const books = ConnectionInterface.define('books', {
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
  }, {
    timestamps      : false,
    freezeTableName : true,
    tableName       : 'books',
  });

  return books;
};
