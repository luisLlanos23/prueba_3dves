module.exports = (ConnectionInterface, DataTypes) => {
  const categories = ConnectionInterface.define('categories', {
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
};
