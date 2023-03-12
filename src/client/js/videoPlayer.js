const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeBar");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeBar = document.getElementById("volumeBar");
const fullScreenBtn = document.getElementById("fullScreen");
const videoScreenArea = document.querySelector(".watch__video-area");
const videoControllerArea = document.querySelector(".area__video-controller");

let controllerTimeout = null;

const handlePlayBtn = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused
    ? "fa-solid fa-play"
    : "fa-solid fa-pause";
};

const formatTime = (sec) => {
  return new Date(sec * 1000).toISOString().substring(14, 19);
};

const handleLoaddedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineMove = (event) => {
  const handleTime = event.target.value;
  video.currentTime = handleTime;
};

const handleMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fa-solid fa-volume-high";
    volumeBar.classList = "volumeBar__unmute";
  } else {
    video.muted = true;
    muteBtnIcon.classList = "fa-solid fa-volume-xmark";
    volumeBar.classList = "volumeBar__mute";
  }
};

const handleVolumeBar = (event) => {
  const handleVolume = event.target.value;
  video.volume = handleVolume;
  if (handleVolume === "0") {
    video.muted = true;
    muteBtnIcon.classList = "fa-solid fa-volume-xmark";
    volumeBar.classList = "volumeBar__mute";
  } else {
    volumeBar.classList = "volumeBar__unmute";
    muteBtnIcon.classList = "fa-solid fa-volume-high";
    video.muted = false;
  }
};

const handleFullscrren = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoScreenArea.requestFullscreen();
  }
};

const handleFullscrrenChange = () => {
  if (document.fullscreenElement) {
    video.classList.add("watch__video-full");
  } else {
    video.classList.remove("watch__video-full");
  }
};

const hideController = () => {
  return videoControllerArea.classList.remove("controller-showing");
};

const handleMousemove = () => {
  clearTimeout(controllerTimeout);
  controllerTimeout = null;
  videoControllerArea.classList.add("controller-showing");
  controllerTimeout = setTimeout(hideController, 3000);
};

const handleMouseLeave = () => {
  hideController();
};

video.addEventListener("loadedmetadata", handleLoaddedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
playBtn.addEventListener("click", handlePlayBtn);
timeline.addEventListener("input", handleTimelineMove);
muteBtn.addEventListener("click", handleMuteBtn);
volumeBar.addEventListener("input", handleVolumeBar);
fullScreenBtn.addEventListener("click", handleFullscrren);
document.addEventListener("fullscreenchange", handleFullscrrenChange);
videoControllerArea.addEventListener("mousemove", handleMousemove);
videoControllerArea.addEventListener("mouseleave", handleMouseLeave);
videoControllerArea.addEventListener("click", handlePlayBtn);
videoControllerArea.addEventListener("dblclick", handleFullscrren);
