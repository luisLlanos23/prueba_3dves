const app = require('express').Router();

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const jwtPassport = require('../../modules/authentication/authentication.module');
const config = require('../../../config/config');

app.use(cookieParser());

app.use(session({
  saveUninitialized : false,
  resave            : false,
  secret            : config.session.secret,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

jwtPassport();

module.exports = app;
