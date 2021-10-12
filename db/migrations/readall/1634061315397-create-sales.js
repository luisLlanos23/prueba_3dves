const { Sequelize } = require('sequelize');

module.exports = {
  up: (queryInterface, DataTypes) => {
    const sales = queryInterface.createTable('sales', {
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

    return sales;
  },

  down: (queryInterface) => queryInterface.dropTable('sales'),
};
