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
