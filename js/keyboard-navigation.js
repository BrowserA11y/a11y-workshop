document.getElementById("focus-paragraph").addEventListener("click", () => {
  document.getElementById("only-focusable").focus();
});

function onClick(event) {
  if (event.currentTarget.hasAttribute("data-prevent-nav")) {
    event.preventDefault();
  }
  alert("Clicked!");
}

document.querySelectorAll("[data-click-alert]").forEach((el) => {
  el.addEventListener("click", onClick);
  if (el.hasAttribute("data-role-button")) {
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event);
      }
    });
  }
});
