// ==========================================================================
// COLLECTION RENDERING & FILTERING
// ==========================================================================
function renderCollection() {
    const featuredWrapper = document.getElementById('featuredWrapper');
    const gamesGrid = document.getElementById('gamesGrid');
    const emptyState = document.getElementById('emptyState');
    const q = queryText.trim().toLowerCase();

    // Check whether the featured card (01 — Atlas Romania) matches
    const atlasMatchesCat = selectedCategory === 'All' || selectedCategory === 'Geography & Exploration';
    const atlasMatchesQuery = !q ||
        'atlas romania'.includes(q) ||
        'geography'.includes(q) ||
        'map'.includes(q) ||
        'counties'.includes(q);

    const showFeatured = atlasMatchesCat && atlasMatchesQuery;
    if (featuredWrapper) {
        featuredWrapper.classList.toggle('hidden', !showFeatured);
    }

    // Filter secondary experiences (02 — SpringWorks)
    const filtered = secondaryExperiences.filter(item => {
        const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
        const textMatch = !q ||
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);
        return catMatch && textMatch;
    });

    if (gamesGrid) {
        gamesGrid.innerHTML = '';
        filtered.forEach(item => {
            const card = document.createElement('article');
            card.className = 'editorial-card p-7 sm:p-9 flex flex-col justify-between gap-6';
            card.innerHTML = `
                <div class="space-y-5">
                    <div class="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em]">
                        <span class="text-accent font-medium">${item.number} — ${item.category}</span>
                        <span class="inline-flex items-center gap-2 text-secondary">
                            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            ${item.status}
                        </span>
                    </div>

                    <div class="border border-hairline bg-subtle overflow-hidden">
                        ${item.image
                            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-auto object-cover" onerror="this.remove()">`
                            : (item.svg || '')}
                    </div>

                    <div class="space-y-2.5">
                        <h3 class="font-serif text-2xl sm:text-3xl font-normal text-ink">${item.title}</h3>
                        <p class="text-secondary text-sm font-light leading-relaxed">${item.description}</p>
                    </div>
                </div>

                <div class="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
                    ${item.url ? `
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="launch-exp-link btn-calm btn-calm-primary px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium inline-flex items-center gap-2">
                            <span>Open experience</span>
                            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                        <span class="text-xs text-muted font-light">${item.displayUrl || ''}</span>
                    ` : `
                        <button type="button" class="open-detail-btn underline-slow text-xs uppercase tracking-[0.16em] text-ink hover:text-accent cursor-pointer">
                            <span>Details</span>
                            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    `}
                </div>
            `;

            card.addEventListener('mouseenter', () => CalmAudio.playSoftHover());

            const launchLink = card.querySelector('.launch-exp-link');
            if (launchLink) {
                launchLink.addEventListener('click', () => CalmAudio.playOpenChord());
            }

            const detailBtn = card.querySelector('.open-detail-btn');
            if (detailBtn) {
                detailBtn.addEventListener('click', () => {
                    CalmAudio.playSoftClick(1.05);
                    openDetailModal(item);
                });
            }

            gamesGrid.appendChild(card);
        });
    }

    if (emptyState) {
        const hasResults = showFeatured || filtered.length > 0;
        emptyState.classList.toggle('hidden', hasResults);
    }
}
