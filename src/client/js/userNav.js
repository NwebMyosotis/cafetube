const loginUserAvatar = document.querySelector(".header-nav__avatar");
const loginUserNav = document.querySelector(".header-nav__ul");
const mypageBtn = document.getElementById("button__mypage");
const uploadBtn = document.getElementById("button__upload");
const logoutBtn = document.getElementById("button__logout");
const body = document.querySelector("body");

const handleClick = () => {
  loginUserNav.classList.add("header-nav__ul_show");
  mypageBtn.classList.add("showing-mypage");
  uploadBtn.classList.add("showing-upload");
  logoutBtn.classList.add("showing-logout");
};

const handleCloseClick = (event) => {
  const target = event.target;
  const avatar = event.currentTarget.querySelector(".header-nav__avatar");
  const navBtn = event.currentTarget.querySelector(".header-nav-ul");
  if (target === (avatar || navBtn)) {
    return; //그냥 selector로 비교해도 됨.
  }
  mypageBtn.classList.remove("showing-mypage");
  uploadBtn.classList.remove("showing-upload");
  logoutBtn.classList.remove("showing-logout");
  loginUserNav.classList.remove("header-nav__ul_show");
};

loginUserAvatar.addEventListener("click", handleClick);
body.addEventListener("click", handleCloseClick);
