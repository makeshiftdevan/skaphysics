document.addEventListener("DOMContentLoaded", () => {
  // Toggle lesson containers
  document.querySelectorAll(".unit-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const lessons = toggle.nextElementSibling;
      if (lessons && lessons.classList.contains("lessons")) {
        lessons.classList.toggle("hidden");
      }
    });
  });

  // Toggle assignment containers
  document.querySelectorAll(".lesson-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const assignments = toggle.nextElementSibling;
      if (assignments && assignments.classList.contains("assignments")) {
        assignments.classList.toggle("hidden");
      }
    });
  });
});
