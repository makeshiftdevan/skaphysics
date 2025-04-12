
// Expand/collapse units and lessons on click
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".unit-toggle").forEach(unit => {
    unit.addEventListener("click", () => {
      unit.nextElementSibling.classList.toggle("hidden");
    });
  });

  document.querySelectorAll(".lesson-toggle").forEach(lesson => {
    lesson.addEventListener("click", () => {
      lesson.nextElementSibling.classList.toggle("hidden");
    });
  });
});
