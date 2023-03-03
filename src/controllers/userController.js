import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";
import "dotenv/config";
import fetch from "cross-fetch";
import { token } from "morgan";

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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const authorizeUrl = `${baseUrl}?${params}`;
  return res.redirect(authorizeUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const accessTokenUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(accessTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com/user";
    const userData = await (
      await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const userEmail = emailData.find(
      (emailObj) => emailObj.primary === true && emailObj.verified === true
    );
    if (!userEmail) {
      return res.status(400).render("users/login", {
        pageTitle: "Login",
        errorMessage: "깃허브 계정에 이메일이 존재하지 않습니다.",
      });
    }
    let user = await User.findOne({ email: userEmail.email });
    if (!user) {
      user = await User.create({
        userId: userData.login,
        password: `${userData.name}#${userData.id}`,
        nickname: userData.name,
        email: userEmail.email,
        name: userData.name,
        socialLogin: true,
        avatarUrl: userData.avatar_url,
      });
    }
    if (user.socialLogin === false) {
      return res.status(400).render("users/login", {
        pageTitle: "Login",
        errorMessage: "해당 이메일을 사용중인 계정이 이미 존재합니다.",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "토큰이 없습니다.",
    });
  }
};

export const logout = async (req, res) => {
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

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const userData = await User.findById(id);
  if (!userData) {
    return res.status(404).render("404", { pageTitle: "User Not Found" });
  }
  return res.render("users/profile", {
    pageTitle: userData.nickname,
    userData,
  });
};

export const getEdit = async (req, res) => {
  const { user } = req.session;
  return res.render("users/edit-profile", { pageTitle: "Edit Profile", user });
};

export const postEdit = async (req, res) => {
  const { user } = req.session;
  const { name, email, nickname } = req.body;
  const { file } = req;

  const nameCompare = user.name === name;
  const emailCompare = user.email === email;
  const nicknameCompare = user.nickname === nickname;
  const findEmail = await User.exists({ email });
  if (findEmail && !emailCompare) {
    return res.render("users/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "이미 존재하는 이메일 입니다.",
      user,
    });
  }
  const findNickname = await User.exists({ nickname });
  if (findNickname && !nicknameCompare) {
    return res.render("users/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "이미 존재하는 닉네임 입니다.",
      user,
    });
  }

  const updateUser = await User.findByIdAndUpdate(
    user._id,
    {
      name,
      email,
      nickname,
      avatarUrl: file ? "/" + file.path : user.avatarUrl,
    },
    { new: true }
  );
  req.session.user = updateUser;
  return res.redirect(`/user/${user._id}`);
};
