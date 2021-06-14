function hideSelf() {
  let button = document.querySelector("button");
  button.addEventListener("click", function() {
    button.hidden = true;
  });
}