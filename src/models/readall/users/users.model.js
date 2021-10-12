module.exports = (ConnectionInterface, DataTypes) => {
  const users = ConnectionInterface.define('users', {
    userId: {
      type          : DataTypes.INTEGER,
      autoIncrement : true,
      allowNull     : false,
      primaryKey    : true,
    },
    username: {
      type      : DataTypes.STRING(32),
      allowNull : false,
    },
    password: {
      type      : DataTypes.STRING(512),
      allowNull : false,
    },
    level: {
      type      : DataTypes.STRING(32),
      allowNull : false,
    },
  }, {
    timestamps      : false,
    freezeTableName : true,
    tableName       : 'users',
  });

  return users;
};
