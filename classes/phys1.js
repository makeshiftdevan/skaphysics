
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".unit-toggle").forEach(unitToggle => {
    unitToggle.addEventListener("click", () => {
      const lessonSection = unitToggle.nextElementSibling;
      if (lessonSection) {
        lessonSection.classList.toggle("hidden");
      }
    });
  });

  document.querySelectorAll(".lesson-toggle").forEach(lessonToggle => {
    lessonToggle.addEventListener("click", () => {
      const assignmentList = lessonToggle.nextElementSibling;
      if (assignmentList) {
        assignmentList.classList.toggle("hidden");
      }
    });
  });
});
