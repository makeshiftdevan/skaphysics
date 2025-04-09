// Toggle Class Card (only one open at a time)
document.querySelectorAll('.class-header').forEach(header => {
  header.addEventListener('click', () => {
    document.querySelectorAll('.class-card').forEach(card => {
      if (card !== header.parentElement) {
        card.classList.remove('active');
      }
    });
    header.parentElement.classList.toggle('active');
  });
});

// Toggle Units Inside Each Class (only one open per class)
document.querySelectorAll('.units-list').forEach(unitsList => {
  const unitHeaders = unitsList.querySelectorAll('.unit-header');
  unitHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const unitItem = header.parentElement;

      unitsList.querySelectorAll('.unit-item').forEach(item => {
        if (item !== unitItem) {
          item.classList.remove('active');
        }
      });

      unitItem.classList.toggle('active');
    });
  });
});
