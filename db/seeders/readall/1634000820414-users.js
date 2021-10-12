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
      email    : 'superUser@3dves.com',
      password : superuserPassword,
      level    : 'superuser',
    },
    {
      userId   : 2,
      username : 'admin',
      email    : 'admin@3dves.com',
      password : adminPassword,
      level    : 'admin',
    },
    {
      userId   : 3,
      username : 'user',
      email    : 'user@3dves.com',
      password : userPassword,
      level    : 'user',
    },
    {
      userId   : 4,
      username : 'labor',
      email    : 'labor@3dves.com',
      password : maintenancePassword,
      level    : 'maintenance',
    }]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
