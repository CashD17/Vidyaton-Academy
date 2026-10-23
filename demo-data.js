/* ============================================================
   VIDYATON — FICTIONAL DEMO DATA GENERATOR
   All names, grades, attendance, feedback and payments below are
   invented for this prototype. Nothing here is a real record or a
   real transaction. A backend database would replace this file.
   ============================================================ */
const DD = (() => {
  const TRACKS = ["HTML", "CSS", "JavaScript", "React", "AI"];
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const off = n => { const d = today(); d.setDate(d.getDate() + n); return d; };
  const fmt = (d, o = { day:"numeric", month:"short" }) => d.toLocaleDateString("en-GB", o);
  const fmtY = d => fmt(d, { day:"numeric", month:"short", year:"numeric" });
  const fmtL = d => fmt(d, { weekday:"short", day:"numeric", month:"short" });
  const rng = seed => { let s = seed % 2147483647 || 1; return () => (s = s * 16807 % 2147483647) / 2147483647; };
  const hash = str => { let h = 7; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  const letter = p => p >= 90 ? "A" : p >= 80 ? "B" : p >= 70 ? "C" : p >= 60 ? "D" : "F";
  const gradeClass = p => p >= 90 ? "g-a" : p >= 80 ? "g-b" : p >= 70 ? "g-c" : "g-d";
  const avg = a => a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : 0;

  const MENTORS = { HTML:"Ana Kapanadze", CSS:"Salome Gelashvili", JavaScript:"Davit Lomidze", React:"Giorgi Tsiklauri", AI:"Tamuna Beridze-Kiknadze" };
  const TOPICS = {
    HTML:["Semantic elements","Forms & validation","Accessibility basics","Tables & media","SEO fundamentals","Page structure review"],
    CSS:["Flexbox layouts","CSS Grid","Transitions & animation","Responsive design","Custom properties","Design systems intro"],
    JavaScript:["Functions & scope","Working with the DOM","Arrays & objects","Fetch & APIs","Async / await","Debugging workshop"],
    React:["Components & props","State & hooks","Lists & keys","Routing basics","Forms in React","Mini-app review"],
    AI:["What is machine learning?","Prompting basics","Data & bias","Using AI APIs","Build a chatbot UI","Responsible AI"]
  };
  const ASSIGN = {
    HTML:["Semantic page layout","Accessible contact form","Portfolio landing page"],
    CSS:["Responsive navigation bar","Card grid gallery","Animated button set"],
    JavaScript:["To-do list app","Quiz game logic","Weather widget (mock API)"],
    React:["Counter & timer components","Product list with filters","Mini notes app"],
    AI:["Prompt journal","Image-captioning demo (mock)","Chatbot interface"]
  };
  const GT = ["Quiz","Mini project","Code review","Mid-term test","Practice task","Team challenge"];
  const FEED = [
    "Clean, readable code this week. Keep naming your variables the way you did here — it makes reviewing a pleasure.",
    "Good progress on layout. Next step: test your page at narrow widths before submitting.",
    "Strong problem-solving in the team challenge. Try explaining your approach out loud — it will deepen understanding.",
    "A couple of late submissions this month. Let's agree on a weekly plan so deadlines feel lighter.",
    "Your last project showed real creativity. Add comments to the trickiest functions and it will be excellent.",
    "Great questions in class. I'd like to see you help a classmate with the next exercise — teaching is the best practice."
  ];
  const LB_NAMES = ["Elene M.","Sandro K.","Mariam T.","Tornike B.","Ketevan L.","Irakli D.","Nutsa G.","Giga S.","Anano P.","Zura N."];
  const RESOURCES = [
    {title:"HTML structure cheat sheet",type:"Cheat sheet",track:"HTML",mins:10,desc:"Every common tag on one printable page."},
    {title:"Building accessible forms",type:"Video",track:"HTML",mins:22,desc:"Labels, errors and keyboard navigation."},
    {title:"Flexbox in 20 minutes",type:"Video",track:"CSS",mins:20,desc:"Rows, columns, wrapping and alignment."},
    {title:"CSS Grid playground",type:"Exercise",track:"CSS",mins:35,desc:"Guided practice with instant feedback."},
    {title:"Responsive design checklist",type:"Article",track:"CSS",mins:8,desc:"What to test before you ship a page."},
    {title:"JavaScript functions explained",type:"Article",track:"JavaScript",mins:12,desc:"Parameters, return values and closures."},
    {title:"DOM events workshop",type:"Exercise",track:"JavaScript",mins:40,desc:"Click, input and keyboard handling."},
    {title:"Fetch & APIs walkthrough",type:"Video",track:"JavaScript",mins:28,desc:"Request data and show it on a page."},
    {title:"React hooks quick reference",type:"Cheat sheet",track:"React",mins:10,desc:"useState, useEffect and friends."},
    {title:"Thinking in components",type:"Article",track:"React",mins:15,desc:"Break a design into reusable pieces."},
    {title:"Prompting basics",type:"Article",track:"AI",mins:14,desc:"Write clear prompts and check the output."},
    {title:"How machines learn (intro)",type:"Video",track:"AI",mins:25,desc:"Data, models and predictions in plain words."}
  ];

  const cache = {};
  function lessonDays(count, dir) {
    const out = []; let n = dir > 0 ? 1 : -1;
    while (out.length < count) { const d = off(n); if ([1, 3, 5].includes(d.getDay())) out.push(d); n += dir; }
    return out;
  }

  function build(u) {
    const key = u.id + "|" + u.name + "|" + u.course;
    if (cache[key]) return cache[key];
    const r = rng(hash(u.id + u.name));
    const course = u.course || "JavaScript";
    const ci = Math.max(0, TRACKS.indexOf(course));
    const progress = {};
    TRACKS.forEach((t, i) => progress[t] = i < ci ? 100 : i === ci ? Math.round(45 + r() * 30) : i === ci + 1 ? Math.round(4 + r() * 8) : 0);
    const active = TRACKS.filter(t => progress[t] > 0);

    const grades = [];
    active.forEach(t => { const n = t === course ? 6 : 3; for (let k = 0; k < n; k++) grades.push({ subject:t, title:GT[(k + TRACKS.indexOf(t)) % GT.length], date:off(-(3 + k * 6 + Math.floor(r() * 4))), score:Math.round(64 + r() * 36), max:100 }); });
    grades.sort((a, b) => b.date - a.date);
    const bySubject = {}; active.forEach(t => bySubject[t] = avg(grades.filter(g => g.subject === t).map(g => g.score)));
    const average = avg(grades.map(g => g.score));

    const past = lessonDays(18, -1), next = lessonDays(6, 1);
    const attendance = past.map(d => { const x = r(); return { date:d, subject:course, status: x < .82 ? "present" : x < .9 ? "late" : x < .95 ? "excused" : "absent" }; });
    const present = attendance.filter(a => a.status === "present" || a.status === "late").length;
    const attendancePct = Math.round(present / attendance.length * 100);
    const topics = TOPICS[course];
    const lessons = next.map((d, i) => ({ date:d, time:"17:00–18:30", subject:course, topic:topics[i % topics.length], mentor:MENTORS[course], where: i % 3 === 1 ? "Online" : "Room " + (2 + (i % 2)) }));

    const offs = [-8, -5, -2, 1, 3, 6, 9, 14], stat = ["graded","graded","pending","submitted","pending","pending","pending","pending"];
    const assignments = offs.map((o, i) => {
      const t = active[Math.min(active.length - 1, i < 3 ? active.length - 1 : i % active.length)];
      const names = ASSIGN[t];
      return { id:"as" + i, subject:t, title:names[i % names.length], due:off(o), status:stat[i], score: stat[i] === "graded" ? Math.round(72 + r() * 26) : null };
    });

    const feedback = [0, 1, 2, 3].map(i => { const t = active[i % active.length]; return { mentor:MENTORS[t], subject:t, date:off(-(2 + i * 7)), text:FEED[(hash(u.name) + i * 2) % FEED.length] }; });

    /* payments — FICTIONAL, for UI demonstration only */
    const monthly = 180, term = 6, paidCount = 4 + (hash(u.id) % 2), y = today().getFullYear(), m = today().getMonth();
    const installments = [];
    for (let k = 0; k < paidCount; k++) installments.push({ id:"DEMO-" + String(1000 + hash(u.id) % 900 + k), date:new Date(y, m - 3 + k, 1 + (k % 3)), amount:monthly, note:"Monthly tuition — installment " + (k + 1) + " of " + term, method: k % 2 ? "Bank transfer (demo)" : "Card (demo)" });
    const payments = { monthly, term, installments, paid:monthly * paidCount, total:monthly * term, remaining:monthly * (term - paidCount), paidThrough:new Date(y, m - 3 + paidCount, 0), nextDue:new Date(y, m - 3 + paidCount, 1), currency:"₾" };

    const weekHours = [0, 1, 2, 3, 4, 5].map(i => +(2 + r() * 4).toFixed(1));
    const log = [
      { date:off(-1), text:"Completed lesson: " + topics[0] },
      { date:off(-2), text:"Submitted assignment: " + assignments[1].title },
      { date:off(-4), text:"Watched video: " + RESOURCES.find(x => x.track === course).title },
      { date:off(-6), text:"Scored " + grades[0].score + "/100 in " + grades[0].title },
      { date:off(-9), text:"Joined an online practice session" },
      { date:off(-11), text:"Earned badge: Consistent Learner" }
    ];

    const xp = Math.round(400 + progress[course] * 9 + average * 3);
    const board = LB_NAMES.map((n, i) => ({ name:n, xp:Math.round(xp * (1.35 - i * .075) + r() * 60), week:Math.round(120 + r() * 220), me:false }));
    board.push({ name:u.name, xp, week:Math.round(140 + r() * 180), me:true });

    const earned = { first:true, streak:progress[course] > 30, quiz:grades.some(g => g.score >= 90), team:true, ontime:attendancePct >= 85, proj:progress[course] > 50, helper:false, track:ci > 0 };
    const achievements = [
      { icon:"🚀", title:"First Steps", desc:"Completed your first lesson", got:earned.first },
      { icon:"🔥", title:"Consistent Learner", desc:"Attended 10 lessons in a row", got:earned.streak },
      { icon:"🎯", title:"Sharp Mind", desc:"Scored 90+ on any assessment", got:earned.quiz },
      { icon:"🤝", title:"Team Player", desc:"Finished a team challenge", got:earned.team },
      { icon:"⏰", title:"On Time", desc:"Attendance above 85%", got:earned.ontime },
      { icon:"🛠️", title:"Builder", desc:"Passed 50% of your main track", got:earned.proj },
      { icon:"🎓", title:"Track Finisher", desc:"Complete a full track", got:earned.track },
      { icon:"💬", title:"Helper", desc:"Help a classmate in class", got:earned.helper }
    ];
    const projects = [
      { title:"Personal portfolio", tag:"HTML · CSS", status: ci > 0 ? "Done" : "In progress", pct: ci > 0 ? 100 : progress.HTML },
      { title:ASSIGN[course][0], tag:course, status:"In progress", pct:Math.round(40 + r() * 40) },
      { title:"Team mini-app", tag:"Team · " + course, status:"In review", pct:90 },
      { title:"Final showcase project", tag:"Capstone", status:"Planned", pct:Math.round(r() * 15) }
    ];

    return (cache[key] = { course, mentor:MENTORS[course], progress, active, grades, bySubject, average, attendance, attendancePct, lessons, assignments, feedback, payments, weekHours, log, board, xp, achievements, projects, resources:RESOURCES, streak:3 + Math.floor(r() * 9) });
  }
  return { TRACKS, build, fmt, fmtY, fmtL, off, today, letter, gradeClass, avg, MENTORS };
})();
