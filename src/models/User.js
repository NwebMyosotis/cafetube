import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: String,
  userId: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
export default User;
