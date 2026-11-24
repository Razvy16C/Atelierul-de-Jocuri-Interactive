// ==========================================================================
// GESTIONARE PREFERINȚE (TEMĂ, ACCENT, FONT, SUNET)
// ==========================================================================
function loadPreferences() {
    try {
        const saved = localStorage.getItem('atelier_razvydev_prefs_v2');
        if (saved) {
            prefs = { ...defaultPrefs, ...JSON.parse(saved) };
        }
    } catch (e) {}
}

function savePreferences() {
    try {
        localStorage.setItem('atelier_razvydev_prefs_v2', JSON.stringify(prefs));
    } catch (e) {}
}

function applyPreferences() {
    const root = document.documentElement;
    const isDark = prefs.theme === 'dark';

    root.setAttribute('data-theme', prefs.theme);
    root.style.setProperty('--font-scale', prefs.fontScale);

    const accent = mutedAccents[prefs.accentIdx] || mutedAccents[0];
    const hex = isDark ? accent.darkHex : accent.lightHex;
    const hoverHex = isDark ? accent.darkHover : accent.lightHover;

    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-hover', hoverHex);
    root.style.setProperty('--accent-tint', isDark ? `${hex}1F` : `${hex}14`);

    CalmAudio.setVolume(prefs.soundVolume);
    syncDrawerUI();
}

function syncDrawerUI() {
    // Buton Sunet din Header
    const navIconOn = document.getElementById('navSoundIconOn');
    const navIconOff = document.getElementById('navSoundIconOff');
    const navSoundText = document.getElementById('navSoundText');
    if (navIconOn && navIconOff) {
        navIconOn.classList.toggle('hidden', !prefs.soundEnabled);
        navIconOff.classList.toggle('hidden', prefs.soundEnabled);
    }
    if (navSoundText) {
        navSoundText.textContent = prefs.soundEnabled ? 'Sunet' : 'Mut';
    }

    // Temă
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
        const active = btn.dataset.themeOpt === prefs.theme;
        btn.classList.toggle('bg-subtle', active);
        btn.classList.toggle('text-ink', active);
        btn.classList.toggle('font-medium', active);
        btn.classList.toggle('text-muted', !active);
    });

    // Accente
    const accent = mutedAccents[prefs.accentIdx] || mutedAccents[0];
    const accentLabel = document.getElementById('accentLabel');
    if (accentLabel) accentLabel.textContent = accent.name;

    document.querySelectorAll('.accent-swatch-btn').forEach((btn, idx) => {
        const active = idx === prefs.accentIdx;
        btn.classList.toggle('ring-1', active);
        btn.classList.toggle('ring-offset-2', active);
        btn.classList.toggle('ring-[var(--accent)]', active);
        btn.classList.toggle('ring-offset-[var(--bg-surface)]', active);
    });

    // Font
    const fontLabel = document.getElementById('fontLabel');
    if (fontLabel) fontLabel.textContent = prefs.fontLabel;

    document.querySelectorAll('.font-opt-btn').forEach(btn => {
        const active = btn.dataset.scale === prefs.fontScale;
        btn.classList.toggle('bg-subtle', active);
        btn.classList.toggle('text-ink', active);
        btn.classList.toggle('font-medium', active);
        btn.classList.toggle('text-muted', !active);
    });

    // Sunet
    const soundStatusLabel = document.getElementById('soundStatusLabel');
    if (soundStatusLabel) {
        soundStatusLabel.textContent = prefs.soundEnabled ? 'Pornit' : 'Oprit';
    }

    document.querySelectorAll('.sound-opt-btn').forEach(btn => {
        const active = (btn.dataset.soundOpt === 'true') === prefs.soundEnabled;
        btn.classList.toggle('bg-subtle', active);
        btn.classList.toggle('text-ink', active);
        btn.classList.toggle('font-medium', active);
        btn.classList.toggle('text-muted', !active);
    });

    const volumeSlider = document.getElementById('volumeSlider');
    const volumeLabel = document.getElementById('volumeLabel');
    if (volumeSlider) volumeSlider.value = prefs.soundVolume;
    if (volumeLabel) volumeLabel.textContent = `${prefs.soundVolume}%`;

    // Ambianță
    const ambientBtn = document.getElementById('ambientToggleBtn');
    const ambientKnob = document.getElementById('ambientToggleKnob');
    const ambientPresetLabel = document.getElementById('ambientPresetLabel');
    if (ambientBtn && ambientKnob) {
        const isOn = prefs.soundEnabled && prefs.ambientEnabled;
        ambientBtn.setAttribute('aria-checked', String(isOn));
        ambientBtn.classList.toggle('border-accent', isOn);
        ambientBtn.classList.toggle('bg-accent-tint', isOn);
        ambientKnob.style.transform = isOn ? 'translateX(20px)' : 'translateX(0)';
        ambientKnob.classList.toggle('bg-accent', isOn);
        ambientKnob.classList.toggle('bg-muted', !isOn);
        if (ambientPresetLabel) {
            ambientPresetLabel.textContent = isOn
                ? `Activ: ${ambientPresetNames[prefs.ambientPreset] || 'Briză & Acord'}`
                : 'Fond sonor generativ pentru concentrare';
        }
    }

    document.querySelectorAll('.ambient-preset-btn').forEach(btn => {
        const active = btn.dataset.ambientPreset === prefs.ambientPreset;
        btn.classList.toggle('bg-subtle', active);
        btn.classList.toggle('text-ink', active);
        btn.classList.toggle('font-medium', active);
        btn.classList.toggle('text-muted', !active);
    });
}

function buildAccentSwatches() {
    const grid = document.getElementById('accentGrid');
    if (!grid) return;
    grid.innerHTML = '';

    mutedAccents.forEach((acc, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.title = acc.name;
        btn.setAttribute('aria-label', acc.name);
        btn.className = 'accent-swatch-btn h-9 w-full border border-hairline transition-all duration-500 cursor-pointer flex items-center justify-center';
        btn.style.backgroundColor = prefs.theme === 'dark' ? acc.darkHex : acc.lightHex;

        btn.addEventListener('click', () => {
            prefs.accentIdx = idx;
            applyPreferences();
            savePreferences();
            buildAccentSwatches();
            syncDrawerUI();
            CalmAudio.playSoftClick(1.06);
        });

        grid.appendChild(btn);
    });
}
