import Video from "../models/Video";

export const home = async (req, res) => {
  const { search } = req.query;
  let videos = [];
  if (!search) {
    videos = await Video.find({});
  } else {
    videos = await Video.find({
      title: {
        $regex: new RegExp(search, "i"),
      },
    });
  }
  return res.status(200).render("home", { pageTitle: "Home", videos });
};

export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("404", { pageTitle: `404 | Video Not Found` });
  }
  return res.status(200).render("videos/watch", { pageTitle: "Watch", video });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: Video.formatHashtag(hashtags),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  return res.status(201).redirect("/");
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("videos/edit-video", { pageTitle: "Edit Video", video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtag(hashtags),
  });
  return res.status(200).redirect(`/video/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.status(200).redirect("/");
};
