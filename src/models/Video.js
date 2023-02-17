import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  uploader: { type: String },
  title: { type: String, required: true, maxLength: 50, trim: true },
  description: { type: String, maxLength: 200, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtag", (hashtags) => {
  return hashtags
    .split(" ")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
