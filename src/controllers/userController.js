import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";

export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "존재하지 않는 ID 입니다.",
    });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "잘못된 비밀번호 입니다.",
    });
  }
  console.log("✅ 로그인 성공 🔑");
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { userId, password, nickname, email, name, password2 } = req.body;
  const existsId = await User.exists({ userId });
  const existsEmail = await User.exists({ email });
  const existsNickname = await User.exists({ nickname });
  if (existsId) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "이미 존재하는 ID 입니다.",
    });
  }
  if (existsEmail) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "이미 존재하는 이메일 입니다.",
    });
  }
  if (existsNickname) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "이미 존재하는 닉네임 입니다.",
    });
  }
  if (password !== password2) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "패스워드를 확인해주세요.",
    });
  }
  try {
    await User.create({
      userId,
      password,
      nickname,
      email,
      name,
    });
    return res.status(200).redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getProfile = (req, res) => {
  return res.render("users/profile", { pageTitle: "Profile" });
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};
