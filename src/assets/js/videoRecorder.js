const recordContainer = document.getElementById("jsRecordContainer");
let recordBtn;
let videoPreview;
let streamObject;
let videoRecorder;

function stopStreamedVideo() {
  const stream = videoPreview.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  videoPreview.srcObject = null;
}

function handleVideoData(event) {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
}

function startRecording() {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
}

function stopRecording() {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording!";
  stopStreamedVideo();
}
async function getVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording!";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = ":( Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

function init() {
  recordBtn = document.getElementById("jsRecordBtn");
  videoPreview = document.getElementById("jsVideoPreview");

  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
