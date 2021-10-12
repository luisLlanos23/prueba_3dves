const authenticationProviders = require('../../providers/authentication/authentication.provider');
const userModels = require('../../models/readall/users/users.ops');
const authenticationError = require('../../libraries/error/authentication.error');
const crypt = require('../../libraries/tools/crypter');

module.exports = {
  async authenticateUser(userParams) {
    const { username, password, rememberme } = userParams;
    const userData = await userModels.read({ username });

    if (!userData.length) {
      throw authenticationError.authenticationError();
    }

    const { userId, password: passwordUser, level } = userData[0];

    if (!crypt.compareData(password, passwordUser)) {
      throw authenticationError.authenticationError();
    }

    const user = {
      userId,
      passwordUser,
      level,
    };

    const token = authenticationProviders.createToken(user, rememberme);
    return { result: { ...token } };
  },
};
