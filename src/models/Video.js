import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  uploader: String,
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
