function toggleText() {
  let button = document.querySelector("button");
  button.addEventListener("click", function() {
    let text = document.getElementById("text");
    if (text.hidden === false) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
  });
}
