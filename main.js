// Skaphysics - Main JavaScript Functions

// Create floating particles for physics effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numParticles = 30;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const speed = Math.random() * 15 + 5;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.animationDuration = `${speed}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Toggle class card opening/closing
function setupClassCards() {
    const classCards = document.querySelectorAll('.class-card');

    classCards.forEach(card => {
        const header = card.querySelector('.class-header');

        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');

            // Remove 'active' from all cards
            classCards.forEach(c => c.classList.remove('active'));

            // Only toggle the clicked one if it wasn't already active
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
}

// Toggle unit opening/closing
function setupUnitItems() {
    const unitItems = document.querySelectorAll('.unit-item');

    unitItems.forEach(item => {
        const header = item.querySelector('.unit-header');

        header.addEventListener('click', (e) => {
            e.stopPropagation();

            const parentList = item.closest('.units-list');
            const siblingItems = parentList.querySelectorAll('.unit-item');

            const isActive = item.classList.contains('active');

            // Collapse all sibling units
            siblingItems.forEach(siblingItem => {
                siblingItem.classList.remove('active');
            });

            // Only activate if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupClassCards();
    setupUnitItems();
});

