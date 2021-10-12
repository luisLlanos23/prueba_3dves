module.exports = (ConnectionInterface, DataTypes) => {
  const authors = ConnectionInterface.define('authors', {
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
};
