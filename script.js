document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.querySelector('.projects-grid');
    const countDisplay = document.getElementById('count');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 1. Fetch Dynamic Projects from projects.json
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Local projects.json not found or empty.");
            }
            return response.json();
        })
        .then(projects => {
            if (projects.length === 0) return;
            
            // Clear out hardcoded template items to make room for your live GitHub repos
            projectGrid.innerHTML = '';

            // Generate structural cards from your automation data
            projects.forEach(project => {
                // Determine a clean category class based on language
                let category = 'code';
                if (project.language.toLowerCase() === 'html' || project.language.toLowerCase() === 'css') {
                    category = 'web';
                }

                const cardHTML = `
                    <a href="${project.html_url}" target="_blank" class="project-card" data-category="${category}">
                        <div class="project-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
                        <h3>${project.name}</h3>
                        <p class="category-tag">${project.language}</p>
                        <p>${project.description}</p>
                    </a>
                `;
                projectGrid.insertAdjacentHTML('beforeend', cardHTML);
            });

            // Re-initialize the setup and filtering logic once elements are rendered
            initializeFiltering();
        })
        .catch(error => {
            console.warn('Using existing static HTML layout because:', error.message);
            // Fallback to filtering hardcoded items if json load fails
            initializeFiltering();
        });

    // 2. Wrap your original filtering code into a reusable execution block
    function initializeFiltering() {
        const projectCards = document.querySelectorAll('.project-card');
        countDisplay.textContent = projectCards.length;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active navigation button visual state
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                let visibleCount = 0;

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    // Unified fade & toggle execution layout
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        if (filter === 'all' || category === filter) {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                            visibleCount++;
                            
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

                setTimeout(() => {
                    countDisplay.textContent = visibleCount;
                }, 300);
            });
        });
    }
});
