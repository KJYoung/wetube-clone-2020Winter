const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;
let playBtn;

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayButton");
  playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
