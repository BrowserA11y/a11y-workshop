/**
 * Mobile nav toggle and aria-current for the active page.
 */
export function initNav() {
  const toggle = document.getElementById("menubutton");
  const menu = document.getElementById("menuContent");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("nav__list--open", !open);
    });
  }

  const path = location.pathname.split("/").pop() || "index.html";
  const inShowcases = location.pathname.includes("/showcases/");
  let page;
  if (inShowcases || path.includes("showcases")) {
    page = "showcases";
  } else if (path === "" || path === "index.html" || path.startsWith("details")) {
    page = "books.html";
  } else {
    page = path;
  }

  document.querySelectorAll(".nav__item").forEach((item) => {
    const link = item.querySelector("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const isShowcases = page === "showcases" && href.includes("showcases");
    const isMatch =
      isShowcases ||
      href.endsWith(page) ||
      (page === "books.html" && href.endsWith("books.html"));
    if (isMatch) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", initNav);
