// 1. COLECȚIA DE EXPERIENȚE INTERACTIVE (02)
const secondaryExperiences = [
    {
        id: 'spring-works',
        number: '02',
        title: 'SpringWorks',
        category: 'Interactive physics',
        description: 'Experimentează în timp real dinamica suspensiilor, amortizarea, rigiditatea arcurilor și răspunsul la denivelări într-un laborator interactiv de fizică aplicată.',
        status: 'Play now',
        url: 'https://springworks.pages.dev',
        displayUrl: 'springworks.pages.dev',
        image: 'https://springworks.pages.dev/img/cover.png'
    },
    {
        id: 'Atlas-fizica',
        number: '03',
        title: 'Atlas Fizica',
        category: 'Interactive physics',
        description: 'O hartă interactivă dedicată descoperirii fizicii. Explorează principiile fizice într-o interfață clară, concepută pentru explorare vizuală și memorie spațială.',
        status: 'Start learning',
        url: 'https://atlas-fizica.pages.dev',
        displayUrl: 'atlas-fizica.pages.dev',
        image: 'https://atlas-fizica.pages.dev/images/cover.png'
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
