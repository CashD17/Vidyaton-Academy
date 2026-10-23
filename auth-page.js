/* Login + registration screens (demo auth — see auth.js) */
document.addEventListener("DOMContentLoaded", () => {
  const mode = document.body.dataset.mode;               // "login" | "register"
  const form = document.getElementById("authForm");
  const err = document.getElementById("err");
  const params = new URLSearchParams(location.search);
  let role = ["student", "parent", "admin"].includes(params.get("role")) ? params.get("role") : "student";

  const showErr = m => { err.textContent = m || ""; err.hidden = !m; };
  const NAMES = { student:"Student", parent:"Parent", admin:"Administrator" };

  function setRole(r) {
    role = r; showErr("");
    document.querySelectorAll(".roles button").forEach(b => { const on = b.dataset.role === r; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    document.querySelectorAll("[data-for]").forEach(el => {
      const show = el.dataset.for.split(" ").includes(r);
      el.hidden = !show;
      el.querySelectorAll("input,select").forEach(i => i.disabled = !show);
    });
    document.querySelectorAll("[data-role-label]").forEach(el => el.textContent = NAMES[r]);
    if (mode === "register") updateAge();
    if (mode === "login") {
      const d = VA.DEMO_LOGIN[r];
      document.getElementById("demoEmail").textContent = d.email;
      document.getElementById("demoPass").textContent = d.pass;
    }
  }
  document.querySelectorAll(".roles button").forEach(b => b.onclick = () => setRole(b.dataset.role));

  if (params.get("need")) showErr("Please sign in to open that dashboard.");

  /* ---------- LOGIN ---------- */
  if (mode === "login") {
    document.getElementById("fillDemo").onclick = () => {
      const d = VA.DEMO_LOGIN[role];
      form.email.value = d.email; form.pass.value = d.pass; showErr("");
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      const r = VA.login(role, form.email.value, form.pass.value);
      if (!r.ok) return showErr(r.error);
      location.href = VA.HOME[r.user.role];
    });
  }

  /* ---------- REGISTER ---------- */
  function updateAge() {
    if (mode !== "register") return;
    const note = document.getElementById("ageNote"), gbox = document.getElementById("guardianBox");
    const a = form.dob.value ? VA.age(form.dob.value) : null;
    const minorStudent = role === "student" && a !== null && a < 18;
    gbox.hidden = !minorStudent;
    gbox.querySelectorAll("input").forEach(i => { i.disabled = !minorStudent; i.required = minorStudent; });
    note.className = "note";
    if (a === null) note.textContent = "";
    else if (a < 0) note.textContent = "Date of birth is in the future.";
    else if (role === "student" && a < 18) { note.textContent = `Age ${a}: a parent or guardian must be linked to this account.`; note.classList.add("warn"); }
    else if (role !== "student" && a < 18) { note.textContent = `Age ${a}: ${NAMES[role]} accounts require someone 18 or older.`; note.classList.add("warn"); }
    else note.textContent = `Age ${a}.`;
  }

  if (mode === "register") {
    form.dob.max = new Date().toISOString().slice(0, 10);
    form.dob.addEventListener("input", updateAge);
    const c = params.get("course"); if (c && form.course) form.course.value = c;
    document.getElementById("fillInvite").onclick = () => { form.invite.value = VA.ADMIN_INVITE; };

    form.addEventListener("submit", e => {
      e.preventDefault(); showErr("");
      if (form.pass.value.length < 6) return showErr("Password must be at least 6 characters.");
      const minor = role === "student" && VA.age(form.dob.value) < 18;
      if (minor && !form.consent.checked) return showErr("Please confirm the guardian consent statement.");
      const r = VA.register({
        role, name:form.name.value, email:form.email.value, pass:form.pass.value, dob:form.dob.value,
        course: form.course ? form.course.value : "", guardianName: form.gname ? form.gname.value : "", guardianEmail: form.gemail ? form.gemail.value : "",
        childCode: form.childCode ? form.childCode.value : "", invite: form.invite ? form.invite.value : ""
      });
      if (!r.ok) return showErr(r.error);
      form.hidden = true; document.getElementById("rolesWrap").hidden = true;
      const done = document.getElementById("done");
      done.hidden = false;
      document.getElementById("doneTitle").textContent = "Welcome to VIDYATON, " + r.user.name.split(" ")[0] + "!";
      const box = document.getElementById("doneBody");
      if (r.minor) {
        box.innerHTML = `<p>Because you are under 18, your account needs a parent or guardian. Two ways to link them:</p>
          <ol class="steps"><li><b>Share this code</b> with your parent/guardian:<div class="code">${r.user.linkCode}</div></li>
          <li>Or ask them to sign in (or register) with <b>${r.user.guardianEmail}</b> — they will see your request and can approve it.</li></ol>
          <p class="note">You can look around your dashboard while you wait. <b>Demo note:</b> in a real system the guardian would receive a verified email and give consent — see “Where a real backend is needed” on the login page.</p>`;
      } else if (r.warn) {
        box.innerHTML = `<p>Your account was created, but the child link failed: <b>${r.warn}</b> You can link a child later from your dashboard.</p>`;
      } else box.innerHTML = `<p>Your ${NAMES[r.user.role].toLowerCase()} account is ready.</p>`;
      document.getElementById("goDash").href = VA.HOME[r.user.role];
    });
  }
  setRole(role);
});
