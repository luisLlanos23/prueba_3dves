module.exports = {
  up: (queryInterface, DataTypes) => {
    const users = queryInterface.createTable('users', {
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
      email: {
        type      : DataTypes.STRING(64),
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
  },

  down: (queryInterface) => queryInterface.dropTable('users'),
};
