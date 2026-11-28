// 1. INTERACTIVE EXPERIENCE COLLECTION (02)
const secondaryExperiences = [
    {
        id: 'spring-works',
        number: '02',
        title: 'SpringWorks',
        category: 'Interactive Physics',
        description: 'Explore suspension dynamics, damping, spring stiffness, and responses to bumps in real time in an interactive applied physics lab.',
        status: 'Play now',
        url: 'https://springworks.pages.dev',
        displayUrl: 'springworks.pages.dev',
        image: 'https://springworks.pages.dev/img/cover.png'
    },
    {
        id: 'Atlas-fizica',
        number: '03',
        title: 'Physics Atlas',
        category: 'Interactive Physics',
        description: 'An interactive map for discovering physics. Explore physical principles through a clear interface designed for visual exploration and spatial memory.',
        status: 'Start exploring',
        url: 'https://atlas-fizica.pages.dev',
        displayUrl: 'atlas-fizica.pages.dev',
        image: 'https://atlas-fizica.pages.dev/images/cover.png'
    }
];

// 2. MUTED ACCENT PALETTE (DARK GREEN AS THE DEFAULT)
const mutedAccents = [
    { name: 'Forest Green', lightHex: '#3A5245', lightHover: '#2C3F35', darkHex: '#688574', darkHover: '#7B9987' },
    { name: 'Sage Green', lightHex: '#4E6354', lightHover: '#3D4E42', darkHex: '#7A9482', darkHover: '#8CA694' },
    { name: 'Cool Slate', lightHex: '#42525C', lightHover: '#323F47', darkHex: '#738794', darkHover: '#8599A6' },
    { name: 'Muted Olive', lightHex: '#525640', lightHover: '#3F4231', darkHex: '#878C6E', darkHover: '#999E80' },
    { name: 'Soft Graphite', lightHex: '#2C2E2C', lightHover: '#1A1C1A', darkHex: '#9A9E9A', darkHover: '#B0B4B0' }
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
    breeze: 'Breeze & Chord',
    rain: 'Soft Rain',
    waves: 'Gentle Waves',
    nocturne: 'Warm Nocturne'
};

let prefs = { ...defaultPrefs };
let selectedCategory = 'All';
let queryText = '';
