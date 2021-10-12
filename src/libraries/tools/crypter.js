const bcrypt = require('bcryptjs');

module.exports = {
  encrypData(string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);
    return hash;
  },

  compareData(plainString, hash) {
    return bcrypt.compareSync(plainString, hash);
  },
};
