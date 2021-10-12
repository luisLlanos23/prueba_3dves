module.exports = {
  authenticationError: () => ({
    status  : 401,
    code    : 'AUTHENTICATION_ERROR',
    message : 'Wrong username and/or password',
    handled : true,
  }),
};
