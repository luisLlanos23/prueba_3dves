const sql = require('../../sql');

module.exports = {
  read: async (options) => {
    const readUser = await sql.readall.models.books.findAll({
      raw   : true,
      where : { ...options },
    });
    return readUser;
  },

  insert: async (data) => {
    const result = await sql.readall.models.books.create(data);
    return result;
  },

  update: async (data, conditions) => {
    const result = await sql.readall.models.books.update({ ...data }, {
      where: { ...conditions },
    });
    return result;
  },

  delete: async (conditions) => {
    const result = await sql.readall.models.books.destroy({
      where: { ...conditions },
    });
    return result;
  },
};
