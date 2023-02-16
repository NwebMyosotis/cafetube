export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getWatch = (req, res) => {
  return res.render("videos/watch", { pageTitle: "Watch" });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const getEdit = (req, res) => {
  return res.render("videos/edit-video", { pageTitle: "Edit Video" });
};
