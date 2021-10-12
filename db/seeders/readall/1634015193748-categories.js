module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('categories', [{
    name: 'suspenso',
  },
  {
    name: 'terror',
  },
  {
    name: 'ciencia ficcion',
  },
  {
    name: 'romance',
  },
  {
    name: 'sobrenatural',
  },
  {
    name: 'misterio',
  },
  {
    name: 'accion',
  },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
