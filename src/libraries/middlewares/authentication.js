const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: true });

module.exports = authentication;
