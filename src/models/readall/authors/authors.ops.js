const sql = require('../../sql');

module.exports = {
  read: async (options) => {
    const result = await sql.readall.models.authors.findAll({
      raw   : true,
      where : { ...options },
    });
    return { result };
  },

  insert: async (data) => {
    const result = await sql.readall.models.authors.bulkCreate(data);
    return { result };
  },

  update: async (data, conditions) => {
    const result = await sql.readall.models.authors.update({ ...data }, {
      where: { ...conditions },
    });
    return { result };
  },

  delete: async (conditions) => {
    const result = await sql.readall.models.authors.destroy({
      where: { ...conditions },
    });
    return { result };
  },
};
