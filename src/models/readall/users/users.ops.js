const sql = require('../../sql');

module.exports = {
  read: async (options) => {
    const readUser = await sql.entertainmentPi.models.users.findAll({
      raw   : true,
      where : { ...options },
    });

    return readUser;
  },

  insert: async (data) => {
    const result = await sql.entertainmentPi.models.users.bulkCreate(data);
    return result;
  },

  update: async (data, conditions) => {
    const result = await sql.entertainmentPi.models.users.update({ ...data }, {
      where: { ...conditions },
    });

    return result;
  },

  delete: async (conditions) => {
    const result = await sql.entertainmentPi.models.users.destroy({
      where: { ...conditions },
    });

    return result;
  },
};
