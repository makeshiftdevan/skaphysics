/* Skaphysics main.js */
document.addEventListener("DOMContentLoaded", () => {
  markNavActive();
  initUnitToggles();
  initSearch();
  init3DTilt();
  initEquationLayer();
});

/* ---------- Nav active state ---------- */
function markNavActive() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(a => {
    if ((a.getAttribute("href") || "").split("/").pop() === here)
      a.classList.add("active");
  });
}

/* ---------- Unit accordion ---------- */
function initUnitToggles() {
  document.querySelectorAll(".unit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".unit").classList.toggle("is-open");
    });
  });

  const expandAll  = document.querySelector("[data-expand]");
  const collapseAll = document.querySelector("[data-collapse]");
  if (expandAll)   expandAll.addEventListener("click",  () => document.querySelectorAll(".unit").forEach(u => u.classList.add("is-open")));
  if (collapseAll) collapseAll.addEventListener("click", () => document.querySelectorAll(".unit").forEach(u => u.classList.remove("is-open")));
}

/* ---------- Live search ---------- */
function initSearch() {
  const input = document.querySelector("[data-search]");
  const label = document.querySelector("[data-results]");
  if (!input) return;

  const units = [...document.querySelectorAll(".unit")];
  const totalChips = document.querySelectorAll(".chip").length;

  function filter(q) {
    const lq = q.toLowerCase().trim();
    let visible = 0;

    units.forEach(unit => {
      const chips = [...unit.querySelectorAll(".chip")];
      let anyMatch = false;
      chips.forEach(chip => {
        const match = !lq || chip.textContent.toLowerCase().includes(lq);
        chip.classList.toggle("is-hidden", !match);
        if (match) { anyMatch = true; visible++; }
      });

      // Also match unit title
      const titleMatch = !lq || unit.querySelector(".unit-label")?.textContent.toLowerCase().includes(lq);
      unit.classList.toggle("is-hidden", !(anyMatch || titleMatch));
      if (lq && (anyMatch || titleMatch)) unit.classList.add("is-open");

      // Show rtype-groups that have visible chips
      unit.querySelectorAll(".rtype-group").forEach(g => {
        const hasVisible = [...g.querySelectorAll(".chip")].some(c => !c.classList.contains("is-hidden"));
        g.classList.toggle("is-hidden", lq && !hasVisible);
      });
    });

    if (label) {
      label.textContent = lq
        ? `${visible} resource${visible === 1 ? "" : "s"} matching "${q}"`
        : `${units.length} units · ${totalChips} resources`;
    }
  }

  input.addEventListener("input", e => filter(e.target.value));
  filter(""); // initialize count

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input && !e.metaKey && !e.ctrlKey) {
      e.preventDefault(); input.focus();
    }
    if (e.key === "Escape" && document.activeElement === input) {
      input.value = ""; filter(""); input.blur();
    }
  });
}

/* ---------- 3D card tilt ---------- */
function init3DTilt() {
  const MAX_TILT = 10; // degrees

  document.querySelectorAll(".class-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const rect = card.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const xPct = (cx / rect.width  - 0.5) * 2;  // -1 to 1
      const yPct = (cy / rect.height - 0.5) * 2;

      card.style.setProperty("--rx", `${-yPct * MAX_TILT}deg`);
      card.style.setProperty("--ry", `${xPct  * MAX_TILT}deg`);
      card.style.setProperty("--cx", `${cx}px`);
      card.style.setProperty("--cy", `${cy}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* ---------- Floating equation layer ---------- */
const EQUATIONS = [
  "F = ma", "p = mv", "W = Fd", "v = v₀ + at",
  "x = v₀t + ½at²", "E = mc²", "F = kq₁q₂/r²",
  "∇ × E = −∂B/∂t", "ΔP = FΔt", "τ = Iα",
  "∮E·dA = Q/ε₀", "E = ½mv²", "T = 2π√(m/k)",
  "F = −kx", "L = Iω", "v² = v₀² + 2aΔx",
  "∇·B = 0", "F = qv × B", "P = W/t",
  "a_c = v²/r",
];

function initEquationLayer() {
  const layer = document.querySelector(".eq-layer");
  if (!layer) return;

  function spawnEq() {
    const el = document.createElement("span");
    el.className = "eq";
    el.textContent = EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];

    const size = 14 + Math.random() * 22;
    const x = Math.random() * 92;
    const y = 30 + Math.random() * 60;
    const dur = 28 + Math.random() * 40;
    const rot = (Math.random() - 0.5) * 10;
    const delay = Math.random() * -dur;

    el.style.cssText = `
      font-size: ${size}px;
      left: ${x}%;
      top: ${y}%;
      --r: ${rot}deg;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    layer.appendChild(el);

    // Remove after 3 cycles to avoid DOM bloat
    setTimeout(() => el.remove(), (dur * 3 + Math.abs(delay)) * 1000);
  }

  // Seed a bunch immediately
  for (let i = 0; i < 18; i++) spawnEq();
  // Then trickle
  setInterval(spawnEq, 3500);
}
