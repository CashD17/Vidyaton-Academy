/* ============================================================
   VIDYATON — DEMO AUTHENTICATION (prototype only)
   Everything here lives in the browser's localStorage.
   !! NOT SECURE !!  Passwords are stored in plain text, anyone can edit
   this data in dev tools, and "sessions" are just a flag.
   A real backend is required for: password hashing, sessions/tokens,
   email verification, guardian-consent verification, role-based access
   control on every API route, and privacy rules for children's data.
   ============================================================ */
const VA = (() => {
  const K_USERS = "vid_users", K_SES = "vid_session";
  const HOME = { student: "student.html", parent: "parent.html", admin: "admin.html" };
  const ADMIN_INVITE = "VIDYATON-ADMIN-DEMO";

  const SEED = [
    { id:"u1", role:"student", name:"Nino Beridze", email:"student@demo.vidyaton", pass:"demo123", dob:"2010-05-14", course:"JavaScript", linkCode:"VID-NINO-16", guardianEmail:"parent@demo.vidyaton", linked:true },
    { id:"u2", role:"student", name:"Luka Beridze", email:"luka@demo.vidyaton", pass:"demo123", dob:"2014-02-03", course:"HTML", linkCode:"VID-LUKA-12", guardianEmail:"parent@demo.vidyaton", linked:true },
    { id:"u3", role:"parent",  name:"Mariam Beridze", email:"parent@demo.vidyaton", pass:"demo123", dob:"1984-09-21", children:["u1","u2"] },
    { id:"u4", role:"admin",   name:"Demo Administrator", email:"admin@demo.vidyaton", pass:"demo123", dob:"1990-01-01" }
  ];
  const DEMO_LOGIN = {
    student: { email:"student@demo.vidyaton", pass:"demo123" },
    parent:  { email:"parent@demo.vidyaton",  pass:"demo123" },
    admin:   { email:"admin@demo.vidyaton",   pass:"demo123" }
  };

  const read = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  function users() {
    let u = read(K_USERS, null);
    if (!u) { u = JSON.parse(JSON.stringify(SEED)); write(K_USERS, u); }
    return u;
  }
  const save = u => write(K_USERS, u);
  const byEmail = e => users().find(x => x.email.toLowerCase() === String(e).trim().toLowerCase());
  const byId = id => users().find(x => x.id === id);

  function age(dob) {
    const b = new Date(dob), t = new Date();
    if (isNaN(b)) return null;
    let a = t.getFullYear() - b.getFullYear();
    const m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
    return a;
  }

  function login(role, email, pass) {
    const u = byEmail(email);
    if (!u || u.pass !== pass) return { ok:false, error:"Wrong email or password." };
    if (u.role !== role) return { ok:false, error:`This account is registered as ${u.role}, not ${role}. Pick the “${u.role}” tab.` };
    write(K_SES, { id:u.id, role:u.role });
    return { ok:true, user:u };
  }
  const logout = () => { try { localStorage.removeItem(K_SES); } catch (e) {} location.href = "login.html"; };
  function current() {
    const s = read(K_SES, null);
    return s ? byId(s.id) || null : null;
  }
  /* call at the top of each dashboard page */
  function require(role) {
    const u = current();
    if (!u || u.role !== role) { location.replace("login.html?role=" + role + "&need=1"); return null; }
    return u;
  }

  function newCode(name) {
    const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = ""; for (let i = 0; i < 4; i++) s += a[Math.floor(Math.random() * a.length)];
    return "VID-" + s + "-" + String(Math.floor(10 + Math.random() * 90));
  }

  function register(d) {
    if (byEmail(d.email)) return { ok:false, error:"An account with this email already exists." };
    const a = age(d.dob);
    if (a === null) return { ok:false, error:"Please enter a valid date of birth." };
    if (a < 0 || a > 110) return { ok:false, error:"Date of birth looks wrong." };
    const list = users();
    const u = { id:"u" + Date.now(), role:d.role, name:d.name.trim(), email:d.email.trim(), pass:d.pass, dob:d.dob };
    if (d.role === "student") {
      u.course = d.course || "HTML";
      u.linkCode = newCode(u.name);
      if (a < 18) {
        if (!d.guardianEmail) return { ok:false, error:"A parent/guardian email is required for students under 18." };
        u.guardianEmail = d.guardianEmail.trim();
        u.guardianName = (d.guardianName || "").trim();
        u.linked = false;
      } else { u.linked = true; }
    } else if (d.role === "parent") {
      if (a < 18) return { ok:false, error:"Parent/guardian accounts must be created by someone 18 or older." };
      u.children = [];
    } else if (d.role === "admin") {
      if (a < 18) return { ok:false, error:"Administrators must be 18 or older." };
      if ((d.invite || "").trim() !== ADMIN_INVITE) return { ok:false, error:"Invalid administrator invite code. (Demo code: " + ADMIN_INVITE + ")" };
    }
    list.push(u); save(list);
    if (d.role === "parent" && d.childCode) {
      const r = linkChild(u.id, d.childCode);
      if (!r.ok) { write(K_SES, { id:u.id, role:u.role }); return { ok:true, user:u, warn:r.error }; }
    }
    write(K_SES, { id:u.id, role:u.role });
    return { ok:true, user:u, minor: u.role === "student" && a < 18 };
  }

  /* guardian linking: by code the student shared, or by approving a request addressed to the parent's email */
  function linkChild(parentId, code) {
    const list = users();
    const p = list.find(x => x.id === parentId);
    const c = list.find(x => x.role === "student" && x.linkCode === String(code).trim().toUpperCase());
    if (!p || !c) return { ok:false, error:"No student found with that link code." };
    if (p.children.includes(c.id)) return { ok:false, error:c.name + " is already linked to your account." };
    p.children.push(c.id); c.linked = true; c.guardianEmail = p.email;
    save(list);
    return { ok:true, child:c };
  }
  function unlinkChild(parentId, childId) {
    const list = users();
    const p = list.find(x => x.id === parentId), c = list.find(x => x.id === childId);
    if (!p || !c) return;
    p.children = p.children.filter(i => i !== childId);
    if (age(c.dob) < 18) c.linked = false;
    save(list);
  }
  const pendingFor = parent => users().filter(x => x.role === "student" && !x.linked && x.guardianEmail && x.guardianEmail.toLowerCase() === parent.email.toLowerCase());
  const resetDemo = () => { try { localStorage.removeItem(K_USERS); } catch (e) {} };

  return { HOME, DEMO_LOGIN, ADMIN_INVITE, users, byId, byEmail, age, login, logout, current, require, register, linkChild, unlinkChild, pendingFor, resetDemo, read, write };
})();
