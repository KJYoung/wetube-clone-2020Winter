const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;
let videoController;
let playBtn;
let playRange;
let volumeBtn;
let fullScrnBtn;
let currentTime;
let totalTime;
let timeIndicator;
let volumeRange;
let volumeColumn;
let timeout;
let commentInput;

function registerView() {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
}

function formatDate(inputSeconds) {
  if (Number.isNaN(inputSeconds) || !Number.isFinite(inputSeconds)) {
    return `?:??`;
  }
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
  playRange.max = videoPlayer.duration;
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  playRange.value = videoPlayer.currentTime;
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
  playRange.value = playRange.max;
}

function volumeRangeListener(e) {
  const {
    target: { value },
  } = e;
  videoPlayer.volume = value;
  handleVolumeIcon(value);
}

function checkKeyInput(e) {
  if (document.activeElement === commentInput) {
    //
  } else if (e.keyCode === 32) {
    //Space
    e.preventDefault();
    handlePlayClick();
  } else if (e.keyCode === 13) {
    //Enter
    e.preventDefault();
    if (videoPlayer.classList.contains("video__notFullScreen")) {
      handleExpandScreen();
    }
  } else if (e.keyCode === 9) {
    e.preventDefault();
  }
}
function checkKeysInput(e) {
  if (document.activeElement === commentInput) {
    //
  } else if (e.keyCode === 77) {
    //M
    e.preventDefault();
    handleVolumeClick();
  }
}

function checkMouseAFK() {
  videoController.style.opacity = 1;
  videoContainer.style.cursor = "pointer";

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    videoController.style.opacity = 0;
    videoContainer.style.cursor = "none";
  }, 5000);
}

function controllerHide() {
  videoController.style.opacity = 0;
}

function resizeOptimizer() {
  //console.log(window.innerWidth);
  if (window.innerWidth >= 900) {
    volumeColumn.style.margin = "0px";
    timeIndicator.style.display = "flex";
  } else if (window.innerWidth < 900 && window.innerWidth >= 650) {
    volumeColumn.style.margin = "0px 10px";
    timeIndicator.style.display = "flex";
  } else if (window.innerWidth < 650) {
    volumeColumn.style.margin = "0px 10px";
    timeIndicator.style.display = "none";
  }
}

function playRangeListener(e) {
  const {
    target: { value },
  } = e;
  videoPlayer.currentTime = value;
}

function init() {
  registerView();

  videoPlayer = videoContainer.querySelector("video");
  videoController = videoContainer.querySelector(".videoPlayer__controls");
  playBtn = document.getElementById("jsPlayBtn");
  playRange = document.getElementById("jsPlayRange");
  volumeBtn = document.getElementById("jsVolumeBtn");
  fullScrnBtn = document.getElementById("jsFullScreen");
  currentTime = document.getElementById("currentTime");
  totalTime = document.getElementById("totalTime");
  timeIndicator = document.getElementById("timeIndicator");
  volumeRange = document.getElementById("jsVolume");
  volumeColumn = document.getElementById("volumeColumn");

  commentInput = document.getElementById("jsAddCommentText");

  videoPlayer.volume = 0.5;

  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", handleExpandScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  videoPlayer.addEventListener("ended", handleEnded);

  videoContainer.addEventListener("mousemove", checkMouseAFK);
  videoContainer.addEventListener("click", checkMouseAFK);
  videoContainer.addEventListener("mouseout", controllerHide);

  window.addEventListener("keypress", checkKeyInput);
  window.addEventListener("keydown", checkKeysInput);
  window.addEventListener("resize", resizeOptimizer);

  volumeRange.addEventListener("input", volumeRangeListener);
  playRange.addEventListener("input", playRangeListener);
  setTotalTime();
}

if (videoContainer) {
  init();
}
