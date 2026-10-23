/* Parent dashboard — demo data only */
(function () {
  const parent = VA.require("parent"); if (!parent) return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const toast = m => { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); };
  const today = DD.today();
  const F = { sub:"All", att:"All" };
  const SK = "vid_parent_" + parent.id;
  let sel = (VA.read(SK, {}).child) || null;
  let view = (location.hash || "#overview").slice(1);

  const kids = () => (VA.byId(parent.id).children || []).map(VA.byId).filter(Boolean);
  const kid = () => { const k = kids(); return k.find(x => x.id === sel) || k[0] || null; };
  const initials = n => n.split(" ").map(x => x[0]).join("").slice(0, 2);
  const m = n => DD.build(kid()).payments.currency + n.toLocaleString("en-US");
  const sc = v => `<span class="sc ${DD.gradeClass(v) === "g-a" ? "g-a" : DD.gradeClass(v) === "g-b" ? "g-b" : DD.gradeClass(v) === "g-c" ? "g-c" : "g-d"}">${v}</span>`;
  const dt = d => `<div class="dt"><b>${d.getDate()}</b><span>${DD.fmt(d, { month:"short" })}</span></div>`;
  const pr = (l, v) => `<div class="pr"><div class="l"><span>${l}</span><b>${v}%</b></div><div class="bar-l"><i style="width:${v}%"></i></div></div>`;
  const stat = a => a.status === "graded" ? ["Graded", "ok"] : a.status === "submitted" ? ["Submitted", "br"] : a.due < today ? ["Overdue", "bad"] : (a.due - today) / 864e5 <= 2 ? ["Due soon", "warn"] : ["Upcoming", ""];

  function paidBar(D) {
    const p = D.payments;
    $("#paidBar").innerHTML = `<div class="paid"><div><small>Demo record</small><div class="big">Tuition paid through: ${DD.fmtY(p.paidThrough)}</div></div><div class="lt">Next payment due <b>${DD.fmtY(p.nextDue)}</b><br>Remaining balance <b>${m(p.remaining)}</b></div></div>`;
  }

  const V = {
    overview(k, D) {
      const nl = D.lessons[0], na = D.assignments.filter(a => stat(a)[0] !== "Graded" && stat(a)[0] !== "Submitted").sort((a, b) => a.due - b.due)[0];
      return `<div class="g g2" style="grid-template-columns:1.2fr 1fr;margin-bottom:16px">
        <div class="box"><div class="profile"><div class="pic">${initials(k.name)}</div><div><h2 style="border:0;margin:0;padding:0">${esc(k.name)}</h2><p>Age ${VA.age(k.dob)} · ${D.course} track · Mentor ${esc(D.mentor)}</p><p><span class="tag ok">Linked to your account</span></p></div></div></div>
        <div class="box"><h2>Next lesson</h2><div class="li">${dt(nl.date)}<div class="gr"><b>${esc(nl.topic)}</b><br><small>${DD.fmtL(nl.date)} · ${nl.time} · ${nl.where}</small></div></div></div></div>
      <div class="g g4" style="margin-bottom:16px">
        <div class="box kpi"><b>${D.average}% · ${DD.letter(D.average)}</b><span>Average grade</span></div>
        <div class="box kpi"><b>${D.attendancePct}%</b><span>Attendance (last 18 lessons)</span></div>
        <div class="box kpi"><b>${D.progress[D.course]}%</b><span>${D.course} course progress</span></div>
        <div class="box kpi"><b>${D.assignments.filter(a => ["Overdue"].includes(stat(a)[0])).length}</b><span>Overdue assignments</span></div></div>
      <div class="g g2"><div class="box"><h2>Progress by subject</h2>${D.active.map(t => pr(t, D.progress[t])).join("")}</div>
        <div class="g"><div class="box"><h2>Nearest deadline</h2>${na ? `<div class="li">${dt(na.due)}<div class="gr"><b>${esc(na.title)}</b><br><small>${na.subject} · due ${DD.fmtL(na.due)}</small></div><span class="tag ${stat(na)[1]}">${stat(na)[0]}</span></div>` : `<p class="empty">No open deadlines</p>`}</div>
        <div class="box"><h2>Latest mentor note</h2><div class="q"><small>${esc(D.feedback[0].mentor)} · ${DD.fmt(D.feedback[0].date)}</small><p>“${esc(D.feedback[0].text)}”</p></div></div></div></div>`;
    },
    grades(k, D) {
      const subs = ["All", ...D.active], list = D.grades.filter(g => F.sub === "All" || g.subject === F.sub);
      return `<div class="chips">${subs.map(s => `<button class="ch ${F.sub === s ? "on" : ""}" data-sub="${s}">${s}</button>`).join("")}</div>
      <div class="g g2" style="grid-template-columns:1.5fr 1fr"><div class="box"><h2>Gradebook <small>${list.length} entries</small></h2><table><thead><tr><th>Date</th><th>Subject</th><th>Assessment</th><th>Score</th><th>Grade</th></tr></thead><tbody>
        ${list.map(g => `<tr><td>${DD.fmt(g.date)}</td><td>${g.subject}</td><td>${esc(g.title)}</td><td>${sc(g.score)} <small>/${g.max}</small></td><td>${DD.letter(g.score)}</td></tr>`).join("")}</tbody></table></div>
      <div class="box"><h2>Academic progress</h2>${D.active.map(t => pr(t + " — average", D.bySubject[t])).join("")}<p style="color:var(--muted);font-size:.85rem;margin-top:8px">Overall average: <b>${D.average}%</b> (${DD.letter(D.average)})</p></div></div>`;
    },
    attendance(k, D) {
      const list = D.attendance.filter(a => F.att === "All" || a.status === F.att.toLowerCase());
      const cnt = s => D.attendance.filter(a => a.status === s).length;
      return `<div class="g g4" style="margin-bottom:16px"><div class="box kpi"><b>${cnt("present")}</b><span>Present</span></div><div class="box kpi"><b>${cnt("late")}</b><span>Late</span></div><div class="box kpi"><b>${cnt("excused")}</b><span>Excused</span></div><div class="box kpi"><b>${cnt("absent")}</b><span>Absent</span></div></div>
      <div class="chips">${["All", "Present", "Late", "Excused", "Absent"].map(s => `<button class="ch ${F.att === s ? "on" : ""}" data-att="${s}">${s}</button>`).join("")}</div>
      <div class="box"><h2>Attendance journal <small>last 18 lessons</small></h2>${list.length ? `<div class="jr">${list.map(a => `<div class="jd ${a.status}">${DD.fmt(a.date)}<b>${{ present:"✓", late:"L", excused:"E", absent:"✗" }[a.status]}</b></div>`).join("")}</div>` : `<p class="empty">No records for this filter.</p>`}
      <div class="legend"><span>✓ Present</span><span>L Late</span><span>E Excused</span><span>✗ Absent</span></div></div>`;
    },
    activity(k, D) {
      return `<div class="g g2"><div class="box"><h2>Study hours per week <small>last 6 weeks</small></h2><div class="spark">${D.weekHours.map(h => `<div style="height:${h * 17}px"><span>${h}</span></div>`).join("")}</div></div>
      <div class="box"><h2>Recent learning activity</h2>${D.log.map(l => `<div class="li">${dt(l.date)}<div class="gr">${esc(l.text)}</div></div>`).join("")}</div></div>`;
    },
    schedule(k, D) {
      return `<div class="g g2"><div class="box"><h2>Upcoming lessons</h2>${D.lessons.map(l => `<div class="li">${dt(l.date)}<div class="gr"><b>${esc(l.topic)}</b><br><small>${l.time} · ${esc(l.mentor)}</small></div><span class="tag ${l.where === "Online" ? "br" : ""}">${l.where}</span></div>`).join("")}</div>
      <div class="box"><h2>Assignment deadlines</h2>${[...D.assignments].sort((a, b) => a.due - b.due).map(a => { const [s, c] = stat(a); return `<div class="li">${dt(a.due)}<div class="gr"><b>${esc(a.title)}</b><br><small>${a.subject} · ${DD.fmtL(a.due)}</small></div><span class="tag ${c}">${s}</span></div>`; }).join("")}</div></div>`;
    },
    feedback(k, D) {
      return `<div class="box"><h2>Mentor feedback <small>${esc(k.name)}</small></h2>${D.feedback.map(f => `<div class="q"><small><b>${esc(f.mentor)}</b> · ${f.subject} · ${DD.fmtY(f.date)}</small><p>“${esc(f.text)}”</p></div>`).join("")}</div>`;
    },
    payments(k, D) {
      const p = D.payments;
      return `<div class="g g4" style="margin-bottom:16px"><div class="box kpi"><b>${m(p.paid)}</b><span>Paid (demo)</span></div><div class="box kpi"><b>${m(p.remaining)}</b><span>Remaining balance</span></div><div class="box kpi"><b>${DD.fmt(p.nextDue, { day:"numeric", month:"short", year:"numeric" })}</b><span>Next due date</span></div><div class="box kpi"><b>${m(p.total)}</b><span>Term total (${p.term} months)</span></div></div>
      <div class="box" style="margin-bottom:16px"><h2>Tuition paid through</h2><p style="font-family:Georgia,serif;font-size:1.4rem;color:var(--brand)"><b>Tuition paid through: ${DD.fmtY(p.paidThrough)}</b></p>
        <div class="bar-l" style="height:10px;margin:10px 0 6px"><i style="width:${Math.round(p.paid / p.total * 100)}%"></i></div><small style="color:var(--muted)">${Math.round(p.paid / p.total * 100)}% of the term paid · next installment ${m(p.monthly)} due ${DD.fmtY(p.nextDue)}</small>
        <p style="margin-top:12px"><button class="btn" id="payNow">Pay next installment</button></p></div>
      <div class="box"><h2>Payment history <small>demo records — not real transactions</small></h2><table><thead><tr><th>Date</th><th>Reference</th><th>Description</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead><tbody>
        ${[...p.installments].reverse().map(i => `<tr><td>${DD.fmtY(i.date)}</td><td>${i.id}</td><td>${esc(i.note)}</td><td>${i.method}</td><td>${m(i.amount)}</td><td><span class="tag">Demo record</span></td></tr>`).join("")}</tbody></table></div>`;
    },
    children() {
      const ks = kids(), pend = VA.pendingFor(VA.byId(parent.id));
      return `<div class="g g2"><div class="box"><h2>Linked children</h2>${ks.map(c => `<div class="li"><div class="pic" style="width:42px;height:42px;font-size:1rem">${initials(c.name)}</div><div class="gr"><b>${esc(c.name)}</b><br><small>Age ${VA.age(c.dob)} · ${c.course}</small></div><button class="btn ghost sm" data-unlink="${c.id}">Unlink</button></div>`).join("") || `<p class="empty">No linked children yet.</p>`}</div>
      <div class="g"><div class="box"><h2>Link a child</h2><p style="color:var(--muted);font-size:.9rem;margin-bottom:10px">Ask your child for their link code (shown on their dashboard and after registration).</p>
        <form id="linkForm" style="display:flex;gap:8px;flex-wrap:wrap"><input class="inp" name="code" placeholder="VID-XXXX-00" required style="flex:1;min-width:140px;text-transform:uppercase"><button class="btn">Link</button></form>
        <p id="linkMsg" style="margin-top:8px;font-size:.85rem"></p><p style="color:var(--muted);font-size:.8rem;margin-top:6px">Demo codes: <code>VID-NINO-16</code>, <code>VID-LUKA-12</code></p></div>
      <div class="box"><h2>Requests waiting for you</h2>${pend.map(c => `<div class="li"><div class="gr"><b>${esc(c.name)}</b><br><small>Age ${VA.age(c.dob)} · requested a link to ${esc(c.guardianEmail)}</small></div><button class="btn sm" data-approve="${c.linkCode}">Approve</button></div>`).join("") || `<p class="empty">No pending requests.</p>`}<p style="color:var(--muted);font-size:.78rem;margin-top:8px">Demo note: a real system would verify your identity and record guardian consent on the server.</p></div></div></div>`;
    }
  };

  function render() {
    const k = kid();
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.v === view));
    const ks = kids();
    $("#childSel").hidden = !ks.length;
    $("#child").innerHTML = ks.map(c => `<option value="${c.id}" ${k && c.id === k.id ? "selected" : ""}>${esc(c.name)}</option>`).join("");
    if (!k) {
      $("#paidBar").innerHTML = "";
      view = "children";
      document.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.v === view));
      $("#content").innerHTML = `<div class="note"><b>Welcome, ${esc(parent.name)}.</b> No child is linked yet. Enter your child’s link code below (or approve a request) to see their journal.</div>` + V.children();
      return;
    }
    const D = DD.build(k); paidBar(D);
    $("#content").innerHTML = V[view](k, D);
  }
  const go = v => { view = v; history.replaceState(null, "", "#" + v); render(); window.scrollTo(0, 0); };
  if (!V[view]) view = "overview";

  document.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.v) return go(t.dataset.v);
    if (t.dataset.sub) { F.sub = t.dataset.sub; return render(); }
    if (t.dataset.att) { F.att = t.dataset.att; return render(); }
    if (t.id === "logout") return VA.logout();
    if (t.id === "payNow") { const o = document.createElement("div"); o.className = "modal"; o.innerHTML = `<div><h3>Payments are not connected</h3><p>This is a prototype. A real payment provider (card / bank) and a server are needed to take payments. No money has moved and nothing was charged.</p><button class="btn" data-close>OK</button></div>`; document.body.appendChild(o); return; }
    if (t.dataset.close !== undefined) return t.closest(".modal").remove();
    if (t.dataset.unlink) { VA.unlinkChild(parent.id, t.dataset.unlink); sel = null; toast("Child unlinked"); return render(); }
    if (t.dataset.approve) { const r = VA.linkChild(parent.id, t.dataset.approve); toast(r.ok ? r.child.name + " linked" : r.error); return render(); }
  });
  document.addEventListener("change", e => { if (e.target.id === "child") { sel = e.target.value; VA.write(SK, { child:sel }); render(); } });
  document.addEventListener("submit", e => {
    if (e.target.id !== "linkForm") return; e.preventDefault();
    const r = VA.linkChild(parent.id, e.target.code.value);
    if (r.ok) { sel = r.child.id; VA.write(SK, { child:sel }); toast(r.child.name + " linked"); view = "overview"; render(); }
    else { const msg = $("#linkMsg"); msg.textContent = r.error; msg.style.color = "var(--bad)"; }
  });
  render();
})();
