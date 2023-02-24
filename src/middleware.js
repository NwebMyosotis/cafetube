import multer from "multer";

export const localLoggedIn = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {}; //세션에 uesr데이터가 있는지 없는지 여부를 구분하기 위함
  res.locals.siteName = "CafeTube";
  next();
};

export const needLogin = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "로그인이 필요한 서비스입니다.",
    });
  } else {
    next();
  }
};

export const needLogout = (req, res, next) => {
  if (req.session.loggedIn === true) {
    return res.redirect("/");
  } else {
    next();
  }
};

export const uploadAvatar = multer({
  dest: `uploads/avatars/`,
});

export const uploadThumbnail = multer({
  dest: `uploads/thumbnails/`,
});

export const uploadVideo = multer({
  dest: `uploads/videos/`,
  limits: { fileSize: 10485760 }, //10mb 제한
});
