// ==========================================================================
// INITIALIZE EVENTS WHEN THE PAGE LOADS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    buildAccentSwatches();
    applyPreferences();
    renderCollection();
    initScrollReveal();

    // Subtle sounds on hover over the featured card and launch links
    const featuredCard = document.querySelector('#featuredWrapper .editorial-card');
    if (featuredCard) {
        featuredCard.addEventListener('mouseenter', () => CalmAudio.playSoftHover());
    }
    document.querySelectorAll('.launch-exp-link').forEach(link => {
        link.addEventListener('click', () => CalmAudio.playOpenChord());
    });

    // Quick sound button in the header
    document.getElementById('navSoundBtn').addEventListener('click', () => {
        prefs.soundEnabled = !prefs.soundEnabled;
        applyPreferences();
        savePreferences();
        CalmAudio.syncAmbientState();
        if (prefs.soundEnabled) {
            CalmAudio.playSoftClick(1.12);
        }
    });

    // Open / close the settings panel
    document.getElementById('openSettingsBtn').addEventListener('click', () => {
        CalmAudio.playSoftClick(1.05);
        toggleSettingsDrawer(true);
    });
    document.getElementById('footerSettingsBtn').addEventListener('click', () => {
        CalmAudio.playSoftClick(1.05);
        toggleSettingsDrawer(true);
    });
    document.getElementById('closeSettingsBtn').addEventListener('click', () => {
        CalmAudio.playSoftClick(0.92);
        toggleSettingsDrawer(false);
    });
    document.getElementById('doneSettingsBtn').addEventListener('click', () => {
        CalmAudio.playSoftClick(1.08);
        toggleSettingsDrawer(false);
    });
    document.getElementById('settingsDrawer').addEventListener('click', (e) => {
        if (e.target.id === 'settingsDrawer') {
            CalmAudio.playSoftClick(0.92);
            toggleSettingsDrawer(false);
        }
    });

    // Toggle theme (light / dark)
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextTheme = btn.dataset.themeOpt;
            if (prefs.theme !== nextTheme) {
                prefs.theme = nextTheme;
                applyPreferences();
                buildAccentSwatches();
                syncDrawerUI();
                savePreferences();
                CalmAudio.playThemeShift(nextTheme === 'dark');
            }
        });
    });

    // Font size
    document.querySelectorAll('.font-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            prefs.fontScale = btn.dataset.scale;
            prefs.fontLabel = btn.dataset.label;
            applyPreferences();
            savePreferences();
            CalmAudio.playSoftClick(1.04);
        });
    });

    // Comutare Interface Sound
    document.querySelectorAll('.sound-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            prefs.soundEnabled = btn.dataset.soundOpt === 'true';
            applyPreferences();
            savePreferences();
            CalmAudio.syncAmbientState();
            if (prefs.soundEnabled) {
                CalmAudio.playSoftClick(1.1);
            }
        });
    });

    // Volume slidere
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        prefs.soundVolume = Number(e.target.value);
        applyPreferences();
        savePreferences();
    });

    // Toggle calm ambience
    document.getElementById('ambientToggleBtn').addEventListener('click', () => {
        if (!prefs.soundEnabled) {
            prefs.soundEnabled = true;
        }
        prefs.ambientEnabled = !prefs.ambientEnabled;
        applyPreferences();
        savePreferences();
        CalmAudio.syncAmbientState();
        CalmAudio.playSoftClick(prefs.ambientEnabled ? 1.15 : 0.9);
    });

    // Ambient sound preset selector
    document.querySelectorAll('.ambient-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            prefs.ambientPreset = btn.dataset.ambientPreset;
            if (!prefs.soundEnabled) {
                prefs.soundEnabled = true;
            }
            if (!prefs.ambientEnabled) {
                prefs.ambientEnabled = true;
            }
            applyPreferences();
            savePreferences();
            CalmAudio.syncAmbientState();
            CalmAudio.playSoftClick(1.08);
        });
    });

    // Reset settings
    document.getElementById('resetSettingsBtn').addEventListener('click', () => {
        prefs = { ...defaultPrefs };
        applyPreferences();
        savePreferences();
        CalmAudio.syncAmbientState();
        CalmAudio.playSoftClick(0.95);
    });

    // Category filtering
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedCategory = btn.dataset.cat;
            document.querySelectorAll('.cat-btn').forEach(b => {
                b.classList.remove('border-accent', 'text-accent', 'font-medium');
                b.classList.add('border-transparent', 'text-secondary');
            });
            btn.classList.add('border-accent', 'text-accent', 'font-medium');
            btn.classList.remove('border-transparent', 'text-secondary');
            CalmAudio.playSoftClick(1.04);
            renderCollection();
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        queryText = e.target.value;
        renderCollection();
    });

    document.getElementById('resetSearchBtn').addEventListener('click', () => {
        queryText = '';
        searchInput.value = '';
        selectedCategory = 'All';
        document.querySelector('.cat-btn[data-cat="All"]').click();
    });

    // Details modal
    document.getElementById('closeDetailModal').addEventListener('click', () => {
        CalmAudio.playSoftClick(0.92);
        closeDetailModal();
    });
    document.getElementById('closeDetailBtnFooter').addEventListener('click', () => {
        CalmAudio.playSoftClick(0.92);
        closeDetailModal();
    });
    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') {
            CalmAudio.playSoftClick(0.92);
            closeDetailModal();
        }
    });

    // Escape key closes panels
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSettingsDrawer(false);
            closeDetailModal();
        }
    });
});
