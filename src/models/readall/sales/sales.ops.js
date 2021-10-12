const sql = require('../../sql');

module.exports = {
  read: async () => {
    const result = await sql.readall.models.sales.findAll({
      attributes : ['id'],
      include    : [
        {
          model    : sql.readall.models.books,
          required : false,
        },
        {
          model      : sql.readall.models.users,
          required   : false,
          attributes : ['username', 'email'],

        }],
    });
    return { result };
  },

  insert: async (data) => {
    const result = await sql.readall.models.sales.bulkCreate(data);
    return { result };
  },

  update: async (data, conditions) => {
    const result = await sql.readall.models.sales.update({ ...data }, {
      where: { ...conditions },
    });
    return { result };
  },

  delete: async (conditions) => {
    const result = await sql.readall.models.sales.destroy({
      where: { ...conditions },
    });
    return { result };
  },
};
