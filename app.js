/* VIDYATON shared script: header, blurred menu, search page, EN/KA language toggle, reveal, forms */
const KA = {
  nav_menu:"მენიუ", nav_search:"ძიება", nav_reg:"რეგისტრაცია",
  nav_courses:"კურსები", nav_courses_s:"პროგრამები და მიმართულებები",
  nav_about:"აკადემიის შესახებ", nav_about_s:"ჩვენი მისია და გუნდი",
  nav_careers:"კარიერა", nav_careers_s:"ვაკანსიები და შედეგები",
  nav_study:"სწავლა", nav_study_s:"როგორ ვსწავლობთ",
  nav_home:"მთავარი",
  search_ph:"მოძებნე კურსები, სიახლეები...", no_res:"ვერაფერი მოიძებნა",
  f_tag:"ისწავლე კოდი. ააშენე მომავალი.", f_links:"სწრაფი ბმულები", f_contact:"კონტაქტი",
  f_rights:"ყველა უფლება დაცულია.",

  h_tag:"პროგრამირების აკადემია", h_t1:"ააშენე მომავალი", h_t2:"კოდით.",
  h_lead:"VIDYATON გასწავლის HTML-ს, CSS-ს, JavaScript-ს, React-სა და AI-ს პრაქტიკული პროექტებით და გამოცდილი მენტორებით.",
  h_cta1:"დარეგისტრირდი", h_cta2:"კურსების ნახვა",
  langs_t:"რას ვასწავლით", langs_s:"ხუთი ძირითადი ტექნოლოგია — საფუძვლებიდან ხელოვნურ ინტელექტამდე.",
  l_html:"ვებგვერდის სტრუქტურა და სემანტიკა.", l_css:"დიზაინი, ანიმაცია და რესპონსიულობა.",
  l_js:"ინტერაქტიულობა და ლოგიკა ბრაუზერში.", l_react:"თანამედროვე კომპონენტური ინტერფეისები.",
  l_ai:"მანქანური სწავლება და AI ინსტრუმენტები.",
  news_t:"სიახლეები", news_s:"რა ხდება VIDYATON-ში.",
  n1_t:"ახალი AI ლაბორატორია გაიხსნა", n1_p:"სტუდენტებს უკვე შეუძლიათ ნეირონულ ქსელებზე პრაქტიკული მუშაობა ჩვენს ახალ ლაბორატორიაში.",
  n2_t:"ჰაკათონი VIDYATON 2026", n2_p:"48-საათიანი შეჯიბრი საუკეთესო პროექტებისთვის და სასარგებლო პრიზებისთვის.",
  n3_t:"პარტნიორობა ტექ კომპანიებთან", n3_p:"კურსდამთავრებულებს ახლა უფრო მარტივად ექნებათ სტაჟირების შესაძლებლობა.",
  an_t:"განცხადებები", an_s:"მნიშვნელოვანი თარიღები და ცვლილებები.",
  a1_t:"ახალი ჯგუფის რეგისტრაცია იწყება", a1_p:"JavaScript-ისა და React-ის საღამოს ჯგუფი — ადგილები შეზღუდულია.",
  a2_t:"ღია კარის დღე", a2_p:"გაიცანი მენტორები და სცადე უფასო გაკვეთილი.",
  a3_t:"განრიგის ცვლილება", a3_p:"დეკემბრის გაკვეთილები ახალ აუდიტორიაში გადადის.",
  fb_t:"სტუდენტების ინფორმაცია და გამოხმაურება", fb_s:"სასარგებლო ინფორმაცია და ის, რასაც ჩვენი სტუდენტები ამბობენ.",
  si1_t:"სტუდენტის პორტალი", si1_p:"წვდომა მასალებზე, დავალებებსა და შეფასებებზე.",
  si2_t:"გაკვეთილების განრიგი", si2_p:"ყოველდღიური განრიგი და ონლაინ ჩანაწერები.",
  si3_t:"მხარდაჭერა", si3_p:"დაგვიკავშირდი ნებისმიერ დროს, როცა დახმარება დაგჭირდება.",
  f1:"VIDYATON-მა ნულიდან ვებ-დეველოპერად გამხადა. პრაქტიკული პროექტები ყველაზე მეტად დამეხმარა.",
  f2:"მენტორები ყოველთვის მზად არიან დაგეხმარონ. AI კურსმა ჩემი კარიერა შეცვალა.",
  f3:"საუკეთესო გარემო სასწავლებლად — თემი, პროექტები და რეალური გამოცდილება.",
  band_t:"მზად ხარ დასაწყებად?", band_p:"დაიკავე ადგილი შემდეგ ჯგუფში დღესვე.",

  co_t:"ჩვენი კურსები", co_lead:"აირჩიე შენი გზა — დამწყებიდან პროფესიონალამდე.", co_enroll:"რეგისტრაცია",
  co_html:"ისწავლე ვებგვერდის საფუძვლები: ტეგები, ფორმები, SEO და ხელმისაწვდომობა.",
  co_css:"Flexbox, Grid, ანიმაციები და თანამედროვე დიზაინის სისტემები.",
  co_js:"ცვლადები, ფუნქციები, DOM, API და ასინქრონული პროგრამირება.",
  co_react:"კომპონენტები, hooks, მდგომარეობის მართვა და რეალური აპლიკაციები.",
  co_ai:"მანქანური სწავლების საფუძვლები, პრომპტინგი და AI პროდუქტების აგება.",
  d6:"6 კვირა", d8:"8 კვირა", d10:"10 კვირა", d12:"12 კვირა",
  lv_b:"დამწყები", lv_i:"საშუალო", lv_a:"მოწინავე",

  ab_t:"აკადემიის შესახებ", ab_lead:"VIDYATON — ადგილი, სადაც ცოდნა უნარად იქცევა.",
  ab_m_t:"ჩვენი მისია", ab_m_p:"ყველას ვაძლევთ შესაძლებლობას, ისწავლოს პროგრამირება მაღალი ხარისხით, პრაქტიკითა და მხარდაჭერით.",
  lab_students:"სტუდენტი", lab_courses:"კურსი", lab_mentors:"მენტორი", lab_placed:"დასაქმება",
  v_t:"ჩვენი ღირებულებები",
  v1_t:"ცოდნა", v1_p:"ვასწავლით ღრმად და პრაქტიკულად.",
  v2_t:"საზოგადოება", v2_p:"ერთად ვიზრდებით და ერთმანეთს ვეხმარებით.",
  v3_t:"პატიოსნება", v3_p:"გამჭვირვალე სწავლება და სამართლიანი შეფასება.",
  v4_t:"ინოვაცია", v4_p:"ყოველთვის უახლეს ტექნოლოგიებს ვიყენებთ.",

  cr_t:"კარიერა", cr_lead:"შემოგვიერთდი გუნდს ან დაიწყე ტექ კარიერა ჩვენთან ერთად.",
  cr_open:"ღია ვაკანსიები", apply:"განაცხადი",
  j1_t:"JavaScript მენტორი", j2_t:"AI ინსტრუქტორი", j3_t:"სტუდენტთა მხარდაჭერის სპეციალისტი",
  jt_full:"სრული განაკვეთი", jt_part:"ნახევარი განაკვეთი", jt_remote:"დისტანციური",
  cr_out:"შენი კარიერა კურსის შემდეგ",
  o1_p:"ააშენე თანამედროვე ინტერფეისები კომპანიებისთვის.", o2_p:"შექმენი სწრაფი და მასშტაბირებადი აპლიკაციები.",
  o3_p:"ჩაერთე ხელოვნური ინტელექტის პროდუქტებზე მუშაობაში.", o4_p:"იმუშავე დამოუკიდებლად და იპოვე საკუთარი კლიენტები.",
  o4_t:"ფრილანსერი",

  sd_t:"სწავლა", sd_lead:"ნაბიჯ-ნაბიჯ გზა ნულიდან პროფესიონალამდე.",
  wk1:"კვირა 1–6", wk2:"კვირა 7–14", wk3:"კვირა 15–22", wk4:"კვირა 23–30",
  sp1:"ვებგვერდის სტრუქტურა და დიზაინი — პირველი პორტფოლიო.", sp2:"ლოგიკა, DOM და API-ებთან მუშაობა.",
  sp3:"კომპონენტები და სრულფასოვანი აპლიკაციები.", sp4:"AI ინსტრუმენტები და ფინალური პროექტი.",
  sd_fmt:"სწავლის ფორმატები", fm1:"ონლაინ", fm2:"აუდიტორიაში", fm3:"შერეული",
  faq_t:"ხშირად დასმული კითხვები",
  fq1:"მჭირდება თუ არა წინასწარი გამოცდილება?", fa1:"არა, დამწყებთა კურსები ნულიდან იწყება.",
  fq2:"რამდენ ხანს გრძელდება სწავლა?", fa2:"კურსის მიხედვით 6-დან 12 კვირამდე.",
  fq3:"მივიღებ თუ არა სერტიფიკატს?", fa3:"დიახ, წარმატებით დასრულების შემდეგ VIDYATON-ის სერტიფიკატს მიიღებ.",

  rg_t:"რეგისტრაცია", rg_lead:"შეავსე ფორმა და ჩვენ დაგიკავშირდებით.",
  rg_fn:"სახელი", rg_ln:"გვარი", rg_em:"ელფოსტა", rg_ph:"ტელეფონი",
  rg_co:"აირჩიე კურსი", rg_lv:"გამოცდილების დონე", rg_msg:"შეტყობინება (არასავალდებულო)",
  rg_btn:"გაგზავნა", rg_ok_t:"მადლობა!", rg_ok_p:"რეგისტრაცია მიღებულია. მალე დაგიკავშირდებით.",
  rg_sel:"აირჩიე...",

  nav_vac:"ვაკანსიები", nav_vac_s:"ღია პოზიციები",
  nav_news:"სიახლეები", nav_news_s:"უახლესი ამბები",
  nav_ann:"განცხადებები", nav_ann_s:"თარიღები და ცვლილებები",
  nav_contact:"კონტაქტი", nav_contact_s:"დაგვიკავშირდი",
  nav_home_s:"VIDYATON-ის პროგრამირების აკადემია",
  gm_t:"ითამაშე სწრაფი თამაში", gm_s:"გაატარე ჩიტი 5 დაბრკოლებაზე და გახსენი სიურპრიზი.", gm_sc:"ქულა", gm_h:"შეხება · დაწკაპუნება · Space", gm_r:"თავიდან",
  nav_login:"შესვლა", nav_login_s:"სტუდენტი, მშობელი, ადმინისტრატორი",
  portal_t:"აირჩიე შენი პორტალი", portal_s:"შედი როგორც სტუდენტი, მშობელი ან ადმინისტრატორი.",
  pt_student:"სტუდენტი", pt_student_p:"კურსები, შეფასებები, დავალებები და მიღწევები.", pt_parent:"მშობელი", pt_parent_p:"შვილის პროგრესი, დასწრება და გადახდები.", pt_admin:"ადმინისტრატორი", pt_admin_p:"მომხმარებლები და აკადემიის მართვა.",
  menu_t:"ნავიგაცია",

  sr_t:"ძიება", sr_lead:"მოძებნე კურსები, სიახლეები და სხვა.", sr_pop:"პოპულარული:", sr_count:"შედეგი",

  ct_t:"კონტაქტი", ct_lead:"მოგვწერე ან ეწვიე ჩვენს აკადემიას.",
  ct_addr:"მისამართი", ct_addr_v:"აკადემიის ქუჩა 1",
  ct_hours:"სამუშაო საათები", ct_hours_v:"ორშაბათი–პარასკევი, 10:00–19:00",
  ct_msg:"შეტყობინება", ct_ok_p:"შენი შეტყობინება მივიღეთ. მალე გიპასუხებთ.",
  ct_send:"გაგზავნა",

  vc_t:"ვაკანსიები", vc_lead:"შემოუერთდი VIDYATON-ის გუნდს.",
  vc_how:"როგორ მივმართოთ", vc_how_p:"დააჭირე განაცხადის ღილაკს ან გამოგვიგზავნე შენი CV და მოკლე წერილი ელფოსტით.",
  cr_vac_p:"ღია პოზიციები იხილე ვაკანსიების გვერდზე.", cr_vac_b:"ვაკანსიების ნახვა",

  nw_lead:"ყველაფერი, რაც VIDYATON-ში ხდება.",
  n4_t:"სტუდენტთა პროექტების გამოფენა", n4_p:"ჩვენმა სტუდენტებმა საკუთარი ვებ-პროექტები წარადგინეს.",
  n5_t:"სასწავლო მასალების განახლება", n5_p:"კურსების მასალები უახლესი სტანდარტებით განახლდა.",
  n6_t:"მენტორების შეხვედრა", n6_p:"მენტორებმა ახალ სტუდენტებს გამოცდილება გაუზიარეს.",

  an_lead:"მნიშვნელოვანი თარიღები სტუდენტებისთვის.",
  a4_t:"გამოცდების განრიგი", a4_p:"ფინალური შეფასებები იანვარში იწყება.",
  a5_t:"სტიპენდიის პროგრამა", a5_p:"მიმდინარეობს განაცხადების მიღება სტიპენდიაზე.",

  view_all:"ყველას ნახვა", learn_more:"გაიგე მეტი ჩვენს შესახებ",
  ty_page:"გვერდი", ty_course:"კურსი", ty_job:"ვაკანსია", ty_news:"სიახლე", ty_ann:"განცხადება", ty_faq:"კითხვა"
};

/* [href, titleKey, titleEn, subKey, subEn] — Home is first and shown full-width */
const MENU = [
  ["index.html","nav_home","Home","nav_home_s","VIDYATON programming academy"],
  ["courses.html","nav_courses","Courses","nav_courses_s","Programs & tracks"],
  ["about.html","nav_about","More about this academy","nav_about_s","Our mission & team"],
  ["careers.html","nav_careers","Careers","nav_careers_s","Openings & outcomes"],
  ["study.html","nav_study","Study","nav_study_s","How we learn"],
  ["contact.html","nav_contact","Contact","nav_contact_s","Get in touch"],
  ["vacancies.html","nav_vac","Vacancies","nav_vac_s","Open positions"],
  ["news.html","nav_news","News","nav_news_s","Latest stories"],
  ["announcements.html","nav_ann","Announcements","nav_ann_s","Dates & changes"],
  ["login.html","nav_login","Log in","nav_login_s","Student, parent & administrator"]
];

/* search index: u=url, tk/te=title key/en, dk/de=description key/en, ty=type, kw=extra keywords */
const TY = {page:["ty_page","Page"], course:["ty_course","Course"], job:["ty_job","Vacancy"], news:["ty_news","News"], ann:["ty_ann","Announcement"], faq:["ty_faq","FAQ"]};
const S = (u,tk,te,dk,de,ty,kw="") => ({u,tk,te,dk,de,ty,kw});
const INDEX = [
  S("index.html","nav_home","Home","nav_home_s","VIDYATON programming academy","page","main start"),
  S("index.html#about","ab_t","More about this academy","ab_m_p","We give everyone the chance to learn programming with high quality, hands-on practice and real support.","page","mission values"),
  S("courses.html","","HTML","co_html","Learn the foundations of the web: tags, forms, SEO and accessibility.","course","web markup"),
  S("courses.html","","CSS","co_css","Flexbox, Grid, animations and modern design systems.","course","style design"),
  S("courses.html","","JavaScript","co_js","Variables, functions, the DOM, APIs and asynchronous programming.","course","js programming"),
  S("courses.html","","React","co_react","Components, hooks, state management and real-world applications.","course","frontend"),
  S("courses.html","","AI","co_ai","Machine learning fundamentals, prompting and building AI products.","course","artificial intelligence machine learning"),
  S("about.html","nav_about","More about this academy","ab_lead","VIDYATON — where knowledge turns into skill.","page","mission team values"),
  S("careers.html","nav_careers","Careers","cr_lead","Join our team or start a tech career with us.","page","jobs work"),
  S("vacancies.html","nav_vac","Vacancies","vc_lead","Join the VIDYATON team.","page","jobs positions openings"),
  S("vacancies.html","j1_t","JavaScript Mentor","jt_full","Full-time","job","mentor teacher"),
  S("vacancies.html","j2_t","AI Instructor","jt_part","Part-time","job","teacher"),
  S("vacancies.html","j3_t","Student Support Specialist","jt_full","Full-time","job","support help"),
  S("study.html","nav_study","Study","sd_lead","A step-by-step path from zero to professional.","page","timeline schedule learn"),
  S("study.html","fq1","Do I need prior experience?","fa1","No, beginner courses start from zero.","faq"),
  S("study.html","fq2","How long does it take?","fa2","From 6 to 12 weeks depending on the course.","faq","duration"),
  S("study.html","fq3","Will I get a certificate?","fa3","Yes, you receive a VIDYATON certificate after successful completion.","faq","diploma"),
  S("registration.html","nav_reg","Registration","rg_lead","Fill in the form and we will get back to you.","page","signup enroll apply"),
  S("contact.html","nav_contact","Contact","ct_lead","Write to us or visit our academy.","page","address phone email hours"),
  S("news.html","nav_news","News","nw_lead","Everything happening at VIDYATON.","page","stories"),
  S("news.html","n1_t","New AI lab opens","n1_p","Students can now work hands-on with neural networks in our new lab.","news"),
  S("news.html","n2_t","VIDYATON Hackathon 2026","n2_p","A 48-hour contest for the best projects, with great prizes to win.","news","competition"),
  S("news.html","n3_t","Partnerships with tech companies","n3_p","Graduates will now find internships more easily.","news","internship"),
  S("news.html","n4_t","Student projects showcase","n4_p","Our students presented their own web projects.","news"),
  S("news.html","n5_t","Learning materials updated","n5_p","Course materials were refreshed to the latest standards.","news"),
  S("news.html","n6_t","Mentors meetup","n6_p","Mentors shared their experience with new students.","news"),
  S("announcements.html","nav_ann","Announcements","an_lead","Important dates for students.","page","dates"),
  S("announcements.html","a1_t","New cohort registration opens","a1_p","Evening JavaScript & React group — seats are limited.","ann","november"),
  S("announcements.html","a2_t","Open Doors Day","a2_p","Meet the mentors and try a free lesson.","ann","november"),
  S("announcements.html","a5_t","Scholarship program","a5_p","Scholarship applications are now being accepted.","ann","november"),
  S("announcements.html","a3_t","Schedule change","a3_p","December classes move to a new classroom.","ann","december"),
  S("announcements.html","a4_t","Exam schedule","a4_p","Final assessments begin in January.","ann","january"),
  S("index.html#feedback","fb_t","Student information & feedback","fb_s","Useful information and what our students say.","page","students reviews portal")
];

let lang = "en";
try { lang = localStorage.getItem("vid_lang") || "en"; } catch(e){}
const T = (k, en) => (lang === "ka" && k && KA[k]) ? KA[k] : en;

function buildHeader(){
  const page = location.pathname.split("/").pop() || "index.html";
  const hdr = document.createElement("header");
  hdr.className = "site";
  hdr.innerHTML = `
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="VIDYATON — home" title="VIDYATON">
      <img src="logo.png" alt="VIDYATON logo" onerror="this.onerror=null;this.src='logo.svg'">
      <span>VIDYATON</span>
    </a>
    <div class="actions">
      <button class="btn" id="menuBtn" aria-haspopup="dialog"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span class="t" data-i18n="nav_menu">Menu</span></button>
      <button class="btn" id="langBtn"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg><span class="t" id="langTxt">ქართული</span></button>
      <a class="btn ${page==="search.html"?"on":""}" id="searchBtn" href="search.html"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><span class="t" data-i18n="nav_search">Search</span></a>
      <a class="btn primary" href="registration.html" data-i18n="nav_reg">Registration</a>
    </div>
  </div>`;
  document.body.prepend(hdr);

  /* the menu lives on <body>, not inside the header, so the blur covers the whole page */
  const ov = document.createElement("div");
  ov.className = "overlay"; ov.id = "menuOv";
  ov.innerHTML = `<div class="menu-panel" role="dialog" aria-modal="true">
    <div class="menu-top"><h3 data-i18n="menu_t">Navigate</h3><button class="close" data-close aria-label="Close">&times;</button></div>
    <nav class="menu-list">${MENU.map((p,i)=>`<a style="--i:${i}" class="${i===0?"wide ":""}${page===p[0]?"active":""}" href="${p[0]}"><span class="mi">${i===0?"⌂":String(i).padStart(2,"0")}</span><span><b data-i18n="${p[1]}">${p[2]}</b><small data-i18n="${p[3]}">${p[4]}</small></span></a>`).join("")}</nav>
  </div>`;
  document.body.appendChild(ov);

  const f = [MENU[1],MENU[2],MENU[3],MENU[4],MENU[5]];
  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="wrap"><div class="fgrid">
    <div><a class="brand" href="index.html" aria-label="VIDYATON — home"><img src="logo.png" alt="VIDYATON" onerror="this.onerror=null;this.src='logo.svg'" style="height:64px"></a>
    <p style="color:var(--muted);margin-top:12px" data-i18n="f_tag">Learn code. Build the future.</p></div>
    <div><h4 data-i18n="f_links">Quick links</h4>${f.map(p=>`<a href="${p[0]}" data-i18n="${p[1]}">${p[2]}</a>`).join("")}<a href="registration.html" data-i18n="nav_reg">Registration</a></div>
    <div><h4 data-i18n="f_contact">Contact</h4><a href="contact.html">hello@vidyaton.example</a><a href="contact.html">+000 000 000 000</a></div>
  </div><p class="copy">&copy; 2026 VIDYATON. <span data-i18n="f_rights">All rights reserved.</span></p></div>`;
  document.body.append(footer);
}

function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    if(el.dataset.en === undefined) el.dataset.en = el.textContent;
    el.textContent = T(el.dataset.i18n, el.dataset.en);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    if(el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute("placeholder");
    el.setAttribute("placeholder", T(el.dataset.i18nPh, el.dataset.enPh));
  });
  const lt = document.getElementById("langTxt");
  if(lt) lt.textContent = lang === "ka" ? "English" : "ქართული";
  renderSearch();
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function renderSearch(){
  const input = document.getElementById("sq");
  const box = document.getElementById("sres");
  if(!input || !box) return;
  const s = input.value.trim().toLowerCase();
  const count = document.getElementById("scount");
  if(!s){ box.innerHTML = ""; if(count) count.textContent = ""; return; }
  const hits = INDEX.filter(i => [i.te, i.de, i.kw, i.tk && KA[i.tk], i.dk && KA[i.dk]].filter(Boolean).join(" ").toLowerCase().includes(s));
  if(count) count.textContent = hits.length ? hits.length + " " + T("sr_count","results") : "";
  box.innerHTML = hits.length
    ? hits.map(i => `<a href="${i.u}"><small>${esc(T(TY[i.ty][0], TY[i.ty][1]))}</small><h3>${esc(T(i.tk, i.te))}</h3><p>${esc(T(i.dk, i.de))}</p></a>`).join("")
    : `<p class="none">${esc(T("no_res","No results found"))}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();

  /* menu: blurred backdrop + panel */
  const menu = document.getElementById("menuOv");
  const openMenu = () => { menu.classList.add("open"); document.body.classList.add("noscroll"); };
  const closeMenu = () => { menu.classList.remove("open"); document.body.classList.remove("noscroll"); };
  document.getElementById("menuBtn").onclick = openMenu;
  menu.addEventListener("click", e => { if(e.target === menu || e.target.closest("[data-close]") || e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeMenu(); });

  document.getElementById("langBtn").onclick = () => {
    lang = lang === "en" ? "ka" : "en";
    try { localStorage.setItem("vid_lang", lang); } catch(e){}
    applyLang();
  };

  /* search page */
  const sq = document.getElementById("sq");
  if(sq){
    sq.value = new URLSearchParams(location.search).get("q") || "";
    sq.addEventListener("input", () => {
      try { history.replaceState(null, "", sq.value ? "?q=" + encodeURIComponent(sq.value) : location.pathname); } catch(e){}
      renderSearch();
    });
    document.querySelectorAll("[data-q]").forEach(c => c.onclick = () => { sq.value = c.dataset.q; sq.dispatchEvent(new Event("input")); sq.focus(); });
    sq.focus();
  }

  applyLang();

  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }}), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* forms: show a confirmation (no backend yet) */
  [["regForm","ok"],["contactForm","ok2"]].forEach(([fid, oid]) => {
    const form = document.getElementById(fid);
    if(!form) return;
    if(fid === "regForm"){
      const pre = new URLSearchParams(location.search).get("course");
      if(pre) form.course.value = pre;
    }
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.style.display = "none";
      document.getElementById(oid).classList.add("show");
      window.scrollTo({top:0,behavior:"smooth"});
    });
  });
});
