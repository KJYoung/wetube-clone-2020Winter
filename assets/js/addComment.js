import axios from "axios";
import { doc } from "prettier";

const addCommentForm = document.getElementById("jsAddComment");
let commentList;
let commentNumber;
let commentNumberOuterSpan;
let delComButton;

function addFakeComment(comment) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  li.className = "jsJustWrittenComment";
  commentList.prepend(li);

  if (parseInt(commentNumber.innerHTML, 10) === 0) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">1 comment</span>`;
  } else if (parseInt(commentNumber.innerHTML, 10) === 1) {
    commentNumberOuterSpan.innerHTML = `<span id="jsCommentNumber">2 comments</span>`;
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
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function handleDelete(event) {
  console.log(event.target);
  console.log(event.target.parentNode);
}
function init() {
  commentList = document.getElementById("jsCommentList");
  commentNumber = document.getElementById("jsCommentNumber");
  commentNumberOuterSpan = document.getElementById("jsCommentNumberOuterSpan");
  delComButton = document.getElementsByClassName("delComBtn");

  for (let i = 0; i < delComButton.length; i += 1) {
    delComButton[i].addEventListener("click", handleDelete);
  }
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
