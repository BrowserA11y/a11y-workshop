let fontScale = 1;
let spacingOn = false;

const playground = document.getElementById("playground");
const status = document.getElementById("playground-status");
const decrease = document.getElementById("decrease-font");
const increase = document.getElementById("increase-font");
const reset = document.getElementById("reset-font");
const spacingBtn = document.getElementById("toggle-spacing");

function syncPlayground() {
  playground.style.setProperty("--demo-font-scale", String(fontScale));
  playground.classList.toggle("demo-playground--spacing", spacingOn);
  decrease.disabled = fontScale <= 1;
  increase.disabled = fontScale >= 2;
  spacingBtn.setAttribute("aria-pressed", String(spacingOn));
  spacingBtn.textContent = spacingOn ? "Spacing on" : "Apply text spacing";
  status.textContent =
    `Font scale: ${Math.round(fontScale * 100)}%` +
    (spacingOn ? " · Text spacing applied" : "");
}

decrease.addEventListener("click", () => {
  fontScale = Math.max(1, Math.round((fontScale - 0.25) * 100) / 100);
  syncPlayground();
});
increase.addEventListener("click", () => {
  fontScale = Math.min(2, Math.round((fontScale + 0.25) * 100) / 100);
  syncPlayground();
});
reset.addEventListener("click", () => {
  fontScale = 1;
  syncPlayground();
});
spacingBtn.addEventListener("click", () => {
  spacingOn = !spacingOn;
  syncPlayground();
});

const banner = document.getElementById("promo-banner");
const showActions = document.getElementById("banner-show-actions");
document.getElementById("dismiss-banner").addEventListener("click", () => {
  banner.hidden = true;
  showActions.hidden = false;
});
document.getElementById("show-banner").addEventListener("click", () => {
  banner.hidden = false;
  showActions.hidden = true;
});

syncPlayground();
