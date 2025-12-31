// Load JSON data and render modules
async function loadModules() {
    try {
        const response = await fetch('data.json');
        const modules = await response.json();
        renderModules(modules);
        setupFilters(modules);
    } catch (error) {
        console.error('Error loading modules:', error);
    }
}

// Render modules in the DOM
function renderModules(modules) {
    const container = document.getElementById('modules-container');
    container.innerHTML = ''; // Clear previous content
    modules.forEach(module => {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.innerHTML = `
            <h3>${module.title}</h3>
            <p><strong>Category:</strong> ${module.category}</p>
            <p>${module.description}</p>
            <button class="enroll-btn" data-id="${module.id}">Enroll</button>
        `;
        container.appendChild(card);
    });

    // Add event listeners for enroll buttons
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const moduleId = e.target.getAttribute('data-id');
            alert(`Enrolled in module ID: ${moduleId}!`); // Example functionality
        });
    });
}

// Setup filter buttons
function setupFilters(modules) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            const filteredModules = category === 'all' ? modules : modules.filter(m => m.category === category);
            renderModules(filteredModules);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadModules);