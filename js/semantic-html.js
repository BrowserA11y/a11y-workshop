const CATALOG = [
  { id: "1", label: "Large-print novels" },
  { id: "2", label: "Braille editions" },
  { id: "3", label: "Audiobooks" },
];

let items = [...CATALOG];

const goodList = document.querySelector('[data-list="good"]');
const brokenList = document.querySelector('[data-list="broken"]');
const emptyInvalid = document.querySelector('[data-list="empty-invalid"]');
const emptyValid = document.querySelector('[data-list="empty-valid"]');

function render() {
  goodList.replaceChildren(
    ...items.map((item) => {
      const li = document.createElement("li");
      li.textContent = item.label;
      return li;
    })
  );

  brokenList.replaceChildren(
    ...items.map((item) => {
      const host = document.createElement("div");
      host.className = "demo-list__host";
      const li = document.createElement("li");
      li.textContent = item.label;
      host.append(li);
      return host;
    })
  );

  emptyInvalid.replaceChildren();
  if (items.length) {
    for (const item of items) {
      const li = document.createElement("li");
      li.textContent = item.label;
      emptyInvalid.append(li);
    }
  } else {
    const div = document.createElement("div");
    div.textContent = "No formats in this catalog yet.";
    emptyInvalid.append(div);
  }

  emptyValid.replaceChildren();
  if (items.length) {
    const ul = document.createElement("ul");
    ul.className = "demo-list";
    for (const item of items) {
      const li = document.createElement("li");
      li.textContent = item.label;
      ul.append(li);
    }
    emptyValid.append(ul);
  } else {
    const p = document.createElement("p");
    p.textContent = "No formats in this catalog yet.";
    emptyValid.append(p);
  }
}

document.getElementById("clear-list").addEventListener("click", () => {
  items = [];
  render();
});

document.getElementById("restore-list").addEventListener("click", () => {
  items = [...CATALOG];
  render();
});

render();
