document.getElementById("fake-button")?.addEventListener("click", () => {});

const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

function selectTab(name) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
});

document.getElementById("nested-host")?.addEventListener("click", () => {});
document.getElementById("nested-inner")?.addEventListener("click", (e) => {
  e.stopPropagation();
});

const panel = document.getElementById("hidden-panel");
const togglePanel = document.getElementById("toggle-hidden-panel");
let showPanel = true;
togglePanel?.addEventListener("click", () => {
  showPanel = !showPanel;
  panel.hidden = !showPanel;
  togglePanel.textContent = showPanel ? "Hide tip" : "Show tip";
});

let liveCount = 0;
const liveMessage = document.getElementById("live-message");
document.getElementById("post-live")?.addEventListener("click", () => {
  liveCount += 1;
  liveMessage.textContent =
    liveCount === 1 ? "1 book reserved." : `${liveCount} books reserved.`;
});
document.getElementById("clear-live")?.addEventListener("click", () => {
  liveCount = 0;
  liveMessage.textContent = "Waiting for an update…";
});

const assertive = document.getElementById("assertive-message");
document.getElementById("emit-error")?.addEventListener("click", () => {
  assertive.textContent = "Connection lost — changes may not be saved.";
});
document.getElementById("clear-assertive")?.addEventListener("click", () => {
  assertive.textContent = "";
});
