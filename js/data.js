// 1. COLECȚIA DE EXPERIENȚE INTERACTIVE (02)
const secondaryExperiences = [
    {
        id: 'atelierul-suspensiilor',
        number: '02',
        title: 'Atelierul Suspensiilor',
        category: 'Fizică Interactivă',
        description: 'Experimentează în timp real dinamica suspensiilor, amortizarea, rigiditatea arcurilor și răspunsul la denivelări într-un laborator interactiv de fizică aplicată.',
        status: 'Disponibil Acum',
        url: 'https://atelier-suspensii.pages.dev',
        displayUrl: 'atelier-suspensii.pages.dev',
        svg: `
            <svg viewBox="0 0 280 140" class="w-full h-32 card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramă tehnică suspensie și amortizor">
                <!-- Grilă tehnică fină -->
                <g stroke="var(--border-hairline)" stroke-width="0.7">
                    <line x1="20" y1="22" x2="260" y2="22"/>
                    <line x1="20" y1="118" x2="260" y2="118"/>
                    <line x1="140" y1="12" x2="140" y2="128" stroke-dasharray="2 3"/>
                </g>

                <!-- Suport superior (șasiu) -->
                <rect x="92" y="18" width="96" height="6" stroke="var(--accent)" stroke-width="1.2" fill="var(--accent-tint)"/>

                <!-- Ansamblu Stânga: Arc elicoidal -->
                <path d="M 114,24 L 114,34 L 102,40 L 126,48 L 102,56 L 126,64 L 102,72 L 126,80 L 114,86 L 114,96"
                      stroke="var(--accent)" 
                      stroke-width="1.35" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"/>

                <!-- Ansamblu Dreapta: Amortizor hidraulic (cilindru + piston) -->
                <rect x="158" y="24" width="16" height="42" stroke="var(--accent)" stroke-width="1.2" fill="var(--accent-tint)"/>
                <line x1="166" y1="66" x2="166" y2="96" stroke="var(--accent)" stroke-width="1.4"/>
                <line x1="160" y1="54" x2="172" y2="54" stroke="var(--accent)" stroke-width="1.3"/>

                <!-- Braț inferior / punte -->
                <rect x="92" y="96" width="96" height="6" stroke="var(--accent)" stroke-width="1.2" fill="var(--bg-surface)"/>

                <!-- Curba de oscilație amortizată (stânga & dreapta) -->
                <path d="M 24,70 Q 38,34 52,70 T 80,70" stroke="var(--accent)" stroke-opacity="0.55" stroke-width="1.1" fill="none"/>
                <path d="M 200,70 Q 214,48 228,70 T 256,70" stroke="var(--accent)" stroke-opacity="0.55" stroke-width="1.1" fill="none"/>
            </svg>
        `
    }
];

// 2. PALETA DE ACCENTE DESATURATE (VERDE ÎNCHIS CA IMPLICIT)
const mutedAccents = [
    { name: 'Verde Pădure', lightHex: '#3A5245', lightHover: '#2C3F35', darkHex: '#688574', darkHover: '#7B9987' },
    { name: 'Verde Salvie', lightHex: '#4E6354', lightHover: '#3D4E42', darkHex: '#7A9482', darkHover: '#8CA694' },
    { name: 'Ardezie Rece', lightHex: '#42525C', lightHover: '#323F47', darkHex: '#738794', darkHover: '#8599A6' },
    { name: 'Măsliniu Stins', lightHex: '#525640', lightHover: '#3F4231', darkHex: '#878C6E', darkHover: '#999E80' },
    { name: 'Grafit Sobru', lightHex: '#2C2E2C', lightHover: '#1A1C1A', darkHex: '#9A9E9A', darkHover: '#B0B4B0' }
];

const defaultPrefs = {
    theme: 'dark',
    accentIdx: 0,
    fontScale: '100%',
    fontLabel: 'Normal (100%)',
    soundEnabled: true,
    soundVolume: 45,
    ambientEnabled: false,
    ambientPreset: 'breeze'
};

const ambientPresetNames = {
    breeze: 'Briză & Acord',
    rain: 'Ploaie Fină',
    waves: 'Valuri Liniștite',
    nocturne: 'Nocturnă Caldă'
};

let prefs = { ...defaultPrefs };
let selectedCategory = 'Toate';
let queryText = '';
