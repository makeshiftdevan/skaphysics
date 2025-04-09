// === Toggle Class Card (only one open at a time) ===
document.querySelectorAll('.class-header').forEach(header => {
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');

  header.addEventListener('click', () => {
    const parentCard = header.parentElement;

    // Close all other cards
    document.querySelectorAll('.class-card').forEach(card => {
      if (card !== parentCard) {
        card.classList.remove('active');
        card.querySelector('.class-header').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle clicked one
    parentCard.classList.toggle('active');
    const expanded = parentCard.classList.contains('active');
    header.setAttribute('aria-expanded', expanded);
  });

  // Allow Enter/Space to toggle
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// === Toggle Units (one open per class) ===
document.querySelectorAll('.units-list').forEach(unitsList => {
  const unitHeaders = unitsList.querySelectorAll('.unit-header');

  unitHeaders.forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', e => {
      e.stopPropagation();
      const unitItem = header.parentElement;

      // Close other units in the same class
      unitsList.querySelectorAll('.unit-item').forEach(item => {
        if (item !== unitItem) {
          item.classList.remove('active');
          item.querySelector('.unit-header').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked one
      unitItem.classList.toggle('active');
      const expanded = unitItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    // Allow Enter/Space to toggle
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
});
