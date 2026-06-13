// Filter functionality for projects
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const countDisplay = document.getElementById('count');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with fade transition
            let visibleCount = 0;

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Skip anchor tags from filter animations
                if (card.tagName === 'A') {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                    return;
                }
                
                // Start fade out
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                        visibleCount++;
                        
                        // Fade in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                }, 300);
            });

            // Update project count with delay
            setTimeout(() => {
                countDisplay.textContent = visibleCount;
            }, 300);
        });
    });

    // Initialize project count
    countDisplay.textContent = projectCards.length;
});
    countDisplay.textContent = projectCards.length;
});
