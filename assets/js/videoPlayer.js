const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;
let playBtn;
let volumeBtn;
let fullScrnBtn;
let currentTime;
let totalTime;

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitHandler() {
  document.removeEventListener("keydown", handleESC);
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.removeEventListener("click", handleCompressScreen);
  fullScrnBtn.addEventListener("click", handleExpandScreen);
}

function handleESC(e) {
  e.preventDefault();
  if (e.key === "Escape") {
    exitHandler();
  }
}
function handleExpandScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  //videoPlayer.requestFullscreen();으로도 현재 작동하긴 한다.

  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", handleExpandScreen);
  fullScrnBtn.addEventListener("click", handleCompressScreen);
  document.addEventListener("keydown", handleESC);
}

function handleCompressScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  exitHandler();
}

function formatDate(inputSeconds) {
  const secondsNumber = parseInt(inputSeconds, 10);
  const hours = Math.floor(secondsNumber / 3600);
  const minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let seconds = secondsNumber - hours * 3600 - minutes * 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
function setTotalTime() {
  totalTime.innerHTML = formatDate(videoPlayer.duration);
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayButton");
  volumeBtn = document.getElementById("jsVolumeButton");
  fullScrnBtn = document.getElementById("jsFullScreen");
  currentTime = document.getElementById("currentTime");
  totalTime = document.getElementById("totalTime");

  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", handleExpandScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  setTotalTime();
  // document.documentElement.webkitRequestFullScreen(
  //   Element.ALLOW_KEYBOARD_INPUT
  // );
}

if (videoContainer) {
  init();
}
