module.exports = (response, req, res, next) => {
  try {
    const { levelUser } = req.user;
    req.body.levelUser = levelUser;
    return next();
  } catch (error) {
    return next({ error });
  }
};
