const STAGES = [
  { key: "composed", title: "Composed", detail: "Sender creates the message" },
  { key: "submitted", title: "Submitted", detail: "Message handed to email infrastructure" },
  {
    key: "accepted",
    title: "Accepted by AWS SES",
    detail: "AWS SES ap-south-1 accepts the request",
  },
  {
    key: "routed",
    title: "Routed by Cloudflare",
    detail: "Cloudflare Email Routing forwards to hello@ayesharizwan.com",
  },
  { key: "delivered", title: "Delivered", detail: "Message arrives in MailFlow inbox" },
];

function addSeconds(stamp, seconds) {
  const match = stamp.match(/^(.+) · (\d{2}):(\d{2}):(\d{2}) (.+)$/);
  if (!match) return stamp;
  const [, date, hh, mm, ss, tz] = match;
  const total = Number(hh) * 3600 + Number(mm) * 60 + Number(ss) + seconds;
  const h = Math.floor(total / 3600) % 24;
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${date} · ${pad(h)}:${pad(m)}:${pad(s)} ${tz}`;
}

function timelineFrom(composed, extra = {}) {
  return {
    composed,
    submitted: extra.submitted ?? addSeconds(composed, 2),
    accepted: extra.accepted ?? addSeconds(composed, 5),
    routed: extra.routed ?? addSeconds(composed, 30),
    delivered: extra.delivered ?? addSeconds(composed, 45),
    messageId: extra.messageId,
    mx: extra.mx ?? "verified",
  };
}

const emails = [
  {
    id: "e1",
    folder: "inbox",
    unread: true,
    starred: true,
    archived: false,
    from: "Priya Menon",
    email: "priya.menon@google.com",
    org: "Google India",
    initials: "PM",
    color: "#4f6ef7",
    subject: "Software Engineer Interview — Next Steps",
    preview: "Sharing the loop schedule and what to expect onsite in Bangalore…",
    time: "10:14 AM",
    date: "Tue, 27 Oct 2026",
    body: `Hi Ayesha,

Thank you for taking the recruiter screen. Next steps for the Software Engineer role in Bangalore:

Tuesday — hiring manager (45 min)
Wednesday — data structures
Thursday — systems + frontend craft

Please confirm which slots work in IST. We will send a calendar hold once you reply.

Priya Menon
Google India`,
    timeline: timelineFrom("27 Oct 2026 · 10:13:29 IST", { messageId: "sim_k2m9q1xa" }),
  },
  {
    id: "e2",
    folder: "inbox",
    unread: true,
    starred: false,
    archived: false,
    from: "Marcus Chen",
    email: "marcus.chen@stripe.com",
    org: "Stripe",
    initials: "MC",
    color: "#8b5cf6",
    subject: "Frontend Infrastructure Talk — Slides",
    preview: "Slides from last week’s talk, plus the SES event notes you asked for…",
    time: "Yesterday",
    date: "Mon, 26 Oct 2026",
    body: `Ayesha,

Attached are the slides from the Frontend Infrastructure talk. The SES event section starts on slide 14.

If you want to walk through bounce handling next week, I have Thursday 16:00 IST open.

Marcus Chen
Stripe`,
    timeline: timelineFrom("26 Oct 2026 · 18:12:04 IST", { messageId: "sim_8c1p0vwr" }),
  },
  {
    id: "e3",
    folder: "inbox",
    unread: false,
    starred: false,
    archived: false,
    from: "GitHub Notifications",
    email: "noreply@github.com",
    org: "GitHub",
    initials: "GH",
    color: "#22c55e",
    subject: "[ayesharizwan/email-suite] CI passed",
    preview: "All checks passed on main. Cloudflare Pages is ready to publish…",
    time: "Sun",
    date: "Sun, 25 Oct 2026",
    body: `Checks for ayesharizwan/email-suite on main:

lint — passed
html-validate — passed
lighthouse — passed

View run: github.com/ayesharizwan/email-suite/actions`,
    timeline: timelineFrom("25 Oct 2026 · 21:04:11 IST", { messageId: "sim_gh44n2ce" }),
  },
  {
    id: "e4",
    folder: "inbox",
    unread: false,
    starred: true,
    archived: false,
    from: "Ananya Iyer",
    email: "ananya@ycombinator.com",
    org: "YC W27",
    initials: "AI",
    color: "#f97316",
    subject: "Office hours this week",
    preview: "Two slots open if you want to talk through SES routing…",
    time: "Fri",
    date: "Fri, 23 Oct 2026",
    body: `Hey Ayesha,

Office hours this week:

Wed 11:00 IST
Thu 15:30 IST

Reply with a slot if you want to cover MailFlow routing and bounce rates.

Ananya
YC W27`,
    timeline: timelineFrom("23 Oct 2026 · 11:40:02 IST", { messageId: "sim_yc7t3bkm" }),
  },
  {
    id: "e5",
    folder: "inbox",
    unread: true,
    starred: false,
    archived: false,
    from: "Cloudflare Support",
    email: "support@cloudflare.com",
    org: "Cloudflare",
    initials: "CF",
    color: "#f6821f",
    subject: "Email Routing connected for ayesharizwan.com",
    preview: "MX records verified. Catch-all forwarding active…",
    time: "Thu",
    date: "Thu, 22 Oct 2026",
    body: `Hello Ayesha,

Email Routing is connected for ayesharizwan.com.

MX records verified.
Catch-all forwarding active.
Destination: hello@ayesharizwan.com via AWS SES Mumbai.

Cloudflare Support`,
    timeline: timelineFrom("22 Oct 2026 · 08:02:40 IST", { messageId: "sim_cf91ud4s" }),
  },
  {
    id: "e6",
    folder: "inbox",
    unread: false,
    starred: false,
    archived: false,
    from: "AWS Team",
    email: "no-reply@amazon.com",
    org: "AWS",
    initials: "AWS",
    color: "#eab308",
    subject: "SES Domain Verification Complete — ayesharizwan.com",
    preview: "Your domain is verified in ap-south-1. Ready to send…",
    time: "Wed",
    date: "Wed, 21 Oct 2026",
    body: `Hi Ayesha,

Your domain is verified in ap-south-1. Ready to send.

Region: ap-south-1 (Mumbai)
Domain: ayesharizwan.com
DKIM: verified
SPF: verified

AWS SES`,
    timeline: timelineFrom("21 Oct 2026 · 16:18:09 IST", { messageId: "sim_ses0m12q" }),
  },
  {
    id: "e7",
    folder: "inbox",
    unread: false,
    starred: false,
    archived: false,
    from: "Ravi Kapoor",
    email: "ravi.kapoor@outlook.com",
    org: "",
    initials: "RK",
    color: "#38bdf8",
    subject: "Project collaboration — MailFlow feedback",
    preview: "Notes on the delivery explorer and bounce panel…",
    time: "12 Oct",
    date: "Mon, 12 Oct 2026",
    body: `Ayesha,

Sharing feedback on MailFlow after using it this week:

The delivery explorer is the screen we opened most.
Bounce rate next to delivered % made the status review faster.

Happy to hop on a call if you want to go through remaining SES events.

Ravi Kapoor`,
    timeline: timelineFrom("12 Oct 2026 · 09:10:22 IST", { messageId: "sim_rk55h9le" }),
  },
  {
    id: "e8",
    folder: "inbox",
    unread: false,
    starred: false,
    archived: false,
    from: "Lina Park",
    email: "lina.park@notion.so",
    org: "Notion",
    initials: "LP",
    color: "#e4e4e7",
    subject: "Product design role — would love to connect",
    preview: "We have a product design opening on the mail surfaces team…",
    time: "9 Oct",
    date: "Fri, 9 Oct 2026",
    body: `Ayesha,

We have a product design role on the mail surfaces team and would love to connect.

If you are open to a conversation, reply with two times next week.

Lina Park
Notion`,
    timeline: timelineFrom("9 Oct 2026 · 07:00:18 IST", { messageId: "sim_np2d8w0y" }),
  },
  {
    id: "e9",
    folder: "sent",
    unread: false,
    starred: false,
    archived: false,
    from: "Ayesha Rizwan",
    email: "hello@ayesharizwan.com",
    org: "MailFlow",
    initials: "MF",
    color: "#4f6ef7",
    to: "priya.menon@google.com",
    subject: "Re: Software Engineer Interview — Next Steps",
    preview: "Tuesday 11:00 IST works. Confirming the Bangalore loop…",
    time: "10:32 AM",
    date: "Tue, 27 Oct 2026",
    body: `Hi Priya,

Tuesday 11:00 IST works for the hiring manager screen.

See you then.

Ayesha Rizwan
hello@ayesharizwan.com`,
    timeline: timelineFrom("27 Oct 2026 · 10:31:10 IST", { messageId: "sim_out3k9ab" }),
  },
  {
    id: "e10",
    folder: "drafts",
    unread: false,
    starred: false,
    archived: false,
    from: "Ayesha Rizwan",
    email: "hello@ayesharizwan.com",
    org: "MailFlow",
    initials: "MF",
    color: "#4f6ef7",
    to: "marcus.chen@stripe.com",
    subject: "Re: Frontend Infrastructure Talk — Slides",
    preview: "Draft: Thursday 16:00 IST is open…",
    time: "Draft",
    date: "Tue, 27 Oct 2026",
    body: `Hi Marcus,

Thursday 16:00 IST is open. I will come with bounce-handling notes from SES.

Ayesha`,
    timeline: {
      composed: "27 Oct 2026 · 11:02:00 IST",
      submitted: "—",
      accepted: "—",
      routed: "—",
      delivered: "—",
      messageId: "—",
      mx: "—",
    },
  },
  {
    id: "e11",
    folder: "trash",
    unread: false,
    starred: false,
    archived: false,
    from: "Digest Weekly",
    email: "noreply@digestweekly.io",
    org: "",
    initials: "DW",
    color: "#6b6b7b",
    subject: "Weekly digest",
    preview: "Promotional message moved to Trash…",
    time: "8 Oct",
    date: "Thu, 8 Oct 2026",
    body: `Weekly product roundup. Moved to Trash.

Unsubscribe: digestweekly.io/unsub`,
    timeline: timelineFrom("8 Oct 2026 · 07:00:00 IST", { messageId: "sim_tr7c1nms" }),
  },
];

const FOLDER_LABELS = {
  inbox: "Inbox",
  sent: "Sent",
  drafts: "Drafts",
  trash: "Trash",
  starred: "Starred",
  archived: "Archived",
};

const state = {
  page: "overview",
  folder: "inbox",
  selectedId: null,
  query: "",
  explorerId: "e1",
};

const els = {
  pages: [...document.querySelectorAll(".page")],
  tabs: [...document.querySelectorAll(".tab")],
  list: document.getElementById("email-list"),
  listTitle: document.getElementById("list-title"),
  search: document.getElementById("search"),
  empty: document.getElementById("empty-reader"),
  thread: document.getElementById("thread"),
  recent: document.getElementById("recent-list"),
  select: document.getElementById("mail-select"),
  timeline: document.getElementById("timeline"),
  bounce: document.getElementById("bounce-banner"),
  overlay: document.getElementById("compose-overlay"),
  form: document.getElementById("compose-form"),
  success: document.getElementById("compose-success"),
  successCopy: document.getElementById("compose-success-copy"),
  to: document.getElementById("compose-to"),
  subject: document.getElementById("compose-subject"),
  body: document.getElementById("compose-body"),
  chars: document.getElementById("char-count"),
  tooltip: document.getElementById("chart-tooltip"),
  toasts: document.getElementById("toasts"),
};

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  els.toasts.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function visibleEmails() {
  const q = state.query.trim().toLowerCase();
  return emails.filter((mail) => {
    const inFolder =
      state.folder === "starred"
        ? mail.starred && mail.folder !== "trash"
        : state.folder === "archived"
          ? mail.archived
          : mail.folder === state.folder && !mail.archived;
    if (!inFolder) return false;
    if (!q) return true;
    return [mail.from, mail.email, mail.subject, mail.preview, mail.body]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

function updateCounts() {
  const tally = { inbox: 0, sent: 0, drafts: 0, trash: 0, starred: 0, archived: 0 };
  emails.forEach((mail) => {
    if (mail.archived) tally.archived += 1;
    else tally[mail.folder] += 1;
    if (mail.starred && mail.folder !== "trash") tally.starred += 1;
  });
  Object.entries(tally).forEach(([key, n]) => {
    document.querySelectorAll(`[data-count="${key}"]`).forEach((node) => {
      node.textContent = String(n);
    });
  });
}

function renderList() {
  const items = visibleEmails();
  els.listTitle.textContent = FOLDER_LABELS[state.folder];
  els.list.innerHTML = items
    .map(
      (mail) => `
      <button type="button" class="mail-row ${mail.unread ? "is-unread" : ""} ${
        mail.id === state.selectedId ? "is-selected" : ""
      }" data-id="${mail.id}">
        <div class="avatar" style="background:${mail.color}22;color:${mail.color}">${mail.initials}</div>
        <div>
          <div class="name">${mail.from} ${mail.starred ? '<span class="star">★</span>' : ""}</div>
          <div>${mail.subject}</div>
          <p>${mail.preview}</p>
        </div>
        <div>
          <div>${mail.time}</div>
          ${mail.unread ? '<span class="unread-dot"></span>' : ""}
        </div>
      </button>`
    )
    .join("");
  updateCounts();
}

function selectedMail() {
  return emails.find((mail) => mail.id === state.selectedId) || null;
}

function renderReader() {
  const mail = selectedMail();
  if (!mail) {
    els.empty.hidden = false;
    els.thread.hidden = true;
    return;
  }
  els.empty.hidden = true;
  els.thread.hidden = false;
  document.getElementById("thread-subject").textContent = mail.subject;
  document.getElementById("thread-from").textContent = mail.org
    ? `${mail.from} (${mail.org})`
    : mail.from;
  document.getElementById("thread-email").textContent = mail.email;
  document.getElementById("thread-to").textContent = `To: ${
    mail.to || "hello@ayesharizwan.com"
  }`;
  document.getElementById("thread-time").textContent = `${mail.date} · ${mail.time}`;
  document.getElementById("thread-body").textContent = mail.body;
  const avatar = document.getElementById("thread-avatar");
  avatar.textContent = mail.initials;
  avatar.style.background = `${mail.color}22`;
  avatar.style.color = mail.color;
  document.querySelector('[data-action="star"]').textContent = mail.starred ? "Unstar" : "Star";
}

function renderRecent() {
  const recent = emails.filter((mail) => mail.folder === "inbox" && !mail.archived).slice(0, 5);
  els.recent.innerHTML = recent
    .map(
      (mail) => `
      <button type="button" data-open="${mail.id}">
        <div class="avatar" style="background:${mail.color}22;color:${mail.color}">${mail.initials}</div>
        <div>
          <strong>${mail.from}</strong>
          <p>${mail.subject}</p>
        </div>
        <div>${mail.unread ? '<span class="unread-dot"></span>' : ""} ${mail.time}</div>
      </button>`
    )
    .join("");
}

function renderExplorer() {
  els.select.innerHTML = emails
    .map((mail) => `<option value="${mail.id}">${mail.subject} — ${mail.from}</option>`)
    .join("");
  els.select.value = state.explorerId;
  const mail = emails.find((item) => item.id === state.explorerId);
  if (!mail) return;
  const t = mail.timeline;
  els.timeline.innerHTML = STAGES.map((stage, index) => {
    const value = t[stage.key];
    const pending = value === "—";
    const current = !pending && STAGES.slice(index + 1).some((s) => t[s.key] === "—");
    const extra =
      stage.key === "accepted" && t.messageId && t.messageId !== "—"
        ? `<p>Message ID: ${t.messageId}</p>`
        : stage.key === "routed"
          ? `<p>MX records: ${t.mx}</p>`
          : "";
    return `
      <li>
        <span class="dot ${current ? "dot--current" : pending ? "dot--pending" : ""}"></span>
        <div>
          <h3>${stage.title} ${pending ? "" : "✅"}</h3>
          <p>${stage.detail}</p>
          <time>${value}</time>
          ${extra}
        </div>
      </li>`;
  }).join("");
}

function setPage(page, { bounce = false } = {}) {
  state.page = page;
  els.pages.forEach((node) => {
    const on = node.dataset.page === page;
    node.classList.toggle("is-active", on);
    node.hidden = !on;
  });
  els.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.page === page));
  els.bounce.hidden = !(page === "explorer" && bounce);
  if (page === "inbox") {
    renderList();
    renderReader();
  }
  if (page === "explorer") renderExplorer();
  if (location.hash.replace("#", "") !== page) {
    history.replaceState(null, "", `#${page}`);
  }
}

function openInbox({ folder = "inbox", id = null } = {}) {
  state.folder = folder;
  document.querySelectorAll(".folder").forEach((node) => {
    node.classList.toggle("is-active", node.dataset.folder === folder);
  });
  if (id) {
    const mail = emails.find((item) => item.id === id);
    if (mail) mail.unread = false;
    state.selectedId = id;
  } else {
    state.selectedId = null;
  }
  setPage("inbox");
}

function composeDirty() {
  return Boolean(els.to.value || els.subject.value || els.body.value);
}

function closeCompose(force = false) {
  if (!force && !els.form.hidden && composeDirty()) {
    if (!window.confirm("Discard this message?")) return;
  }
  els.overlay.hidden = true;
}

function openCompose(seed = {}) {
  els.overlay.hidden = false;
  els.form.hidden = false;
  els.success.hidden = true;
  els.to.value = seed.to || "";
  els.subject.value = seed.subject || "";
  els.body.value = seed.body || "";
  els.chars.textContent = `${els.body.value.length} characters`;
  document.getElementById("compose-title").textContent = seed.title || "New message";
  els.to.focus();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setPage(tab.dataset.page));
});

document.querySelectorAll("[data-go]").forEach((node) => {
  node.addEventListener("click", () => {
    const go = node.dataset.go;
    if (go === "sent") openInbox({ folder: "sent" });
    else if (go === "received") openInbox({ folder: "inbox" });
    else if (go === "delivered" || go === "explorer") setPage("explorer");
    else if (go === "bounced") setPage("explorer", { bounce: true });
  });
});

document.querySelectorAll(".chart__col").forEach((col) => {
  const show = (event) => {
    els.tooltip.hidden = false;
    els.tooltip.textContent = col.dataset.tip;
    const card = document.querySelector(".chart-card");
    const rect = card.getBoundingClientRect();
    els.tooltip.style.left = `${event.clientX - rect.left + 12}px`;
    els.tooltip.style.top = `${event.clientY - rect.top - 36}px`;
  };
  col.addEventListener("click", show);
  col.addEventListener("mouseenter", show);
  col.addEventListener("mouseleave", () => {
    els.tooltip.hidden = true;
  });
});

els.recent.addEventListener("click", (event) => {
  const id = event.target.closest("[data-open]")?.dataset.open;
  if (id) openInbox({ folder: "inbox", id });
});

document.getElementById("folders").addEventListener("click", (event) => {
  const folder = event.target.closest("[data-folder]")?.dataset.folder;
  if (!folder) return;
  state.folder = folder;
  state.selectedId = null;
  document.querySelectorAll(".folder").forEach((node) => {
    node.classList.toggle("is-active", node.dataset.folder === folder);
  });
  renderList();
  renderReader();
});

els.list.addEventListener("click", (event) => {
  const id = event.target.closest("[data-id]")?.dataset.id;
  if (!id) return;
  const mail = emails.find((item) => item.id === id);
  mail.unread = false;
  state.selectedId = id;
  renderList();
  renderReader();
});

els.search.addEventListener("input", () => {
  state.query = els.search.value;
  renderList();
});

document.querySelector(".actions").addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const mail = selectedMail();
  if (!action || !mail) return;
  if (action === "reply") {
    openCompose({
      title: "Reply",
      to: mail.email,
      subject: mail.subject.startsWith("Re:") ? mail.subject : `Re: ${mail.subject}`,
      body: `\n\nOn ${mail.date}, ${mail.from} wrote:\n${mail.body}`,
    });
    return;
  }
  if (action === "forward") {
    openCompose({
      title: "Forward",
      subject: mail.subject.startsWith("Fwd:") ? mail.subject : `Fwd: ${mail.subject}`,
      body: `\n\n---------- Forwarded message ----------\nFrom: ${mail.from}\n${mail.body}`,
    });
    return;
  }
  if (action === "star") {
    mail.starred = !mail.starred;
    toast(mail.starred ? "Starred" : "Star removed");
  }
  if (action === "unread") {
    mail.unread = true;
    toast("Marked as unread");
  }
  if (action === "archive") {
    mail.archived = true;
    state.selectedId = null;
    toast("Archived");
  }
  if (action === "delete") {
    mail.folder = "trash";
    mail.archived = false;
    state.selectedId = null;
    toast("Moved to Trash");
  }
  renderList();
  renderReader();
  renderRecent();
});

document.getElementById("compose-btn").addEventListener("click", () => openCompose());
document.getElementById("compose-close").addEventListener("click", () => closeCompose());
document.getElementById("discard-btn").addEventListener("click", () => closeCompose());
document.getElementById("compose-done").addEventListener("click", () => closeCompose(true));
els.overlay.addEventListener("click", (event) => {
  if (event.target === els.overlay) closeCompose();
});
els.body.addEventListener("input", () => {
  els.chars.textContent = `${els.body.value.length} characters`;
});
els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!els.to.checkValidity()) {
    els.to.reportValidity();
    return;
  }
  const now = "27 Oct 2026 · 12:48:00 IST";
  emails.unshift({
    id: `e${Date.now()}`,
    folder: "sent",
    unread: false,
    starred: false,
    archived: false,
    from: "Ayesha Rizwan",
    email: "hello@ayesharizwan.com",
    org: "MailFlow",
    initials: "MF",
    color: "#4f6ef7",
    to: els.to.value,
    subject: els.subject.value,
    preview: els.body.value.slice(0, 80),
    time: "Just now",
    date: "Tue, 27 Oct 2026",
    body: els.body.value,
    timeline: timelineFrom(now, { messageId: `sim_${Math.random().toString(36).slice(2, 10)}` }),
  });
  els.form.hidden = true;
  els.success.hidden = false;
  els.successCopy.textContent = `Queued via AWS SES · ap-south-1 for ${els.to.value}`;
  els.form.reset();
  els.chars.textContent = "0 characters";
  toast("Message sent");
  renderList();
  updateCounts();
});

els.select.addEventListener("change", () => {
  state.explorerId = els.select.value;
  renderExplorer();
});

renderRecent();
updateCounts();
renderExplorer();
const initial = location.hash.replace("#", "");
setPage(["overview", "inbox", "explorer"].includes(initial) ? initial : "overview");
window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#", "");
  if (["overview", "inbox", "explorer"].includes(page)) setPage(page);
});
