const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const userModels = require('../../models/pilc/users/users.ops');
const config = require('../../../config/config');

const authOptions = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey    : config.session.jwtSecret,
};

module.exports = () => {
  passport.use(new JwtStrategy(authOptions, async (payload, done) => {
    const { userId } = payload;
    try {
      const { result: readUser } = await userModels.read({ userId });

      if (!readUser.length) {
        return done(null, false);
      }

      return done(null, readUser[0]);
    } catch (error) {
      return done(error, false);
    }
  }));
};
