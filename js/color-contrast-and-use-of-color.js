function wireToggleGroup(selector, { selectedClass = "shipping-option--selected" } = {}) {
  document.querySelectorAll(selector).forEach((group) => {
    group.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-value]");
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll("button[data-value]").forEach((b) => {
        const on = b === btn;
        b.setAttribute("aria-pressed", String(on));
        if (selectedClass) b.classList.toggle(selectedClass, on);
      });
    });
  });
}

wireToggleGroup("[data-shipping]");
wireToggleGroup("[data-theme]", { selectedClass: null });
