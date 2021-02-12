import { registerViewController } from "../../controllers/apiControllers";

const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;
let playBtn;
let volumeBtn;
let fullScrnBtn;
let currentTime;
let totalTime;
let volumeRange;

function registerView() {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
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

function handleVolumeIcon(value) {
  if (value > 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

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
    volumeRange.value = videoPlayer.volume;
    handleVolumeIcon(volumeRange.value);
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitHandler() {
  videoPlayer.classList.toggle("video__notFullScreen");
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.removeEventListener("click", handleCompressScreen);
  fullScrnBtn.addEventListener("click", handleExpandScreen);
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
  videoPlayer.classList.toggle("video__notFullScreen");

  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", handleExpandScreen);
  fullScrnBtn.addEventListener("click", handleCompressScreen);
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

function setTotalTime() {
  totalTime.innerHTML = formatDate(Math.floor(videoPlayer.duration));
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleRestart() {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playBtn.addEventListener("click", handlePlayClick);
  playBtn.removeEventListener("click", handleRestart);
}

function handleEnded() {
  videoPlayer.pause();
  playBtn.innerHTML = '<i class="fas fa-undo"></i>';
  playBtn.removeEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handleRestart);
}

function handleDrag(e) {
  const {
    target: { value },
  } = e;
  videoPlayer.volume = value;
  handleVolumeIcon(value);
}

function init() {
  registerView();

  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayBtn");
  volumeBtn = document.getElementById("jsVolumeBtn");
  fullScrnBtn = document.getElementById("jsFullScreen");
  currentTime = document.getElementById("currentTime");
  totalTime = document.getElementById("totalTime");
  volumeRange = document.getElementById("jsVolume");

  videoPlayer.volume = 0.5;

  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", handleExpandScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  videoPlayer.addEventListener("ended", handleEnded);

  volumeRange.addEventListener("input", handleDrag);
  setTotalTime();
}

if (videoContainer) {
  init();
}
