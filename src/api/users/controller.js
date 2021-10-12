const usersModel = require('../../models/readall/users/users.ops');
const crypter = require('../../libraries/tools/crypter');

module.exports = {
  async read(req, res, next) {
    try {
      const readUserData = { ...req.params };
      return next(await usersModel.read(readUserData));
    } catch (error) {
      return next({ error });
    }
  },

  async insert(req, res, next) {
    try {
      const { usersData } = { ...req.body };
      const users = usersData.map((row) => {
        const pwd = crypter.encrypData(row.password);
        return { ...row, password: pwd };
      });
      return next(await usersModel.insert(users));
    } catch (error) { return next({ error }); }
  },

  async update(req, res, next) {
    try {
      const userId = { ...req.params };
      const userData = { ...req.body };
      userData.password = crypter.encrypData(userData.password);
      return next(await usersModel.update(userData, userId));
    } catch (error) { return next({ error }); }
  },

  async remove(req, res, next) {
    try {
      const userId = { ...req.params };
      return next(await usersModel.delete(userId));
    } catch (error) { return next({ error }); }
  },
};
