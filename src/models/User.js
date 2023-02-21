import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
