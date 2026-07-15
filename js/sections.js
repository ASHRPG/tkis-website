/**
 * Section Loader - Dynamically loads all modular section HTML files
 */

const sections = [
    { id: 'section-topbar', file: 'sections/topbar.html' },
    { id: 'section-hero', file: 'sections/hero.html' },
    { id: 'section-about', file: 'sections/about.html' },
    { id: 'section-grades', file: 'sections/grades.html' },
    { id: 'section-features', file: 'sections/features.html' },
    { id: 'section-unique', file: 'sections/unique.html' },
    { id: 'section-houses', file: 'sections/houses.html' },
    { id: 'section-achievers', file: 'sections/achievers.html' },
    { id: 'section-academics', file: 'sections/academics.html' },
    { id: 'section-gallery', file: 'sections/gallery.html' },
    { id: 'section-blog', file: 'sections/blog.html' },
    { id: 'section-partners', file: 'sections/partners.html' },
    { id: 'section-footer', file: 'sections/footer.html' },
    { id: 'chatbot-widget', file: 'sections/chatbot.html' }
];

let loadedCount = 0;

async function loadSections() {
    const promises = sections.map(async ({ id, file }) => {
        const container = document.getElementById(id);
        if (!container) return;
        
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            const html = await response.text();
            container.innerHTML = html;
            loadedCount++;
        } catch (error) {
            console.warn(`Section load error (${file}):`, error);
            container.innerHTML = `<!-- ${file} failed to load -->`;
        }
    });
    
    await Promise.all(promises);
    
    // Dispatch event when all sections loaded
    document.dispatchEvent(new CustomEvent('sectionsLoaded', { detail: { loaded: loadedCount, total: sections.length } }));
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSections);
} else {
    loadSections();
}
