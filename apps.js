
(() => {
  // ---------- helpers ----------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

  // ---------- Reveal on scroll ----------
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ---------- Read progress bar ----------
  const prog = $("#readProgress");
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    prog.style.width = `${pct}%`;

    // scroll to top button
    const btn = $("#toTop");
    if (scrollTop > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Tooltips ----------
  $$('#mainNav [data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  const copyTip = $("#copyEmailBtn");
  if (copyTip) new bootstrap.Tooltip(copyTip);

  // ---------- Typewriter ----------
  const typeTarget = $("#typeLine");
  const lines = [
    "Building clean, reliable software solutions.",
    "Strong in Python, Java, C++ and web development.",
    "Experience with agile teamwork & code quality.",
    "Passionate about business + technology."
  ];
  let li = 0, ci = 0, deleting = false;

  function typeTick(){
    if(!typeTarget) return;
    const current = lines[li];
    if(!deleting){
      ci++;
      typeTarget.textContent = current.slice(0, ci);
      if(ci === current.length){
        deleting = true;
        setTimeout(typeTick, 1100);
        return;
      }
    } else {
      ci--;
      typeTarget.textContent = current.slice(0, ci);
      if(ci === 0){
        deleting = false;
        li = (li + 1) % lines.length;
      }
    }
    setTimeout(typeTick, deleting ? 35 : 45);
  }
  typeTick();

  // ---------- Live highlight rotation ----------
  const highlight = $("#liveHighlight");
  const highlights = [
    "3rd place: TU Dublin President’s Sustainability Hackathon (Workday).",
    "Internship: Software Developer Intern at Mastercard (6 months, 2024).",
    "Project: Vigilante Hideout Django Website (team-built).",
    "Strong mix of tech + communication + UX awareness."
  ];
  let h = 0;
  const rotateHighlight = () => {
    if(!highlight) return;
    highlight.textContent = highlights[h];
    h = (h + 1) % highlights.length;
  };
  rotateHighlight();
  setInterval(rotateHighlight, 4500);

  // ---------- Counters ----------
  const counterEls = $$(".stat-num[data-count]");
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      let current = 0;
      const steps = 40;
      const inc = Math.max(1, Math.round(target / steps));
      const timer = setInterval(() => {
        current += inc;
        if(current >= target){
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 25);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.35 });
  counterEls.forEach(el => counterIO.observe(el));

  // ---------- Skills progress animation ----------
  const skillBars = $$(".progress-bar[data-skill]");
  const skillsIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const bar = e.target;
      bar.style.width = `${bar.dataset.skill}%`;
      skillsIO.unobserve(bar);
    });
  }, { threshold: 0.4 });
  skillBars.forEach(b => skillsIO.observe(b));

  // ---------- Modules data + filter + average ----------
  const modules = [
    // Year 1
    { name:"Software Development 1", year:1, grade:"B", note:"Programming foundations" },
    { name:"Discrete Mathematics 1", year:1, grade:"B+", note:"Logic + problem solving" },
    { name:"Visual Design and User Experience", year:1, grade:"B", note:"UI/UX principles" },
    { name:"Critical Skills Development", year:1, grade:"B-", note:"Professional skills" },
    { name:"Computer Architecture", year:1, grade:"B-", note:"Hardware fundamentals" },
    { name:"Business & Information Systems", year:1, grade:"B+", note:"Business context" },
    { name:"Software Development 2", year:1, grade:"C", note:"Further programming" },
    { name:"Systems Analysis", year:1, grade:"B+", note:"Requirements + analysis" },
    { name:"Database Fundamentals", year:1, grade:"C+", note:"SQL basics" },
    { name:"Statistics", year:1, grade:"B+", note:"Data fundamentals" },
    { name:"Operating Systems Fundamentals", year:1, grade:"C", note:"OS basics" },
    { name:"Social Media Communications", year:1, grade:"C", note:"Comms" },

    // Year 2
    { name:"Software Development 3", year:2, grade:"A", note:"Higher-level development" },
    { name:"Software Quality Assurance and Testing", year:2, grade:"B", note:"Testing + QA" },
    { name:"Advanced Database Technologies", year:2, grade:"A", note:"DB depth" },
    { name:"Network Fundamentals", year:2, grade:"B+", note:"Networking" },
    { name:"Client-Side Web Development", year:2, grade:"B+", note:"Front-end" },
    { name:"Discrete Mathematics 2", year:2, grade:"B+", note:"Math/logic" },
    { name:"Software Development 4", year:2, grade:"B+", note:"OOP/advanced" },
    { name:"Project", year:2, grade:"B", note:"Team delivery" },
    { name:"Data Administration and Analysis", year:2, grade:"B", note:"Data handling" },
    { name:"Routing & Switching Essentials", year:2, grade:"B+", note:"Networking practice" },
    { name:"Information Security", year:2, grade:"B", note:"Security basics" },
    { name:"Management Science", year:2, grade:"B+", note:"Management context" },

    // Year 3 (grades not all visible in PDF; keep notes + allow blanks)
    { name:"Cloud Services and Distributed Computing", year:3, grade:"B", note:"Cloud systems" },
    { name:"Data Structures and Algorithms", year:3, grade:"A", note:"Core CS" },
    { name:"Server-Side Web Development", year:3, grade:"B+", note:"Backend concepts" },
    { name:"Big Data Technologies", year:3, grade:"B+", note:"Big data tools" },
    { name:"Operating Systems", year:3, grade:"B+", note:"OS advanced" },
    { name:"Work Placement", year:3, grade:"—", note:"Mastercard internship" },
    { name:"Data Analysis", year:3, grade:"B+", note:"Analytics" },
  ];

  const gradeMap = { "A":4.0, "B+":3.5, "B":3.0, "B-":2.7, "C+":2.3, "C":2.0 };
  const tbody = $("#modulesTbody");
  const countBadge = $("#moduleCount");
  const yearFilter = $("#yearFilter");
  const gpaOut = $("#gpaOut");
  const gpaHint = $("#gpaHint");

  function renderModules(filter="all"){
    if(!tbody) return;
    tbody.innerHTML = "";
    const filtered = modules.filter(m => filter === "all" ? true : m.year === Number(filter));
    filtered.forEach(m => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${m.name}</td>
        <td>Year ${m.year}</td>
        <td><span class="badge ${m.grade==="A" ? "text-bg-success" : "text-bg-secondary"}">${m.grade}</span></td>
        <td class="text-secondary">${m.note}</td>
      `;
      tbody.appendChild(tr);
    });
    if(countBadge) countBadge.textContent = `${filtered.length} modules`;
  }
  renderModules("all");

  yearFilter?.addEventListener("change", (e) => {
    renderModules(e.target.value);
    gpaOut.textContent = "—";
    gpaHint.textContent = "Click “Estimate Avg”.";
  });

  $("#calcGpaBtn")?.addEventListener("click", () => {
    const filter = yearFilter?.value || "all";
    const filtered = modules.filter(m => filter === "all" ? true : m.year === Number(filter));
    const numeric = filtered
      .map(m => gradeMap[m.grade])
      .filter(v => typeof v === "number");

    if(numeric.length === 0){
      gpaOut.textContent = "—";
      gpaHint.textContent = "No numeric grades in this filter.";
      return;
    }

    const avg = numeric.reduce((a,b)=>a+b,0) / numeric.length;
    gpaOut.textContent = avg.toFixed(2);
    gpaHint.textContent = `Based on ${numeric.length} graded modules (A=4.0, B+=3.5, etc).`;
  });

  // ---------- Projects data + search + modal ----------
  const projects = [
    {
      title: "Vigilante Hideout (Django Website)",
      year: "2022",
      desc: "Team of four built a Django site for comic fans. Designed a user-focused class diagram, implemented login, product browsing, cart, and purchase flow. Solved unclear objectives with regular team meetings.",
      tags: ["Django", "Teamwork", "Auth", "E-commerce", "UML"]
    },
    {
      title: "Sustainability Hackathon Prototype",
      year: "2023",
      desc: "Built a sustainability-focused prototype and placed 3rd in TU Dublin President’s Sustainability Hackathon (Workday).",
      tags: ["Hackathon", "Prototype", "Pitching", "UX"]
    },
    {
      title: "AWS + Tallaght University Hospital Hackathon",
      year: "2023",
      desc: "Participated in a hackathon environment using structured collaboration and rapid iteration.",
      tags: ["Hackathon", "Cloud", "Teamwork"]
    },
    {
      title: "Final Year Capstone (In Progress)",
      year: "2024",
      desc: "Final year project currently in progress. Focus on a clean, professional UX and strong engineering process.",
      tags: ["Capstone", "UX", "Engineering"]
    }
  ];

  const grid = $("#projectGrid");
  const pModal = new bootstrap.Modal($("#projectModal"));
  function renderProjects(list){
    if(!grid) return;
    grid.innerHTML = "";
    list.forEach((p, idx) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3";
      col.innerHTML = `
        <button class="project-card glass p-4 h-100 w-100 text-start reveal" data-idx="${idx}" type="button">
          <div class="d-flex justify-content-between align-items-start gap-2">
            <div class="h5 mb-1">${p.title}</div>
            <span class="badge text-bg-info">${p.year}</span>
          </div>
          <div class="text-secondary small mt-2 clamp-3">${p.desc}</div>
          <div class="d-flex flex-wrap gap-2 mt-3">
            ${p.tags.slice(0,3).map(t => `<span class="badge text-bg-secondary">${t}</span>`).join("")}
          </div>
          <div class="mt-3 small text-info">Click for details →</div>
        </button>
      `;
      grid.appendChild(col);
    });

    // Re-observe reveal items for injected content
    $$(".project-card.reveal", grid).forEach(el => io.observe(el));
  }
  renderProjects(projects);

  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-card");
    if(!btn) return;
    const idx = Number(btn.dataset.idx);
    const p = projects[idx];
    $("#projectModalTitle").textContent = `${p.title} • ${p.year}`;
    $("#projectModalDesc").textContent = p.desc;

    const tags = $("#projectModalTags");
    tags.innerHTML = p.tags.map(t => `<span class="badge text-bg-secondary">${t}</span>`).join("");
    pModal.show();
  });

  const search = $("#projectSearch");
  const reset = $("#resetProjectSearch");
  function applyProjectSearch(){
    const q = (search?.value || "").trim().toLowerCase();
    if(!q) { renderProjects(projects); return; }
    const filtered = projects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
    renderProjects(filtered);
  }
  search?.addEventListener("input", applyProjectSearch);
  reset?.addEventListener("click", () => { search.value=""; renderProjects(projects); });

  // Clamp helper (CSS-like) for project text
  const style = document.createElement("style");
  style.textContent = `.clamp-3{ display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; } .project-card{ border:none; background:rgba(255,255,255,.06); transition: transform .35s ease, box-shadow .35s ease; } .project-card:hover{ transform: translateY(-6px); box-shadow: 0 18px 60px rgba(0,0,0,.45); }`;
  document.head.appendChild(style);

  // ---------- Contact form validation + alert ----------
  const form = $("#contactForm");
  const alertBox = $("#formAlert");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!form.checkValidity()){
      form.classList.add("was-validated");
      return;
    }
    form.classList.add("was-validated");
    alertBox.classList.remove("d-none");
    setTimeout(() => alertBox.classList.add("d-none"), 5000);
  });

  // ---------- Toast ----------
  const toast = new bootstrap.Toast($("#helloToast"));
  $("#toastBtn")?.addEventListener("click", () => toast.show());

  // Quick message -> toast
  $("#sendQuickMsg")?.addEventListener("click", () => {
    const v = ($("#quickMsg")?.value || "").trim();
    $("#helloToast .toast-body").textContent =
      v ? `Quick message received (demo): "${v}"` : "Quick message sent (demo).";
    toast.show();
  });

  // ---------- Copy email ----------
  $("#copyEmailBtn")?.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText("dargajova@outlook.com");
      $("#helloToast .toast-body").textContent = "Email copied to clipboard: dargajova@outlook.com";
      toast.show();
    }catch{
      $("#helloToast .toast-body").textContent = "Copy failed (browser permission). Email: dargajova@outlook.com";
      toast.show();
    }
  });

  // ---------- Scroll to top ----------
  $("#toTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Year ----------
  $("#yearNow").textContent = new Date().getFullYear();

  // ---------- Profile strength (based on sections visited) ----------
  const sections = ["about","education","projects","experience","skills","hobbies","contact"].map(id => $("#"+id));
  const visited = new Set();
  const bar = $("#profileBar");
  const score = $("#profileScore");

  const secIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      visited.add(e.target.id);
      const pct = Math.round((visited.size / sections.length) * 100);
      bar.style.width = `${pct}%`;
      score.textContent = `${pct}%`;
    });
  }, { threshold: 0.35 });

  sections.forEach(s => s && secIO.observe(s));

})();
