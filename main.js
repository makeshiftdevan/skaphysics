/* Skaphysics — shared interactivity */

document.addEventListener("DOMContentLoaded", () => {
  initToggles();
  initSearch();
  initCardCursor();
  initNavActive();
});

/* Expand/collapse for units and lessons via .is-open class
   (CSS uses grid-template-rows 0fr → 1fr for smooth height transition) */
function initToggles() {
  document.querySelectorAll(".unit-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".unit")?.classList.toggle("is-open");
    });
  });
  document.querySelectorAll(".lesson-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".lesson")?.classList.toggle("is-open");
    });
  });
}

/* Live search across units & lessons */
function initSearch() {
  const input = document.querySelector("[data-search]");
  const meta = document.querySelector("[data-results]");
  const expandBtn = document.querySelector("[data-expand-all]");
  const collapseBtn = document.querySelector("[data-collapse-all]");
  if (!input) return;

  const units = Array.from(document.querySelectorAll(".unit"));

  function applyFilter(q) {
    const query = q.trim().toLowerCase();
    let lessonMatches = 0;

    units.forEach(unit => {
      const lessons = unit.querySelectorAll(".lesson");
      let unitHasMatch = false;

      lessons.forEach(lesson => {
        const title = lesson.querySelector(".lesson-title")?.textContent.toLowerCase() || "";
        const assignments = Array.from(lesson.querySelectorAll(".assignments a"))
          .map(a => a.textContent.toLowerCase()).join(" ");
        const haystack = title + " " + assignments;
        const match = !query || haystack.includes(query);
        lesson.classList.toggle("is-hidden", !match);
        if (match) { unitHasMatch = true; lessonMatches++; }
      });

      const unitTitle = unit.querySelector(".unit-title")?.textContent.toLowerCase() || "";
      const unitMatch = !query || unitTitle.includes(query) || unitHasMatch;
      unit.classList.toggle("is-hidden", !unitMatch);

      if (query && unitHasMatch) {
        unit.classList.add("is-open");
        unit.querySelectorAll(".lesson:not(.is-hidden)").forEach(l => l.classList.add("is-open"));
      }
    });

    if (meta) {
      meta.textContent = query
        ? `${lessonMatches} lesson${lessonMatches === 1 ? "" : "s"} match "${q}"`
        : `${units.length} units · ${document.querySelectorAll(".lesson").length} lessons`;
    }
  }

  input.addEventListener("input", e => applyFilter(e.target.value));
  applyFilter("");

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === "Escape" && document.activeElement === input) {
      input.value = "";
      applyFilter("");
      input.blur();
    }
  });

  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll(".unit:not(.is-hidden)").forEach(u => u.classList.add("is-open"));
      document.querySelectorAll(".lesson:not(.is-hidden)").forEach(l => l.classList.add("is-open"));
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll(".unit, .lesson").forEach(el => el.classList.remove("is-open"));
    });
  }
}

/* Cursor-following glow on class cards */
function initCardCursor() {
  document.querySelectorAll(".class-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
}

/* Mark current nav link active based on URL path */
function initNavActive() {
  const here = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const targetName = href.split("/").pop();
    const hereName = here.split("/").pop() || "index.html";
    if (targetName === hereName) link.classList.add("is-active");
  });
}
