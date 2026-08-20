import type {
  Skill,
  SkillGroup,
  Experience,
  Project,
  ContactLink,
  CaseStudy,
  CaseStudyHeadings,
  PortfolioContent,
  Video,
  FocusPillar,
  Lang,
  Profile,
  UIStrings,
  LocalizedContent,
} from '../types';

/* -------------------------------------------------------------------------- */
/*  Two positionings, one site                                                */
/*                                                                            */
/*  `frontend` is served at `/` and targets a full-time front-end CDI.        */
/*  `cyber`    is served at `/cyber` and targets the Sept 2026 security       */
/*             apprenticeship.                                                */
/*                                                                            */
/*  Anything that reads the same in both lives in a shared constant; only     */
/*  what actually diverges is keyed by profile.                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Language-neutral metadata (single source of truth for structure)          */
/* -------------------------------------------------------------------------- */

interface SkillMeta {
  id: string;
  icon: string;
  group: string;
}

// Order = display order within each group.
//
// There is deliberately no proficiency score here. A self-declared "React 90%"
// is unfalsifiable and widely discounted by the people this page is written
// for; the evidence lives in SKILL_TEXT[lang][id].label instead, where it can
// name the work it came from.
const SKILLS_META: Record<Profile, SkillMeta[]> = {
  frontend: [
    { id: 'react', icon: '❖', group: 'core' },
    { id: 'javascript', icon: '◇', group: 'core' },
    { id: 'typescript', icon: '◈', group: 'core' },
    { id: 'htmlcss', icon: '◧', group: 'core' },
    { id: 'tailwind', icon: '≋', group: 'core' },
    { id: 'vue', icon: '△', group: 'core' },
    { id: 'git', icon: '⬡', group: 'tooling' },
    { id: 'vercel', icon: '▲', group: 'tooling' },
    { id: 'figma', icon: '✦', group: 'tooling' },
    { id: 'jest', icon: '✓', group: 'tooling' },
    { id: 'threejs', icon: '◉', group: 'tooling' },
  ],
  cyber: [
    { id: 'linux', icon: '⬢', group: 'cyber' },
    { id: 'reseau', icon: '⇄', group: 'cyber' },
    { id: 'gdb', icon: '▤', group: 'cyber' },
    { id: 'reverse', icon: '⟲', group: 'cyber' },
    { id: 'asm', icon: '⌗', group: 'cyber' },
    { id: 'react', icon: '❖', group: 'dev' },
    { id: 'typescript', icon: '◈', group: 'dev' },
    { id: 'javascript', icon: '◇', group: 'dev' },
    { id: 'vue', icon: '△', group: 'dev' },
  ],
};

const SKILL_GROUPS: Record<Profile, Record<Lang, SkillGroup[]>> = {
  frontend: {
    fr: [
      { key: 'core', heading: 'Front-end — au quotidien' },
      { key: 'tooling', heading: 'Outils & qualité' },
    ],
    en: [
      { key: 'core', heading: 'Front-end — day to day' },
      { key: 'tooling', heading: 'Tooling & quality' },
    ],
  },
  cyber: {
    fr: [
      { key: 'cyber', heading: 'Cybersécurité — en montée' },
      { key: 'dev', heading: 'Socle développement' },
    ],
    en: [
      { key: 'cyber', heading: 'Cybersecurity — leveling up' },
      { key: 'dev', heading: 'Dev foundation' },
    ],
  },
};

interface ProjectMeta {
  id: string;
  name: string;
  tags: string[];
  link?: string;
  category?: 'personal' | 'school' | 'professional';
  preview?: string;
  modal?: boolean;
}

// Structure only — display order and the "001" numbering come from
// PROJECT_ORDER below, so reordering per profile stays consistent.
const PROJECTS_META: ProjectMeta[] = [
  {
    id: 'NFT-Kyle-app',
    name: 'NFT\nKyle',
    tags: ['React', 'Ethereum', 'Smart Contracts'],
    link: 'https://kyle-nft-9wih.vercel.app/',
    category: 'school',
    preview: '/media/projects/nft-kyle-preview.jpg',
  },
  {
    id: 'mes-collections',
    name: 'Mes\nCollections',
    tags: ['React', 'Authentication', 'Dashboard'],
    link: 'https://bab-nu.vercel.app/',
    category: 'personal',
  },
  {
    id: 'swifty-proteins',
    name: 'Swifty\nProteins',
    tags: ['React Native', 'ThreeJS', '3D'],
    link: 'https://swifty-proteins.vercel.app/',
    category: 'school',
  },
  {
    id: '3d-pong',
    name: '3D Pong\nGame',
    tags: ['JavaScript', 'ThreeJS', 'CSS'],
    link: 'https://game-three-fawn.vercel.app/',
    category: 'school',
    preview: '/media/projects/3d-pong-preview.png',
  },
  {
    id: 'shifumi-game',
    name: 'Shifumi\nGame',
    tags: ['React', 'CSS', 'Game Logic'],
    link: 'https://shifumi-psi.vercel.app/',
    category: 'school',
    preview: '/media/projects/shifumi-preview.png',
  },
  {
    id: 'annabeth-library',
    name: 'Annabeth\nLibrary',
    tags: ['JavaScript', 'CSS', 'Community'],
    link: 'https://annabeth-library.vercel.app/',
    category: 'personal',
    preview: '/media/projects/annabeth-library-preview.jpg',
  },
  {
    id: 'playmakers-professional',
    name: 'PlayMakers\nPlatform',
    tags: ['React', 'TypeScript', 'Tailwind'],
    category: 'professional',
    modal: true,
  },
  {
    id: 'davidson-consulting',
    name: 'Davidson\nConsulting',
    tags: ['Vue 2 & 3', 'TypeScript', 'Tailwind'],
    category: 'professional',
    modal: true,
  },
];

// The front-end reel leads with paid production work; the cyber reel leads
// with the low-level / lab builds.
const PROJECT_ORDER: Record<Profile, string[]> = {
  frontend: [
    'playmakers-professional',
    'davidson-consulting',
    'mes-collections',
    'swifty-proteins',
    '3d-pong',
    'shifumi-game',
    'annabeth-library',
    'NFT-Kyle-app',
  ],
  cyber: [
    'NFT-Kyle-app',
    'mes-collections',
    'swifty-proteins',
    '3d-pong',
    'shifumi-game',
    'annabeth-library',
    'playmakers-professional',
    'davidson-consulting',
  ],
};

// Posters are generated from the sources by scripts/optimize-media.sh; with one
// set the carousel renders an <img> thumbnail instead of a second <video>.
const VIDEOS_META: Array<{ id: string; filename: string; poster?: string }> = [
  {
    id: 'retardement',
    filename: 'A_RETARDEMENT_1.mp4',
    poster: '/media/videos/A_RETARDEMENT_1.jpg',
  },
  {
    id: 'golden-sheep',
    filename: 'FD-GoldenSheep_1_1.mp4',
    poster: '/media/videos/FD-GoldenSheep_1_1.jpg',
  },
  {
    id: 'moi-assassin',
    filename: 'FL-Moi_Assassin.mp4',
    poster: '/media/videos/FL-Moi_Assassin.jpg',
  },
  {
    id: 'trois-femmes',
    filename: 'TroisFemmesDisparaissent_2_1.mp4',
    poster: '/media/videos/TroisFemmesDisparaissent_2_1.jpg',
  },
];

const CONTACT_META: Array<{ id: string; url: string; external?: boolean }> = [
  { id: 'email', url: 'mailto:alycia.gautier@laposte.net' },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/alycia-gautier/', external: true },
  { id: 'github', url: 'https://github.com/Aceep?tab=repositories', external: true },
  { id: 'cv', url: '' }, // resolved per profile via CV_URL
];

/**
 * Each positioning links its own CV. The security CV opens by asking for an
 * apprenticeship, which would contradict the CDI pitch on `/`.
 */
export const CV_URL: Record<Profile, string> = {
  frontend: '/GAUTIER_Alycia_CV_Frontend.pdf',
  cyber: '/GAUTIER_Alycia_CV.pdf',
};

/* -------------------------------------------------------------------------- */
/*  Per-language text — shared between both profiles                          */
/* -------------------------------------------------------------------------- */

const SKILL_TEXT: Record<Lang, Record<string, { name: string; label: string }>> = {
  fr: {
    // Cyber
    linux: { name: 'Linux', label: 'Kernel · Bash' },
    reseau: { name: 'Réseau & DevOps', label: 'Docker · Kubernetes' },
    gdb: { name: 'GDB', label: 'Débogage' },
    reverse: { name: 'Reverse Engineering', label: 'Binaire' },
    asm: { name: 'Assembleur', label: 'x86' },
    // Front-end
    react: { name: 'React', label: '2 ans en production' },
    typescript: { name: 'TypeScript', label: 'Mode strict · types partagés' },
    javascript: { name: 'JavaScript', label: 'ES2020+ · au quotidien' },
    htmlcss: { name: 'HTML / CSS', label: 'Sémantique · Responsive' },
    tailwind: { name: 'Tailwind', label: 'Design system' },
    vue: { name: 'Vue 2 & 3', label: 'ERP Davidson en production' },
    git: { name: 'Git / GitHub', label: 'Versioning · Revue' },
    vercel: { name: 'Vercel', label: 'Déploiement continu' },
    figma: { name: 'Figma', label: 'Design → code' },
    jest: { name: 'Jest', label: 'Tests unitaires' },
    threejs: { name: 'ThreeJS', label: '3D temps réel' },
  },
  en: {
    // Cyber
    linux: { name: 'Linux', label: 'Kernel · Bash' },
    reseau: { name: 'Networking & DevOps', label: 'Docker · Kubernetes' },
    gdb: { name: 'GDB', label: 'Debugging' },
    reverse: { name: 'Reverse Engineering', label: 'Binary' },
    asm: { name: 'Assembly', label: 'x86' },
    // Front-end
    react: { name: 'React', label: '2 years in production' },
    typescript: { name: 'TypeScript', label: 'Strict mode · shared types' },
    javascript: { name: 'JavaScript', label: 'ES2020+ · daily' },
    htmlcss: { name: 'HTML / CSS', label: 'Semantic · Responsive' },
    tailwind: { name: 'Tailwind', label: 'Design system' },
    vue: { name: 'Vue 2 & 3', label: 'Davidson ERP in production' },
    git: { name: 'Git / GitHub', label: 'Versioning · Review' },
    vercel: { name: 'Vercel', label: 'Continuous deployment' },
    figma: { name: 'Figma', label: 'Design → code' },
    jest: { name: 'Jest', label: 'Unit testing' },
    threejs: { name: 'ThreeJS', label: 'Real-time 3D' },
  },
};

// The front-end reel puts the two paid roles first; the cyber reel leads with
// the Master.
const EXPERIENCE_TEXT: Record<Profile, Record<Lang, Experience[]>> = {
  frontend: {
    fr: [
      {
        id: 'davidson',
        year: '09/2025 — 09/2026',
        company: 'Davidson Consulting — Boulogne',
        role: '// Développeuse Front-End',
      },
      {
        id: 'playmakers',
        year: '09/2024 — 08/2025',
        company: 'PlayMakers — Remote',
        role: '// Développeuse Front-End',
      },
      {
        id: 'master',
        year: 'En cours',
        company: 'École 42 — Master Sécurité & Administration Réseau',
        role: '// Bac +5',
      },
    ],
    en: [
      {
        id: 'davidson',
        year: '09/2025 — 09/2026',
        company: 'Davidson Consulting — Boulogne',
        role: '// Front-End Developer',
      },
      {
        id: 'playmakers',
        year: '09/2024 — 08/2025',
        company: 'PlayMakers — Remote',
        role: '// Front-End Developer',
      },
      {
        id: 'master',
        year: 'Ongoing',
        company: "École 42 — Master's in Network Security & Administration",
        role: '// MSc',
      },
    ],
  },
  cyber: {
    fr: [
      {
        id: 'master',
        year: 'En cours',
        company: 'Master Sécurité & Administration Réseau',
        role: '// Cybersécurité',
      },
      {
        id: 'davidson',
        year: '09/2025 — 09/2026',
        company: 'Davidson Consulting — Boulogne',
        role: '// Développeuse Front-End',
      },
      {
        id: 'playmakers',
        year: '09/2024 — 08/2025',
        company: 'PlayMakers — Remote',
        role: '// Développeuse Front-End',
      },
    ],
    en: [
      {
        id: 'master',
        year: 'Ongoing',
        company: "Master's in Network Security & Administration",
        role: '// Cybersecurity',
      },
      {
        id: 'davidson',
        year: '09/2025 — 09/2026',
        company: 'Davidson Consulting — Boulogne',
        role: '// Front-End Developer',
      },
      {
        id: 'playmakers',
        year: '09/2024 — 08/2025',
        company: 'PlayMakers — Remote',
        role: '// Front-End Developer',
      },
    ],
  },
};

const PROJECT_DESC: Record<Profile, Record<Lang, Record<string, string>>> = {
  frontend: {
    fr: {
      'playmakers-professional':
        'Front d’une plateforme professionnelle gérée en autonomie complète — React, TypeScript et Tailwind, maintien d’une librairie de composants interne (react-playmakers) et tests unitaires Jest.',
      'davidson-consulting':
        'Front d’un ERP interne en Vue 2 & 3 et TypeScript — architecture composants, reprise de code legacy, optimisation des performances et intégration Figma au pixel.',
      'mes-collections':
        'Application de suivi de collections : authentification, routes protégées et dashboard épuré — gestion d’état et de session côté client de bout en bout.',
      'swifty-proteins':
        'Rendu de structures de protéines en 3D avec React Native et ThreeJS — interface tactile fluide et visualisation interactive temps réel sur mobile.',
      '3d-pong':
        'Un Pong en 3D temps réel avec ThreeJS — boucle de rendu, physique et gestion des entrées clavier sans framework de jeu.',
      'shifumi-game':
        'Projet d’entretien technique : pierre-feuille-ciseaux en React avec animations CSS — machine à états de jeu lisible et composants réutilisables.',
      'annabeth-library':
        'Application de challenge lecture construite entre amis — gestion et partage de collections de livres, interface pensée pour un usage quotidien.',
      'NFT-Kyle-app':
        'Application web3 développée de zéro en React — connexion wallet, interactions avec des smart contracts Ethereum et retours d’état asynchrones dans l’UI.',
    },
    en: {
      'playmakers-professional':
        'Front end of a professional platform owned end to end — React, TypeScript and Tailwind, maintaining an internal component library (react-playmakers) and Jest unit tests.',
      'davidson-consulting':
        'Front end of an internal ERP in Vue 2 & 3 and TypeScript — component architecture, legacy code ownership, performance work and pixel-perfect Figma integration.',
      'mes-collections':
        'Collection tracker: authentication, protected routes and a clean dashboard — client-side state and session handling from end to end.',
      'swifty-proteins':
        'Renders 3D protein structures with React Native and ThreeJS — smooth touch interface and real-time interactive visualization on mobile.',
      '3d-pong':
        'Real-time 3D Pong in ThreeJS — render loop, physics and keyboard input handling without a game framework.',
      'shifumi-game':
        'Technical interview project: rock-paper-scissors in React with CSS animations — a readable game state machine and reusable components.',
      'annabeth-library':
        'A reading-challenge app built with friends — managing and sharing book collections, designed around everyday use.',
      'NFT-Kyle-app':
        'A web3 app built from scratch in React — wallet connection, Ethereum smart contract calls and async state feedback in the UI.',
    },
  },
  cyber: {
    fr: {
      'NFT-Kyle-app':
        'Application web3 pour minter et exposer des NFT, développée de zéro avec React et des smart contracts Ethereum — blockchain, wallets et sécurité on-chain en pratique.',
      'mes-collections':
        'Suivi de collections avec authentification par compte et dashboard épuré — gestion de session, routes protégées et données utilisateur.',
      'swifty-proteins':
        'Application pédagogique affichant des structures de protéines en 3D avec React Native et ThreeJS — visualisation interactive temps réel sur mobile.',
      '3d-pong':
        'Un Pong revisité en 3D temps réel avec ThreeJS — physique, boucle de rendu et gestion des entrées.',
      'shifumi-game':
        "Projet d'entretien technique : un pierre-feuille-ciseaux interactif en React et animations CSS — logique et état de jeu propres.",
      'annabeth-library':
        'Application de challenge lecture pour gérer et partager des collections de livres, construite entre amis.',
      'playmakers-professional':
        "Frontend d'une plateforme professionnelle en React, TypeScript, Tailwind et Jest — autonomie complète sur l'implémentation front.",
      'davidson-consulting':
        "Frontend d'ERP en Vue 2 et TypeScript — architecture composants, performance et intégration Figma pixel-perfect.",
    },
    en: {
      'NFT-Kyle-app':
        'A web3 app to mint and showcase NFTs, built from scratch with React and Ethereum smart contracts — hands-on with blockchain, wallets and on-chain security.',
      'mes-collections':
        'Collection tracker with account authentication and a clean dashboard — session handling, protected routes and user data management.',
      'swifty-proteins':
        'Educational app rendering 3D protein structures with React Native and ThreeJS — real-time interactive visualization on mobile.',
      '3d-pong':
        'A modern take on Pong with real-time 3D graphics in ThreeJS — physics, render loop and input handling.',
      'shifumi-game':
        'Technical interview project: an interactive rock-paper-scissors built with React and CSS animations — clean game state and logic.',
      'annabeth-library':
        'A book-challenge app to manage and share reading collections, built with friends.',
      'playmakers-professional':
        'Frontend of a professional platform with React, TypeScript, Tailwind and Jest — full ownership of the frontend implementation.',
      'davidson-consulting':
        'ERP frontend with Vue 2 and TypeScript — component architecture, performance and pixel-perfect Figma integration.',
    },
  },
};

const VIDEO_TEXT: Record<Lang, Record<string, { title: string; description: string }>> = {
  fr: {
    retardement: { title: 'À Retardement', description: 'Court-métrage sur le rythme et la narration' },
    'golden-sheep': { title: 'FD — Golden Sheep', description: 'Production vidéo créative et narration visuelle' },
    'moi-assassin': { title: 'FL — Moi Assassin', description: 'Court dramatique — montage et sound design' },
    'trois-femmes': { title: 'Trois Femmes Disparaissent', description: 'Narration cinématographique et montage avancé' },
  },
  en: {
    retardement: { title: 'À Retardement', description: 'Short film exploring timing and narrative flow' },
    'golden-sheep': { title: 'FD — Golden Sheep', description: 'Creative video production with visual storytelling' },
    'moi-assassin': { title: 'FL — Moi Assassin', description: 'Dramatic short with editing and sound design' },
    'trois-femmes': { title: 'Trois Femmes Disparaissent', description: 'Cinematic narrative with advanced editing' },
  },
};

const CONTACT_LABEL: Record<Lang, Record<string, string>> = {
  fr: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', cv: 'Télécharger le CV' },
  en: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', cv: 'Download CV' },
};

/** Action verb rendered as the call to action on each contact row. */
const CONTACT_CTA: Record<Lang, Record<string, string>> = {
  fr: { email: 'M’écrire', linkedin: 'Voir le profil', github: 'Voir le code', cv: 'Télécharger' },
  en: { email: 'Email me', linkedin: 'View profile', github: 'View code', cv: 'Download' },
};

/* -------------------------------------------------------------------------- */
/*  Positioning copy                                                          */
/* -------------------------------------------------------------------------- */

const PORTFOLIO: Record<Profile, Record<Lang, PortfolioContent>> = {
  frontend: {
    fr: {
      name: 'Alycia Gautier',
      tagline: '// Développeuse Front-End',
      heroJobTitle: 'FRONT-END',
      heroValue: 'Deux ans à construire des interfaces React et Vue en production',
      availabilityBanner: 'En recherche d’un CDI Développeuse Front-End',
      availabilityDetail:
        'Disponible à partir de septembre 2026 · React · TypeScript · Vue · Tailwind · Paris ou télétravail',
      yearsExp: '2 ans en front-end',
      aboutTitle: 'Des interfaces\nqui tiennent\nen production.',
      aboutDescription:
        'Développeuse front-end depuis deux ans, j’ai livré et maintenu des interfaces réelles : la plateforme de PlayMakers, dont j’ai géré le front en autonomie complète, puis l’ERP interne de Davidson Consulting. React, TypeScript, Vue et Tailwind au quotidien, avec ce qui va autour — une librairie de composants maintenue dans la durée, des tests Jest, des maquettes Figma intégrées au pixel et du code legacy repris sans tout réécrire. Je viens d’une formation à l’École 42 : j’apprends vite, seule, et je vais chercher ce qui manque.',
      contactEmail: 'alycia.gautier@laposte.net',
      contactLocation: 'Basée à Paris — ouverte au CDI et au télétravail',
      contactAvailability:
        'En recherche d’un CDI de développeuse front-end à partir de septembre 2026. Deux ans d’expérience React, TypeScript, Vue et Tailwind, l’habitude de porter un front en autonomie et le goût du détail côté interface comme côté code.',
    },
    en: {
      name: 'Alycia Gautier',
      tagline: '// Front-End Developer',
      heroJobTitle: 'FRONT-END',
      heroValue: 'Two years building React and Vue interfaces in production',
      availabilityBanner: 'Looking for a full-time front-end role',
      availabilityDetail:
        'Available from September 2026 · React · TypeScript · Vue · Tailwind · Paris or remote',
      yearsExp: '2 yrs in front-end',
      aboutTitle: 'Interfaces that\nhold up in\nproduction.',
      aboutDescription:
        "A front-end developer for two years, I've shipped and maintained real interfaces: the PlayMakers platform, whose front end I owned entirely, then Davidson Consulting's internal ERP. React, TypeScript, Vue and Tailwind day to day, plus everything around them — a component library maintained over time, Jest tests, pixel-accurate Figma integration and legacy code picked up without rewriting it all. I trained at École 42: I learn fast, on my own, and I go find what's missing.",
      contactEmail: 'alycia.gautier@laposte.net',
      contactLocation: 'Based in Paris — open to full-time roles & remote',
      contactAvailability:
        'Looking for a full-time front-end developer role from September 2026. Two years of React, TypeScript, Vue and Tailwind, used to owning a front end solo, and an eye for detail in the interface as much as in the code.',
    },
  },
  cyber: {
    fr: {
      name: 'Alycia Gautier',
      tagline: '// Développeuse → Cybersécurité',
      heroJobTitle: 'CYBERSEC',
      heroValue: 'En spécialisation en cybersécurité',
      availabilityBanner: 'En recherche d’alternance en cybersécurité',
      availabilityDetail:
        'Master Sécurité & Administration Réseau · 1 sem. école / 2 sem. entreprise · rentrée septembre 2026',
      yearsExp: '2+ ans en dev',
      aboutTitle: 'Du code au\ncœur des\nsystèmes.',
      aboutDescription:
        'Développeuse front-end depuis plus de deux ans, je me spécialise aujourd’hui en cybersécurité via un Master Sécurité et Administration Réseau. Mon parcours dev est un atout : je comprends le code que j’analyse, audite et reverse. Réseau, systèmes Linux, reverse engineering bas niveau — j’explore la sécurité par la pratique, avec la même curiosité qui m’a menée au développement.',
      contactEmail: 'alycia.gautier@laposte.net',
      contactLocation: 'Basée en France — ouverte à l’alternance et au télétravail',
      contactAvailability:
        'En recherche d’une alternance en cybersécurité pour septembre 2026 (1 semaine école / 2 semaines entreprise). Rigueur technique, culture du code et curiosité aussi bien offensive que défensive.',
    },
    en: {
      name: 'Alycia Gautier',
      tagline: '// Developer → Cybersecurity',
      heroJobTitle: 'CYBERSEC',
      heroValue: 'Specializing in cybersecurity',
      availabilityBanner: 'Seeking a cybersecurity apprenticeship',
      availabilityDetail:
        "Master's in Network Security & Administration · 1 wk school / 2 wks company · starting September 2026",
      yearsExp: '2+ yrs in dev',
      aboutTitle: 'From code to\nthe core of\nsystems.',
      aboutDescription:
        "A front-end developer for over two years, I'm now specializing in cybersecurity through a Master's in Network Security & Administration. My dev background is an asset: I understand the code I analyze, audit and reverse. Networking, Linux systems, low-level reverse engineering — I explore security hands-on, with the same curiosity that led me to development.",
      contactEmail: 'alycia.gautier@laposte.net',
      contactLocation: 'Based in France — open to apprenticeship & remote',
      contactAvailability:
        'Looking for a cybersecurity apprenticeship starting September 2026 (1 week school / 2 weeks company). Technical rigor, a coder’s mindset, and curiosity both offensive and defensive.',
    },
  },
};

const MARQUEE: Record<Profile, Record<Lang, string[]>> = {
  frontend: {
    fr: ['React', 'TypeScript', 'Vue 3', 'Tailwind', 'Jest', 'Figma', 'Responsive', 'Accessibilité', 'Git', 'Vercel'],
    en: ['React', 'TypeScript', 'Vue 3', 'Tailwind', 'Jest', 'Figma', 'Responsive', 'Accessibility', 'Git', 'Vercel'],
  },
  cyber: {
    fr: ['Cybersécurité', 'Reverse Engineering', 'Linux', 'Assembleur', 'GDB', 'Réseau', 'Docker', 'Kubernetes', 'React', 'TypeScript'],
    en: ['Cybersecurity', 'Reverse Engineering', 'Linux', 'Assembly', 'GDB', 'Networking', 'Docker', 'Kubernetes', 'React', 'TypeScript'],
  },
};

// Three pillars shown right below the hero, reinforcing the positioning
// instead of repeating the project cards.
const FOCUS: Record<Profile, Record<Lang, FocusPillar[]>> = {
  frontend: {
    fr: [
      {
        id: 'production',
        icon: '⧉',
        title: 'Du code qui part en prod',
        description:
          'Deux ans de features livrées et maintenues sur des plateformes utilisées tous les jours, pas des démos.',
      },
      {
        id: 'ownership',
        icon: '◆',
        title: 'Autonomie sur le front',
        description:
          'Front d’une plateforme porté seule et librairie de composants interne maintenue dans la durée.',
      },
      {
        id: 'quality',
        icon: '✓',
        title: 'Qualité & design',
        description:
          'Tests Jest, intégration Figma au pixel et optimisation de l’existant — le détail compte.',
      },
    ],
    en: [
      {
        id: 'production',
        icon: '⧉',
        title: 'Code that ships',
        description:
          'Two years of features delivered and maintained on platforms people use daily — not demos.',
      },
      {
        id: 'ownership',
        icon: '◆',
        title: 'Front-end ownership',
        description:
          'Owned a platform front end solo and maintained an internal component library over time.',
      },
      {
        id: 'quality',
        icon: '✓',
        title: 'Quality & design',
        description:
          'Jest tests, pixel-accurate Figma integration and optimising what already exists — detail matters.',
      },
    ],
  },
  cyber: {
    fr: [
      {
        id: 'dev-eye',
        icon: '⧉',
        title: 'Un socle dev, un œil sécurité',
        description:
          'Je lis et j’écris le code que j’analyse : je repère les failles là où elles naissent.',
      },
      {
        id: 'low-level',
        icon: '⟲',
        title: 'Bas niveau & reverse',
        description:
          'Assembleur, GDB, reverse de binaires : je démonte pour comprendre ce qui se passe vraiment.',
      },
      {
        id: 'systems',
        icon: '⇄',
        title: 'Systèmes & réseau',
        description:
          'Linux (kernel, bash), Docker et Kubernetes : administrer et sécuriser l’infra.',
      },
    ],
    en: [
      {
        id: 'dev-eye',
        icon: '⧉',
        title: 'A dev foundation, a security eye',
        description:
          'I read and write the code I analyze: I spot flaws where they are born.',
      },
      {
        id: 'low-level',
        icon: '⟲',
        title: 'Low-level & reverse',
        description:
          'Assembly, GDB, binary reverse engineering: I take things apart to understand what really happens.',
      },
      {
        id: 'systems',
        icon: '⇄',
        title: 'Systems & networking',
        description:
          'Linux (kernel, bash), Docker and Kubernetes: administering and securing the infra.',
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  UI micro-copy — shared base, per-profile overrides                        */
/* -------------------------------------------------------------------------- */

type SharedUI = Omit<
  UIStrings,
  | 'navAvailability'
  | 'heroBadge'
  | 'projectsKicker'
  | 'projectsSummary'
  | 'focusLabel'
  | 'footerRole'
  | 'otherProfileLabel'
  | 'otherProfileHref'
>;

const UI_SHARED: Record<Lang, SharedUI> = {
  fr: {
    navLinks: [
      { label: 'À propos', href: '#about' },
      { label: 'Compétences', href: '#skills' },
      { label: 'Projets', href: '#projects' },
      { label: 'Vidéos', href: '#videos' },
      { label: 'Contact', href: '#contact' },
    ],
    langToggleLabel: 'EN',
    heroCtaWork: 'Voir mes projets ↗',
    heroCtaCv: 'Télécharger le CV',
    aboutLabel: '01 — À propos',
    aboutJourneyLabel: 'Parcours',
    skillsLabel: '02 — Compétences',
    projectsLabel: '03 — Projets',
    projectsShown: 'projet(s) affiché(s)',
    projectsEmpty: 'Aucun projet dans cette catégorie pour le moment.',
    projectsIssueLabel: 'Projet',
    filterAll: 'Tous',
    filterProfessional: 'Pro',
    filterPersonal: 'Perso',
    filterTechnical: 'Technique',
    categoryStudio: 'Studio',
    categoryPersonal: 'Perso',
    categoryLab: 'Lab',
    categoryFeature: 'Projet',
    projectCta: 'Voir le projet',
    projectCtaDetails: 'Voir le détail',
    videosLabel: '04 — Vidéos',
    videosHeading: 'Côté créatif',
    videosSubtitle:
      'En dehors de la tech, je monte des courts-métrages : rythme, cadrage, narration. Une autre façon d’aiguiser l’œil et la rigueur.',
    contactLabel: '05 — Contact',
    contactTitle: 'Travaillons<br><em>ensemble</em>.',
    skipToContent: 'Aller au contenu',
    menuOpen: 'Menu',
    menuClose: 'Fermer',
    menuToggleLabel: 'Ouvrir ou fermer le menu de navigation',
    menuCloseLabel: 'Fermer le menu de navigation',
    closeModalLabel: 'Fermer la fenêtre',
    previousVideoLabel: 'Vidéo précédente',
    nextVideoLabel: 'Vidéo suivante',
    projectFiltersLabel: 'Filtrer les projets par catégorie',
  },
  en: {
    navLinks: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Work', href: '#projects' },
      { label: 'Videos', href: '#videos' },
      { label: 'Contact', href: '#contact' },
    ],
    langToggleLabel: 'FR',
    heroCtaWork: 'View my work ↗',
    heroCtaCv: 'Download CV',
    aboutLabel: '01 — About',
    aboutJourneyLabel: 'Journey',
    skillsLabel: '02 — Skills',
    projectsLabel: '03 — Selected Work',
    projectsShown: 'project(s) shown',
    projectsEmpty: 'No project in this category yet.',
    projectsIssueLabel: 'Issue',
    filterAll: 'All',
    filterProfessional: 'Professional',
    filterPersonal: 'Personal',
    filterTechnical: 'Technical',
    categoryStudio: 'Studio',
    categoryPersonal: 'Personal',
    categoryLab: 'Lab',
    categoryFeature: 'Feature',
    projectCta: 'View project',
    projectCtaDetails: 'View details',
    videosLabel: '04 — Videos',
    videosHeading: 'Creative side',
    videosSubtitle:
      'Outside tech, I edit short films: rhythm, framing, storytelling. Another way to sharpen the eye and the rigor.',
    contactLabel: '05 — Contact',
    contactTitle: "Let's<br><em>work</em><br>together.",
    skipToContent: 'Skip to content',
    menuOpen: 'Menu',
    menuClose: 'Close',
    menuToggleLabel: 'Toggle navigation menu',
    menuCloseLabel: 'Close navigation menu',
    closeModalLabel: 'Close dialog',
    previousVideoLabel: 'Previous video',
    nextVideoLabel: 'Next video',
    projectFiltersLabel: 'Filter projects by category',
  },
};

type ProfileUI = Pick<
  UIStrings,
  | 'navAvailability'
  | 'heroBadge'
  | 'projectsKicker'
  | 'projectsSummary'
  | 'focusLabel'
  | 'footerRole'
  | 'otherProfileLabel'
  | 'otherProfileHref'
>;

const UI_BY_PROFILE: Record<Profile, Record<Lang, ProfileUI>> = {
  frontend: {
    fr: {
      navAvailability: 'CDI front-end · sept. 2026',
      heroBadge: 'FRONT-END · REACT · TYPESCRIPT · VUE · ',
      projectsKicker: 'Sélection',
      projectsSummary:
        'Du travail livré en entreprise et des projets construits pour apprendre — React, Vue, TypeScript et un peu de 3D.',
      focusLabel: 'Ce que je fais',
      footerRole: 'Développeuse Front-End',
      otherProfileLabel: 'Voir la version cybersécurité',
      otherProfileHref: '/cyber',
    },
    en: {
      navAvailability: 'Full-time front-end · Sep 2026',
      heroBadge: 'FRONT-END · REACT · TYPESCRIPT · VUE · ',
      projectsKicker: 'Selection',
      projectsSummary:
        'Work shipped on the job and projects built to learn — React, Vue, TypeScript and a bit of 3D.',
      focusLabel: 'What I do',
      footerRole: 'Front-End Developer',
      otherProfileLabel: 'See the cybersecurity version',
      otherProfileHref: '/cyber',
    },
  },
  cyber: {
    fr: {
      navAvailability: 'Alternance cyber · sept. 2026',
      heroBadge: 'DEV → CYBERSEC · OUVERTE À L’ALTERNANCE · ',
      projectsKicker: 'Sélection',
      projectsSummary:
        'Un mélange de projets techniques, d’explorations sécurité et de réalisations produit.',
      focusLabel: 'Focus sécurité',
      footerRole: 'Développeuse · Cybersécurité',
      otherProfileLabel: 'Voir la version front-end',
      otherProfileHref: '/',
    },
    en: {
      navAvailability: 'Cyber apprenticeship · Sep 2026',
      heroBadge: 'DEV → CYBERSEC · OPEN TO APPRENTICESHIP · ',
      projectsKicker: 'Curated selection',
      projectsSummary:
        'A mix of technical builds, security explorations and product work.',
      focusLabel: 'Security focus',
      footerRole: 'Developer · Cybersecurity',
      otherProfileLabel: 'See the front-end version',
      otherProfileHref: '/',
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Case studies — long-form detail for the `modal: true` projects            */
/*                                                                            */
/*  Keyed by the same project id as PROJECTS_META. A project without an entry */
/*  falls back to `soon`, so adding a modal project never breaks the render.  */
/* -------------------------------------------------------------------------- */

const CASE_STUDY_HEADINGS: Record<Lang, CaseStudyHeadings> = {
  fr: {
    context: 'Contexte',
    challenge: 'Enjeu',
    approach: 'Approche',
    results: 'Résultats',
    stack: 'Stack',
    soon: 'Détails du projet à venir.',
  },
  en: {
    context: 'Context',
    challenge: 'Challenge',
    approach: 'Approach',
    results: 'Results',
    stack: 'Stack',
    soon: 'Project details coming soon.',
  },
};

const CASE_STUDIES: Record<Lang, Record<string, CaseStudy>> = {
  fr: {
    'playmakers-professional': {
      title: 'PlayMakers Platform',
      kicker: 'Mini étude de cas',
      role: 'Développeuse Front-End',
      duration: '09/2024 — 08/2025',
      context: 'Plateforme sportive en production, utilisée par des clients actifs sur mobile et desktop.',
      challenge: 'Livrer rapidement de nouvelles fonctionnalités UI tout en préservant la cohérence visuelle et en évitant les régressions dans une bibliothèque de composants en croissance.',
      approach: [
        'Conception et maintenance de patterns UI React + TypeScript réutilisables pour les équipes feature.',
        'Traduction des specs Figma en composants responsives avec une architecture Tailwind.',
        'Mise en place et suivi de la couverture Jest sur les parcours critiques et les composants partagés.',
      ],
      results: [
        'Cadence de livraison des itérations UI améliorée grâce aux composants réutilisables.',
        'Régressions UI réduites via la couverture de tests sur les parcours clés.',
        'Qualité de production stable pendant le déploiement continu de fonctionnalités.',
      ],
      stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Jest', 'Figma', 'Git'],
    },
    'davidson-consulting': {
      title: 'Davidson Consulting ERP',
      kicker: 'Mini étude de cas',
      role: 'Développeuse Front-End',
      duration: '09/2025 — 09/2026',
      context: 'Projet de modernisation d’une interface ERP, centré sur les workflows internes et les écrans riches en données.',
      challenge: 'Améliorer la qualité et la cohérence UX sur des vues dashboard complexes, avec les contraintes d’un legacy Vue2.',
      approach: [
        'Implémentation de composants Vue2 + TypeScript modulaires pour des écrans métier denses.',
        'Optimisation du rendu et de l’architecture de styles pour des interactions fluides sur de grands jeux de données.',
        'Alignement précis de l’implémentation avec les specs Figma (pixel-perfect).',
      ],
      results: [
        'Modules UI plus propres et maintenables pour les pages centrales de l’ERP.',
        'Performance perçue et clarté des interactions améliorées sur les workflows clés.',
        'Allers-retours avec le design réduits grâce à une meilleure fidélité aux specs.',
      ],
      stack: ['Vue2', 'TypeScript', 'CSS', 'Figma', 'Git'],
    },
  },
  en: {
    'playmakers-professional': {
      title: 'PlayMakers Platform',
      kicker: 'Mini Case Study',
      role: 'Front-End Developer',
      duration: '09/2024 — 08/2025',
      context: 'Production sports platform used by active customers across mobile and desktop experiences.',
      challenge: 'Ship new UI features quickly while preserving visual consistency and preventing regressions in a growing component library.',
      approach: [
        'Built and maintained reusable React + TypeScript UI patterns for feature teams.',
        'Translated Figma specifications into responsive components with Tailwind utility architecture.',
        'Introduced and maintained Jest coverage for critical user flows and shared UI elements.',
      ],
      results: [
        'Improved delivery cadence for UI iterations through reusable component patterns.',
        'Reduced UI regressions with test coverage across key interaction paths.',
        'Maintained stable production quality during continuous feature rollout.',
      ],
      stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Jest', 'Figma', 'Git'],
    },
    'davidson-consulting': {
      title: 'Davidson Consulting ERP',
      kicker: 'Mini Case Study',
      role: 'Front-End Developer',
      duration: '09/2025 — 09/2026',
      context: 'ERP interface modernization project focused on internal workflows and data-heavy screens.',
      challenge: 'Upgrade UX quality and consistency on complex dashboard views while working with legacy Vue2 constraints.',
      approach: [
        'Implemented modular Vue2 + TypeScript components for high-density business screens.',
        'Optimized rendering and style architecture for smoother interactions on large datasets.',
        'Aligned implementation details closely with Figma design specs for pixel precision.',
      ],
      results: [
        'Delivered cleaner, more maintainable UI modules for core ERP pages.',
        'Improved perceived performance and interaction clarity on key workflows.',
        'Reduced back-and-forth with design through tighter frontend specification matching.',
      ],
      stack: ['Vue2', 'TypeScript', 'CSS', 'Figma', 'Git'],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Assembly — resolve a full single-language, single-profile bundle          */
/* -------------------------------------------------------------------------- */

export function getContent(lang: Lang, profile: Profile): LocalizedContent {
  const skills: Skill[] = SKILLS_META[profile].map((meta) => ({
    id: meta.id,
    icon: meta.icon,
    group: meta.group,
    name: SKILL_TEXT[lang][meta.id].name,
    label: SKILL_TEXT[lang][meta.id].label,
  }));

  const byId = new Map(PROJECTS_META.map((meta) => [meta.id, meta]));

  // Display order is per profile, and the "001" numbering follows that order
  // so the reel always reads 001, 002, 003… whichever positioning is served.
  const projects: Project[] = PROJECT_ORDER[profile].map((id, index) => {
    const meta = byId.get(id);
    if (!meta) {
      throw new Error(`PROJECT_ORDER.${profile} references unknown project "${id}"`);
    }
    return {
      ...meta,
      number: String(index + 1).padStart(3, '0'),
      description: PROJECT_DESC[profile][lang][id],
    };
  });

  const videos: Video[] = VIDEOS_META.map((meta) => ({
    id: meta.id,
    filename: meta.filename,
    poster: meta.poster,
    title: VIDEO_TEXT[lang][meta.id].title,
    description: VIDEO_TEXT[lang][meta.id].description,
  }));

  const contactLinks: ContactLink[] = CONTACT_META.map((meta) => ({
    id: meta.id,
    url: meta.id === 'cv' ? CV_URL[profile] : meta.url,
    external: meta.external,
    label: CONTACT_LABEL[lang][meta.id],
    cta: CONTACT_CTA[lang][meta.id],
  }));

  return {
    profile,
    portfolio: PORTFOLIO[profile][lang],
    skills,
    skillGroups: SKILL_GROUPS[profile][lang],
    experience: EXPERIENCE_TEXT[profile][lang],
    projects,
    caseStudies: CASE_STUDIES[lang],
    caseStudyHeadings: CASE_STUDY_HEADINGS[lang],
    videos,
    contactLinks,
    cvUrl: CV_URL[profile],
    focusPillars: FOCUS[profile][lang],
    marquee: MARQUEE[profile][lang],
    ui: { ...UI_SHARED[lang], ...UI_BY_PROFILE[profile][lang] },
  };
}
