const NAME_POOL = [
  "Jordan Lee",
  "Casey Morgan",
  "Riley Patel",
  "Quinn Brooks",
  "Taylor Kim",
];

let score = 0;
const scoreEl = document.getElementById("yourScore");
document.getElementById("add-point").addEventListener("click", () => {
  score += 1;
  scoreEl.textContent = String(score);
});
document.getElementById("reset-score").addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = "0";
});

function makeTimer(btnId, spanId) {
  let seconds = 10;
  let running = false;
  let id = null;
  const btn = document.getElementById(btnId);
  const span = document.getElementById(spanId);
  const stop = () => {
    if (id !== null) clearInterval(id);
    id = null;
    running = false;
    btn.textContent = "Start timer";
  };
  btn.addEventListener("click", () => {
    if (running) {
      stop();
      return;
    }
    seconds = 10;
    span.textContent = "10";
    running = true;
    btn.textContent = "Stop timer";
    id = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        span.textContent = "0";
        stop();
        return;
      }
      span.textContent = String(seconds);
    }, 1000);
  });
}
makeTimer("toggle-partial", "partial-seconds");
makeTimer("toggle-atomic", "atomic-seconds");

function makeUserList(listId, addId, removeId) {
  let users = ["Alex Rivera", "Sam Chen"];
  const list = document.getElementById(listId);
  const addBtn = document.getElementById(addId);
  const removeBtn = document.getElementById(removeId);
  const render = () => {
    list.replaceChildren();
    if (!users.length) {
      const li = document.createElement("li");
      li.className = "demo-user-list__empty";
      li.textContent = "No one is online.";
      list.append(li);
    } else {
      for (const user of users) {
        const li = document.createElement("li");
        li.textContent = user;
        list.append(li);
      }
    }
    addBtn.disabled = users.length >= 7;
    removeBtn.disabled = users.length === 0;
  };
  addBtn.addEventListener("click", () => {
    const next = NAME_POOL.find((n) => !users.includes(n));
    if (next) users = [...users, next];
    render();
  });
  removeBtn.addEventListener("click", () => {
    users = users.slice(0, -1);
    render();
  });
  render();
}
makeUserList("default-users", "add-default-user", "remove-default-user");
makeUserList("relevant-users", "add-relevant-user", "remove-relevant-user");

const structured = document.getElementById("structured-live");
document.getElementById("post-structured").addEventListener("click", () => {
  structured.replaceChildren();
  queueMicrotask(() => {
    structured.innerHTML =
      '<h4 class="demo-live-plain__heading">Reservation confirmed</h4><button type="button">View receipt</button>';
  });
});

const plain = document.getElementById("plain-live");
document.getElementById("post-plain").addEventListener("click", () => {
  plain.textContent = "";
  queueMicrotask(() => {
    plain.textContent =
      "Reservation confirmed. Use View receipt on the page to continue.";
  });
});

const lateBtn = document.getElementById("toggle-late");
const lateHost = document.getElementById("late-host");
let lateOpen = false;
lateBtn.addEventListener("click", () => {
  lateOpen = !lateOpen;
  lateBtn.setAttribute("aria-expanded", String(lateOpen));
  lateBtn.textContent = lateOpen ? "Hide filter results" : "Show filter results";
  if (!lateOpen) {
    lateHost.replaceChildren();
    return;
  }
  lateHost.innerHTML = `
    <div class="demo-disclosure">
      <p>Matching titles appear in the list.</p>
      <div class="demo-live-plain" aria-live="polite" aria-atomic="true">
        Filter applied: 12 books match.
      </div>
    </div>`;
});

const earlyBtn = document.getElementById("toggle-early");
const earlyHost = document.getElementById("early-host");
let earlyOpen = false;
earlyBtn.addEventListener("click", () => {
  if (earlyOpen) {
    earlyOpen = false;
    earlyBtn.setAttribute("aria-expanded", "false");
    earlyBtn.textContent = "Show filter results";
    earlyHost.replaceChildren();
    return;
  }
  earlyOpen = true;
  earlyBtn.setAttribute("aria-expanded", "true");
  earlyBtn.textContent = "Hide filter results";
  earlyHost.innerHTML = `
    <div class="demo-disclosure">
      <p>Matching titles appear in the list.</p>
      <div class="demo-live-plain" id="early-live-msg" aria-live="polite" aria-atomic="true" aria-label="Filter status"></div>
    </div>`;
  setTimeout(() => {
    const msg = document.getElementById("early-live-msg");
    if (msg) msg.textContent = "Filter applied: 12 books match.";
  }, 0);
});

const busyPanel = document.getElementById("busy-panel");
const refreshBtn = document.getElementById("refresh-blurb");
let busyTimeout = null;

function renderBusyContent() {
  busyPanel.setAttribute("aria-busy", "false");
  busyPanel.innerHTML = `
    <p class="demo-busy-panel__title">Featured title</p>
    <svg class="demo-busy-panel__img" viewBox="0 0 24 24" width="64" height="64" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="busy-book-title">
      <title id="busy-book-title">Book icon</title>
      <path fill="currentColor" d="M6 4h11a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2zm0 2v11.2l5-2.14 5 2.14V6H6z" />
    </svg>
    <p>A short blurb about accessible reading habits.</p>`;
}
renderBusyContent();

refreshBtn.addEventListener("click", () => {
  if (busyTimeout) clearTimeout(busyTimeout);
  refreshBtn.disabled = true;
  busyPanel.setAttribute("aria-busy", "true");
  busyPanel.innerHTML = `
    <div class="demo-skeleton" aria-hidden="true">
      <span class="demo-skeleton__bar"></span>
      <span class="demo-skeleton__bar demo-skeleton__bar--short"></span>
    </div>
    <p class="visually-hidden">Loading</p>`;
  busyTimeout = setTimeout(() => {
    renderBusyContent();
    refreshBtn.disabled = false;
    busyTimeout = null;
  }, 2500);
});

const announcer = document.getElementById("live-announcer");
document.getElementById("announce-save").addEventListener("click", () => {
  announcer.textContent = "";
  queueMicrotask(() => {
    announcer.textContent = "Successfully saved";
  });
});

const deferHost = document.getElementById("defer-host");
document.getElementById("load-deferred").addEventListener("click", () => {
  deferHost.replaceChildren();
  queueMicrotask(() => {
    const live = document.createElement("p");
    live.className = "demo-defer";
    live.setAttribute("aria-atomic", "true");
    live.setAttribute("aria-live", "polite");
    live.textContent = "List of books will be displayed here";
    deferHost.append(live);
    setTimeout(() => {
      live.textContent = "Loading...";
      setTimeout(() => {
        live.innerHTML = `
          <span class="demo-defer__ready">Catalog ready:</span>
          <ul class="demo-defer__list">
            <li>Inclusive Design Patterns</li>
            <li>Accessibility for Everyone</li>
            <li>Form Design Patterns</li>
          </ul>`;
      }, 1000);
    }, 1000);
  });
});
