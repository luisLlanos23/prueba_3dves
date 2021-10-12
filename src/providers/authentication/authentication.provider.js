const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports = {
  createToken(user, rememberme) {
    const { userId, username, level } = user;

    const token = jwt.sign(
      { userId, username, level },
      config.session.jwtSecret,
      { expiresIn: rememberme ? '30 days' : '10h' },
    );

    const { exp } = jwt.decode(token, config.session.jwtSecret);
    return { token, expirationDate: new Date(exp * 1000).toISOString() };
  },
};
