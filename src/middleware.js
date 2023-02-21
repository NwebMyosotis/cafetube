export const localLoggedIn = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  res.locals.siteName = "Cafetube";
  console.log(res.locals);
  next();
};
