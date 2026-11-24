// ==========================================================================
// CONTROALE PANOURI (DRAWER SETĂRI & MODAL DETALII)
// ==========================================================================
function toggleSettingsDrawer(open) {
    const drawer = document.getElementById('settingsDrawer');
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

function openDetailModal(item) {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    document.getElementById('modalIndexCat').textContent = `${item.number} — ${item.category}`;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalIllustration').innerHTML = item.svg;
    document.getElementById('modalDesc').textContent = item.description;
    document.getElementById('modalStatus').textContent = item.status;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}
