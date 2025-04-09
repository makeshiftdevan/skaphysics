
// === Toggle Class Card (only one open at a time) ===
document.querySelectorAll('.class-header').forEach(header => {
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');

  header.addEventListener('click', () => {
    const parentCard = header.parentElement;

    document.querySelectorAll('.class-card').forEach(card => {
      if (card !== parentCard) {
        card.classList.remove('active');
        card.querySelector('.class-header').setAttribute('aria-expanded', 'false');
      }
    });

    parentCard.classList.toggle('active');
    const expanded = parentCard.classList.contains('active');
    header.setAttribute('aria-expanded', expanded);
  });

  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// === Toggle Units (only one open per class) ===
document.querySelectorAll('.units-list').forEach(unitsList => {
  const unitHeaders = unitsList.querySelectorAll('.unit-header');

  unitHeaders.forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', e => {
      e.stopPropagation();
      const unitItem = header.parentElement;

      unitsList.querySelectorAll('.unit-item').forEach(item => {
        if (item !== unitItem) {
          item.classList.remove('active');
          item.querySelector('.unit-header').setAttribute('aria-expanded', 'false');
        }
      });

      unitItem.classList.toggle('active');
      const expanded = unitItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
});

// === Toggle Lessons (only one open per unit) ===
document.querySelectorAll('.unit-content').forEach(unitContent => {
  const lessonHeaders = unitContent.querySelectorAll('.lesson-header');

  lessonHeaders.forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', e => {
      e.stopPropagation();
      const lessonItem = header.parentElement;

      unitContent.querySelectorAll('.lesson-item').forEach(item => {
        if (item !== lessonItem) {
          item.classList.remove('active');
          const h = item.querySelector('.lesson-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });

      lessonItem.classList.toggle('active');
      const expanded = lessonItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
});
