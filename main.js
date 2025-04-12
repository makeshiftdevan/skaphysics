function toggleActive(element) {
  const parent = element.parentElement;
  const isActive = parent.classList.contains('active');

  Array.from(parent.parentElement.children).forEach(child => {
    if (child !== parent) {
      child.classList.remove('active');
    }
  });
  

  parent.classList.toggle('active', !isActive);
}

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
