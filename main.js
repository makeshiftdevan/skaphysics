
// Toggle Class Card (only one open at a time)
document.querySelectorAll('.class-header').forEach(header => {
    header.addEventListener('click', () => {
        document.querySelectorAll('.class-card').forEach(card => {
            if (card !== header.parentElement) card.classList.remove('active');
        });
        header.parentElement.classList.toggle('active');
    });
});

// Toggle Unit Inside a Class (only one open per class)
document.querySelectorAll('.unit-header').forEach(unitHeader => {
    unitHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        const unitItem = unitHeader.parentElement;
        const unitsList = unitItem.parentElement;

        unitsList.querySelectorAll('.unit-item').forEach(item => {
            if (item !== unitItem) item.classList.remove('active');
        });

        unitItem.classList.toggle('active');
    });
});
