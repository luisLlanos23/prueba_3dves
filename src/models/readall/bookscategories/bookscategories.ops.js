const sql = require('../../sql');

module.exports = {

  read: async (options) => {
    const result = await sql.readall.models.bookscategories.findAll({
      raw   : true,
      where : { ...options },
    });
    return result;
  },

  insert: async (data) => {
    const result = await sql.readall.models.bookscategories.bulkCreate(data);
    return result;
  },

  update: async (data, conditions) => {
    const result = await sql.readall.models.bookscategories.update({ ...data }, {
      where: { ...conditions },
    });
    return result;
  },

  delete: async (conditions) => {
    const result = await sql.readall.models.bookscategories.destroy({
      where: { ...conditions },
    });
    return result;
  },
};
