const crypter = require('../../../src/libraries/tools/crypter');

module.exports = {
  up: async (queryInterface) => {
    const superuserPassword = await crypter.encrypData('3dves');
    const adminPassword = await crypter.encrypData('admin');
    const userPassword = await crypter.encrypData('user');
    const maintenancePassword = await crypter.encrypData('labor');

    return queryInterface.bulkInsert('users', [{
      userId   : 1,
      username : '3dves',
      password : superuserPassword,
      level    : 'superuser',
    },
    {
      userId   : 2,
      username : 'admin',
      password : adminPassword,
      level    : 'admin',
    },
    {
      userId   : 3,
      username : 'user',
      password : userPassword,
      level    : 'user',
    },
    {
      userId   : 4,
      username : 'labor',
      password : maintenancePassword,
      level    : 'maintenance',
    }]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
