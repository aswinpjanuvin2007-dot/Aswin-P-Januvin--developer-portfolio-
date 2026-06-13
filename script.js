document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.querySelector('.projects-grid');
    const countDisplay = document.getElementById('count');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Fetch Dynamic Projects from projects.json
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Local projects.json not found or empty.");
            }
            return response.json();
        })
        .then(projects => {
            if (!projects || projects.length === 0) {
                initializeFiltering();
                return;
            }
            
            // Clear out static items to make room for live GitHub repos
            projectGrid.innerHTML = '';

            // Generate structural cards from your automation data
            projects.forEach(project => {
                // Safely check language fallback values
                const lang = project.language ? project.language.toLowerCase() : 'code';
                
                // Group them cleanly into your existing CSS filter categories (design, web, code)
                let category = 'code'; 
                if (lang === 'html' || lang === 'css' || lang === 'javascript') {
                    category = 'web';
                } else if (lang === 'figma' || lang === 'design') {
                    category = 'design';
                }

                const cardHTML = `
                    <a href="${project.html_url}" target="_blank" class="project-card" data-category="${category}">
                        <div class="project-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
                        <h3>${project.name}</h3>
                        <p class="category-tag">${project.language || 'Code'}</p>
                        <p>${project.description}</p>
                    </a>
                `;
                projectGrid.insertAdjacentHTML('beforeend', cardHTML);
            });

            // Re-initialize filtering logic once elements are fully rendered
            initializeFiltering();
        })
        .catch(error => {
            console.warn('Using existing layout or structural fallback:', error.message);
            initializeFiltering();
        });

    function initializeFiltering() {
        const projectCards = document.querySelectorAll('.project-card');
        if(countDisplay) countDisplay.textContent = projectCards.length;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                let visibleCount = 0;

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
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
                    if(countDisplay) countDisplay.textContent = visibleCount;
                }, 300);
            });
        });
    }
});
