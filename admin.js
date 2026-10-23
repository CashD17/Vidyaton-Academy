/* Administrator dashboard (demo) */
(function () {
  const me = VA.require("admin"); if (!me) return;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const toast = m => { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); };
  const F = { role:"All", q:"" };
  let view = (location.hash || "#overview").slice(1);
  const TITLES = { overview:"Overview", users:"Users", links:"Guardian links", system:"Prototype notes" };

  const V = {
    overview() {
      const u = VA.users(), n = r => u.filter(x => x.role === r).length;
      const pend = u.filter(x => x.role === "student" && !x.linked).length, minors = u.filter(x => x.role === "student" && VA.age(x.dob) < 18).length;
      return `<div class="grid g4"><div class="card stat"><b>${n("student")}</b><span>Students</span></div><div class="card stat"><b>${n("parent")}</b><span>Parents</span></div><div class="card stat"><b>${n("admin")}</b><span>Administrators</span></div><div class="card stat"><b>${pend}</b><span>Links awaiting a guardian</span></div></div>
      <div class="grid g2" style="margin-top:18px"><div class="card"><h2>Registrations by course</h2>${DD.TRACKS.map(t => { const c = u.filter(x => x.course === t).length; return `<div class="prog"><div class="l"><span>${t}</span><b>${c}</b></div><div class="bar"><i style="width:${c ? Math.min(100, c * 25) : 0}%"></i></div></div>`; }).join("")}</div>
      <div class="card"><h2>Minors</h2><p><b>${minors}</b> student account(s) belong to learners under 18 and require a linked guardian.</p><button class="btn-s" style="margin-top:12px" data-go="links">Review links</button></div></div>`;
    },
    users() {
      const list = VA.users().filter(x => (F.role === "All" || x.role === F.role.toLowerCase()) && (!F.q || (x.name + x.email).toLowerCase().includes(F.q.toLowerCase())));
      return `<div class="chips">${["All", "Student", "Parent", "Admin"].map(r => `<button class="chip ${F.role === r ? "on" : ""}" data-role="${r}">${r}</button>`).join("")}<input class="f" id="uq" placeholder="Search name or email…" value="${esc(F.q)}"></div>
      <div class="card"><h2>Accounts <small>${list.length}</small></h2><table class="t"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Age</th><th>Status</th></tr></thead><tbody>
      ${list.map(x => `<tr><td>${esc(x.name)}</td><td><span class="pill acc">${x.role}</span></td><td>${esc(x.email)}</td><td>${VA.age(x.dob)}</td><td>${x.role === "student" ? (x.linked ? `<span class="pill ok">Linked</span>` : `<span class="pill warn">Awaiting guardian</span>`) : `<span class="pill ok">Active</span>`}</td></tr>`).join("")}</tbody></table></div>`;
    },
    links() {
      const kids = VA.users().filter(x => x.role === "student" && VA.age(x.dob) < 18);
      return `<div class="card"><h2>Minor students &amp; guardians</h2><table class="t"><thead><tr><th>Student</th><th>Age</th><th>Guardian email</th><th>Link code</th><th>Status</th></tr></thead><tbody>
      ${kids.map(k => `<tr><td>${esc(k.name)}</td><td>${VA.age(k.dob)}</td><td>${esc(k.guardianEmail || "—")}</td><td><span class="code">${k.linkCode}</span></td><td>${k.linked ? `<span class="pill ok">Linked</span>` : `<span class="pill warn">Pending</span>`}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">No minors registered.</td></tr>`}</tbody></table>
      <p style="color:var(--muted);font-size:.85rem;margin-top:12px">A real system would let admins review consent records and resolve disputes. Here the table is read-only.</p></div>`;
    },
    system() {
      return `<div class="card"><h2>What is real, what is demo</h2><ul style="padding-left:20px;color:var(--muted);display:grid;gap:8px">
        <li>All accounts live in this browser’s localStorage — no server, no database.</li>
        <li>Passwords are stored in plain text for the demo. A real backend must hash them.</li>
        <li>Role pages are protected only by a client-side check; a real API must enforce roles on the server.</li>
        <li>Grades, attendance and payments are generated fictional data.</li></ul>
        <p style="margin-top:16px"><button class="btn-d" id="reset">Reset demo accounts</button></p></div>`;
    }
  };

  function render() {
    if (!V[view]) view = "overview";
    $("#title").textContent = TITLES[view];
    $$(".nav-b[data-view]").forEach(b => b.classList.toggle("on", b.dataset.view === view));
    $("#content").innerHTML = `<div class="view">${V[view]()}</div>`;
    const q = $("#uq"); if (q && document.activeElement === document.body && F.q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  }
  const go = v => { view = v; history.replaceState(null, "", "#" + v); render(); };
  document.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.view) return go(t.dataset.view);
    if (t.dataset.go) return go(t.dataset.go);
    if (t.dataset.role) { F.role = t.dataset.role; return render(); }
    if (t.id === "logout") return VA.logout();
    if (t.id === "reset") { VA.resetDemo(); toast("Demo accounts reset"); setTimeout(() => VA.logout(), 900); }
  });
  document.addEventListener("input", e => { if (e.target.id === "uq") { F.q = e.target.value; render(); const q = $("#uq"); q.focus(); q.setSelectionRange(q.value.length, q.value.length); } });
  render();
})();
