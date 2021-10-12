const authenticationService = require('../../services/authentication/authentication.service');

module.exports = {
  authenticateUser: async (req, res, next) => {
    try {
      const userParams = { ...req.body };
      return next(await authenticationService.authenticateUser(userParams));
    } catch (error) { return next({ error }); }
  },
};
