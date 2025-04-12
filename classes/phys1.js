document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to all unit headers
  document.querySelectorAll(".unit-header").forEach(header => {
    header.addEventListener("click", () => {
      toggleActive(header);
    });
  });

  // Add event listeners to all lesson headers
  document.querySelectorAll(".lesson-header").forEach(header => {
    header.addEventListener("click", () => {
      toggleActive(header);
    });
  });
});

function toggleActive(element) {
  const content = element.nextElementSibling;
  const parent = element.parentElement;
  const siblings = Array.from(parent.parentElement.children).filter(el => el !== parent);

  // Collapse all sibling content areas
  siblings.forEach(sibling => {
    const arrow = sibling.querySelector('.arrow');
    const sibContent = sibling.querySelector('.unit-content, .lesson-content');
    if (arrow) arrow.textContent = '▼';
    if (sibContent) sibContent.style.display = 'none';
  });

  // Toggle selected content
  if (content.style.display === 'block') {
    content.style.display = 'none';
    const arrow = element.querySelector('.arrow');
    if (arrow) arrow.textContent = '▼';
  } else {
    content.style.display = 'block';
    const arrow = element.querySelector('.arrow');
    if (arrow) arrow.textContent = '▲';
  }
}
