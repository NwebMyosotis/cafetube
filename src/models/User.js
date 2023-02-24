import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  nickname: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 64,
    trim: true,
  },
  email: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  avatarUrl: {
    type: String,
    required: true,
    default: "/uploads/avatars/00c5248098e141ae69b9abaafefdf2a7",
    trim: true,
  },
  socialLogin: { type: Boolean, default: false, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
