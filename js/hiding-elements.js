const host = document.getElementById("conditional-panel-host");
const toggle = document.getElementById("toggle-panel");
const panelHTML =
  '<p class="demo-aside">Conditional panel — gone from the DOM when toggled off.</p>';
let showPanel = true;

toggle?.addEventListener("click", () => {
  showPanel = !showPanel;
  if (showPanel) {
    host.innerHTML = panelHTML;
  } else {
    host.replaceChildren();
  }
  toggle.textContent = showPanel ? "Hide panel" : "Show panel";
});
