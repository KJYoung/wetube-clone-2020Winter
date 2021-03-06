import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
let commentList;
let commentNumber;
let commentNumberOuterSpan;
let delComButton;
let jsAddCommentText;
let jsAddCommentCancel;
let jsAddCommentSubmit;

function addFakeComment(comment) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  li.className = "jsJustWrittenComment";
  commentList.prepend(li);

  if (parseInt(commentNumber.innerHTML, 10) === 0) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">1</span>comment`;
  } else if (parseInt(commentNumber.innerHTML, 10) === 1) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">2</span>comments`;
  } else {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
  }
}

async function sendComment(comment) {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addFakeComment(comment);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("textarea");
  const comment = commentInput.value;
  if (!comment.replace(/\s/g, "").length) {
    jsAddCommentSubmit.value = "공백 만으로는 작성할 수 없습니다.";
  } else {
    sendComment(comment);
    commentInput.value = "";
  }
}

function deleteFakeComment(commentId) {
  const li = document.getElementById(commentId);
  commentList.removeChild(li);

  if (parseInt(commentNumber.innerHTML, 10) === 0) {
    console.log("WRONG REQUEST");
  } else if (parseInt(commentNumber.innerHTML, 10) === 1) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">0</span>comments`;
  } else if (parseInt(commentNumber.innerHTML, 10) === 2) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">1</span>comment`;
  } else {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
  }
}

async function handleDelete(event) {
  const videoId = window.location.href.split("/videos/")[1];
  const commentId = event.target.parentNode.id;
  const commentSpan = event.target.parentNode.querySelector("span").innerHTML;
  const response = await axios({
    url: `/api/${videoId}/delete-comment`,
    method: "POST",
    data: {
      commentId,
      commentSpan,
    },
  });
  if (response.status === 200) {
    deleteFakeComment(commentId);
  } else {
    console.log("BAD USER REGISTERED");
  }
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = `${this.scrollHeight}px`;
}

function handleCommentCancel(e) {
  e.preventDefault();
  jsAddCommentText.value = "";
  jsAddCommentText.style.height = "auto";
}

function init() {
  commentList = document.getElementById("jsCommentList");
  commentNumber = document.getElementById("jsCommentNumber");
  commentNumberOuterSpan = document.getElementById("jsCommentNumberOuterSpan");
  delComButton = document.getElementsByClassName("delComBtn");

  jsAddCommentText = document.getElementById("jsAddCommentText");
  if (jsAddCommentText) {
    jsAddCommentText.setAttribute(
      "style",
      `height:${jsAddCommentText.scrollHeight}px;overflow-y:hidden;`
    );
    jsAddCommentText.addEventListener("input", OnInput, false);
  }

  jsAddCommentCancel = document.getElementById("add__commentCancel");
  jsAddCommentCancel.addEventListener("click", handleCommentCancel);

  jsAddCommentSubmit = document.getElementById("add__commentSubmit");
  for (let i = 0; i < delComButton.length; i += 1) {
    delComButton[i].addEventListener("click", handleDelete);
  }
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
