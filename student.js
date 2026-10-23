/* Student dashboard (demo data from demo-data.js) */
(function () {
  const user = VA.require("student"); if (!user) return;
  const D = DD.build(user);
  const KEY = "vid_st_" + user.id;
  let S = Object.assign({ theme:"violet", submitted:{}, dismissed:{}, bio:"", notify:{ lessons:true, deadlines:true, feedback:false } }, VA.read(KEY, {}));
  const persist = () => VA.write(KEY, S);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const toast = m => { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); };
  const today = DD.today();
  const THEMES = { violet:"Violet night", black:"Pure black", light:"Light" };
  const F = { grades:"All", assign:"All", assignSub:"All", resType:"All", resQ:"", board:"week" };

  document.body.dataset.theme = S.theme;
  $("#av").textContent = user.name.split(" ").map(x => x[0]).join("").slice(0, 2);

  /* guardian banner for minors */
  const minor = VA.age(user.dob) < 18;
  if (minor && !user.linked) $("#guardianBanner").innerHTML = `<div class="banner">⏳ <b>Waiting for a parent/guardian link.</b> Share your code <span class="code">${user.linkCode}</span> with them${user.guardianEmail ? ` (request sent to <b>${esc(user.guardianEmail)}</b>)` : ""}. They enter it on their dashboard to link your account.</div>`;
  else if (minor) $("#guardianBanner").innerHTML = `<div class="banner" style="border-color:var(--ok)">✅ Linked to guardian <b>${esc(user.guardianEmail)}</b>.</div>`;

  const dateBox = d => `<div class="dateb"><b>${d.getDate()}</b><span>${DD.fmt(d, { month:"short" })}</span></div>`;
  const dueState = a => a.status === "graded" ? ["Graded", "ok"] : (S.submitted[a.id] || a.status === "submitted") ? ["Submitted", "acc"] : a.due < today ? ["Overdue", "bad"] : (a.due - today) / 864e5 <= 2 ? ["Due soon", "warn"] : ["Pending", ""];
  const prog = (l, v) => `<div class="prog"><div class="l"><span>${l}</span><b>${v}%</b></div><div class="bar"><i style="width:${v}%"></i></div></div>`;
  const chips = (arr, cur, key) => `<div class="chips">${arr.map(a => `<button class="chip ${a === cur ? "on" : ""}" data-f="${key}" data-v="${esc(a)}">${esc(a)}</button>`).join("")}</div>`;

  const VIEWS = {
    overview() {
      const nextL = D.lessons[0];
      const pend = D.assignments.filter(a => dueState(a)[0] !== "Graded" && dueState(a)[0] !== "Submitted");
      const rank = [...D.board].sort((a, b) => b.xp - a.xp).findIndex(x => x.me) + 1;
      return `<div class="grid g-main">
        <div class="card welcome"><h2>Welcome back, ${esc(user.name.split(" ")[0])}! 👋</h2>
          <p>${D.streak}-day learning streak · Next lesson: <b>${esc(nextL.topic)}</b> on ${DD.fmtL(nextL.date)}, ${nextL.time}.</p>
          <button class="btn2" data-go="schedule">See my schedule</button></div>
        <div class="card"><h2>Next lesson</h2><div class="row-i">${dateBox(nextL.date)}<div class="grow"><b>${esc(nextL.topic)}</b><br><small>${nextL.subject} · ${esc(nextL.mentor)} · ${nextL.where}</small></div></div></div>
      </div>
      <div class="grid g4" style="margin:18px 0">
        <div class="card stat"><b>${D.average}%</b><span>Average grade (${DD.letter(D.average)})</span></div>
        <div class="card stat"><b>${pend.length}</b><span>Assignments to do</span></div>
        <div class="card stat"><b>#${rank}</b><span>Leaderboard rank</span></div>
        <div class="card stat"><b>${D.attendancePct}%</b><span>Attendance</span></div>
      </div>
      <div class="grid g-main">
        <div class="card"><h2>Course progress <small>${esc(D.course)} track</small></h2>${DD.TRACKS.map(t => prog(t + (t === D.course ? " · current" : ""), D.progress[t])).join("")}</div>
        <div class="grid">
          <div class="card"><h2>Study hours <small>last 6 weeks</small></h2><div class="spark" style="margin-top:20px">${D.weekHours.map((h, i) => `<div style="height:${h * 15}px"><span>${h}</span></div>`).join("")}</div></div>
          <div class="card"><h2>Latest mentor feedback</h2><div class="fb-i"><b>${esc(D.feedback[0].mentor)}</b> <small>· ${D.feedback[0].subject}</small><q>“${esc(D.feedback[0].text)}”</q></div><button class="btn-s" data-go="grades">All feedback</button></div>
        </div></div>`;
    },
    grades() {
      const subs = ["All", ...D.active];
      const list = D.grades.filter(g => F.grades === "All" || g.subject === F.grades);
      return `${chips(subs, F.grades, "grades")}
      <div class="grid g-main"><div class="card"><h2>Grades <small>${list.length} results</small></h2>
        <table class="t"><thead><tr><th>Date</th><th>Subject</th><th>Assessment</th><th>Score</th><th>Grade</th></tr></thead><tbody>
        ${list.map(g => `<tr><td>${DD.fmt(g.date)}</td><td>${g.subject}</td><td>${esc(g.title)}</td><td>${g.score}/${g.max}</td><td class="${DD.gradeClass(g.score)}">${DD.letter(g.score)}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">No grades yet.</td></tr>`}</tbody></table></div>
        <div class="grid"><div class="card"><h2>Averages</h2>${D.active.map(t => prog(t, D.bySubject[t])).join("")}</div>
        <div class="card"><h2>Mentor feedback</h2>${D.feedback.filter(f => F.grades === "All" || f.subject === F.grades).map(f => `<div class="fb-i"><b>${esc(f.mentor)}</b> <small>· ${f.subject} · ${DD.fmt(f.date)}</small><q>“${esc(f.text)}”</q></div>`).join("") || `<p class="empty">No feedback for this subject yet.</p>`}</div></div></div>`;
    },
    assignments() {
      const list = D.assignments.filter(a => (F.assignSub === "All" || a.subject === F.assignSub) && (F.assign === "All" || dueState(a)[0] === F.assign)).sort((a, b) => a.due - b.due);
      return `<div class="chips">${["All", "Pending", "Due soon", "Overdue", "Submitted", "Graded"].map(s => `<button class="chip ${F.assign === s ? "on" : ""}" data-f="assign" data-v="${s}">${s}</button>`).join("")}
        <select class="f" data-sel="assignSub">${["All", ...D.active].map(s => `<option ${F.assignSub === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
      <div class="card"><h2>Assignments &amp; deadlines <small>${list.length} shown</small></h2>
        ${list.map(a => { const [st, cls] = dueState(a); return `<div class="row-i">${dateBox(a.due)}<div class="grow"><b>${esc(a.title)}</b><br><small>${a.subject} · due ${DD.fmtL(a.due)}${a.score ? " · score " + a.score + "/100" : ""}</small></div><span class="pill ${cls}">${st}</span>
          ${st === "Graded" ? "" : S.submitted[a.id] ? `<button class="btn-s" data-undo="${a.id}">Undo</button>` : a.status === "submitted" ? "" : `<button class="btn-s" data-submit="${a.id}">Mark submitted</button>`}</div>`; }).join("") || `<p class="empty">Nothing matches these filters.</p>`}</div>`;
    },
    resources() {
      const list = D.resources.filter(r => (F.resType === "All" || r.type === F.resType) && (!F.resQ || (r.title + r.desc + r.track).toLowerCase().includes(F.resQ.toLowerCase())));
      return `<div class="chips">${["All", "Video", "Article", "Cheat sheet", "Exercise"].map(t => `<button class="chip ${F.resType === t ? "on" : ""}" data-f="resType" data-v="${t}">${t}</button>`).join("")}
        <input class="f" id="resQ" placeholder="Search resources…" value="${esc(F.resQ)}"></div>
      <div class="res-grid">${list.map(r => `<div class="res"><span class="pill acc">${r.type}</span> <span class="pill">${r.track}</span><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p><p style="margin-top:8px">⏱ ${r.mins} min</p><button class="btn-s" style="margin-top:10px" data-open="${esc(r.title)}">Open (demo)</button></div>`).join("") || `<p class="empty">No resources found.</p>`}</div>`;
    },
    leaderboard() {
      const rows = [...D.board].sort((a, b) => b[F.board === "week" ? "week" : "xp"] - a[F.board === "week" ? "week" : "xp"]);
      return `<div class="chips"><button class="chip ${F.board === "week" ? "on" : ""}" data-f="board" data-v="week">This week</button><button class="chip ${F.board === "all" ? "on" : ""}" data-f="board" data-v="all">All time</button></div>
      <div class="card" style="max-width:640px"><h2>Student leaderboard <small>fictional names · XP</small></h2>
      ${rows.map((r, i) => `<div class="lb ${r.me ? "me" : ""}"><span class="rk">${i + 1}</span><span>${esc(r.me ? r.name + " (you)" : r.name)}</span><b>${r[F.board === "week" ? "week" : "xp"]} XP</b></div>`).join("")}</div>`;
    },
    schedule() {
      const rem = [];
      D.assignments.forEach(a => { const [st] = dueState(a); if (["Due soon", "Overdue"].includes(st)) rem.push({ id:"r-" + a.id, text:`${st === "Overdue" ? "Overdue" : "Due soon"}: ${a.title}`, sub:"Due " + DD.fmtL(a.due) }); });
      rem.push({ id:"r-l", text:"Next lesson: " + D.lessons[0].topic, sub:DD.fmtL(D.lessons[0].date) + " · " + D.lessons[0].time }, { id:"r-q", text:"Weekly quiz on Friday", sub:"Revise " + D.course + " notes" });
      const live = rem.filter(r => !S.dismissed[r.id]);
      return `<div class="grid g-main"><div class="card"><h2>Upcoming lessons</h2>${D.lessons.map(l => `<div class="row-i">${dateBox(l.date)}<div class="grow"><b>${esc(l.topic)}</b><br><small>${l.time} · ${esc(l.mentor)}</small></div><span class="pill ${l.where === "Online" ? "acc" : ""}">${l.where}</span></div>`).join("")}</div>
      <div class="card"><h2>Reminders <small>${live.length} active</small></h2>${live.map(r => `<div class="row-i"><input type="checkbox" data-dismiss="${r.id}" aria-label="Done"><div class="grow"><b>${esc(r.text)}</b><br><small>${esc(r.sub)}</small></div></div>`).join("") || `<p class="empty">All caught up 🎉</p>`}${live.length < rem.length ? `<button class="btn-s" data-restore>Restore all</button>` : ""}</div></div>`;
    },
    projects() {
      return `<div class="grid g2"><div class="card"><h2>Projects</h2>${D.projects.map(p => `<div class="prog"><div class="l"><span><b>${esc(p.title)}</b> <small style="color:var(--muted)">· ${esc(p.tag)}</small></span><span class="pill ${p.status === "Done" ? "ok" : p.status === "In review" ? "warn" : ""}">${p.status}</span></div><div class="bar"><i style="width:${p.pct}%"></i></div></div>`).join("")}</div>
      <div class="card"><h2>Achievements <small>${D.achievements.filter(a => a.got).length}/${D.achievements.length}</small></h2><div class="badges">${D.achievements.map(a => `<div class="badge ${a.got ? "" : "off"}"><span>${a.icon}</span><b>${esc(a.title)}</b><small>${esc(a.desc)}</small></div>`).join("")}</div></div></div>`;
    },
    settings() {
      return `<div class="grid g2"><div class="card"><h2>Profile</h2><form class="form-g" id="prof">
        <label>Full name<input class="f" name="name" value="${esc(user.name)}"></label>
        <label>Email<input class="f" value="${esc(user.email)}" disabled></label>
        <label>Date of birth<input class="f" value="${esc(user.dob)}" disabled></label>
        <label>Current course<input class="f" value="${esc(D.course)}" disabled></label>
        <label>About me<textarea class="f" name="bio" rows="3" placeholder="Tell mentors a bit about yourself">${esc(S.bio)}</textarea></label>
        <button class="btn-p" type="submit">Save profile</button></form></div>
      <div class="grid"><div class="card"><h2>Theme</h2><div class="swatches">${Object.entries(THEMES).map(([k, n]) => `<button class="sw ${S.theme === k ? "on" : ""}" data-theme-pick="${k}"><i style="background:${k === "violet" ? "linear-gradient(135deg,#171027,#a855f7)" : k === "black" ? "linear-gradient(135deg,#000,#c084fc)" : "linear-gradient(135deg,#fff,#7c3aed)"}"></i>${n}</button>`).join("")}</div></div>
      <div class="card"><h2>Notifications</h2>${[["lessons", "Lesson reminders"], ["deadlines", "Deadline alerts"], ["feedback", "New mentor feedback"]].map(([k, n]) => `<label class="toggle">${n}<input type="checkbox" data-notify="${k}" ${S.notify[k] ? "checked" : ""}></label>`).join("")}</div>
      <div class="card"><h2>Guardian link</h2><p style="color:var(--muted)">${minor ? (user.linked ? "Linked to " + esc(user.guardianEmail) : "Not linked yet. Your code: ") : "You are an adult learner — no guardian link needed."} ${minor && !user.linked ? `<span class="code">${user.linkCode}</span>` : ""}</p></div></div></div>`;
    }
  };
  const TITLES = { overview:"Overview", grades:"Grades & feedback", assignments:"Assignments", resources:"Learning resources", leaderboard:"Leaderboard", schedule:"Lessons & reminders", projects:"Projects & achievements", settings:"Settings" };

  let view = (location.hash || "#overview").slice(1);
  if (!VIEWS[view]) view = "overview";
  function render(keepFocus) {
    $("#title").textContent = TITLES[view];
    $$(".nav-b[data-view]").forEach(b => b.classList.toggle("on", b.dataset.view === view));
    $("#content").innerHTML = `<div class="view">${VIEWS[view]()}</div>`;
    if (keepFocus) { const q = $("#resQ"); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
  }
  const go = v => { view = v; history.replaceState(null, "", "#" + v); render(); window.scrollTo(0, 0); };

  document.addEventListener("click", e => {
    const t = e.target.closest("button,[data-go]"); if (!t) return;
    if (t.dataset.view) return go(t.dataset.view);
    if (t.dataset.go) return go(t.dataset.go);
    if (t.dataset.f) { F[t.dataset.f] = t.dataset.v; return render(); }
    if (t.dataset.submit) { S.submitted[t.dataset.submit] = true; persist(); toast("Marked as submitted (demo)"); return render(); }
    if (t.dataset.undo) { delete S.submitted[t.dataset.undo]; persist(); return render(); }
    if (t.dataset.open) return toast("Demo: “" + t.dataset.open + "” would open here");
    if (t.dataset.themePick) { S.theme = t.dataset.themePick; document.body.dataset.theme = S.theme; persist(); return render(); }
    if (t.dataset.restore !== undefined) { S.dismissed = {}; persist(); return render(); }
    if (t.id === "themeQuick") { const k = Object.keys(THEMES); S.theme = k[(k.indexOf(S.theme) + 1) % k.length]; document.body.dataset.theme = S.theme; persist(); toast("Theme: " + THEMES[S.theme]); if (view === "settings") render(); }
    if (t.id === "logout") VA.logout();
  });
  document.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.sel) { F[t.dataset.sel] = t.value; render(); }
    if (t.dataset.dismiss) { S.dismissed[t.dataset.dismiss] = true; persist(); render(); }
    if (t.dataset.notify) { S.notify[t.dataset.notify] = t.checked; persist(); toast("Preference saved"); }
  });
  document.addEventListener("input", e => { if (e.target.id === "resQ") { F.resQ = e.target.value; render(true); } });
  document.addEventListener("submit", e => {
    if (e.target.id !== "prof") return; e.preventDefault();
    const f = e.target, list = VA.users(), u = list.find(x => x.id === user.id);
    if (f.name.value.trim()) u.name = f.name.value.trim();
    VA.write("vid_users", list); S.bio = f.bio.value; persist(); toast("Profile saved"); $("#av").textContent = u.name.split(" ").map(x => x[0]).join("").slice(0, 2);
  });
  render();
})();
