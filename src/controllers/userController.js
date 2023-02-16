export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};

export const getProfile = (req, res) => {
  return res.render("users/profile", { pageTitle: "Profile" });
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};
