import type {
  Skill,
  Experience,
  Project,
  ContactLink,
  PortfolioContent,
  Video,
  FocusPillar,
  Lang,
  UIStrings,
  LocalizedContent,
} from '../types';

/* -------------------------------------------------------------------------- */
/*  Language-neutral metadata (single source of truth for structure)          */
/* -------------------------------------------------------------------------- */

interface SkillMeta {
  id: string;
  icon: string;
  level: number;
  group: 'cyber' | 'dev';
}

// Order = display order. Cyber first (the target), dev foundation second.
const SKILLS_META: SkillMeta[] = [
  { id: 'linux', icon: '⬢', level: 78, group: 'cyber' },
  { id: 'reseau', icon: '⇄', level: 72, group: 'cyber' },
  { id: 'gdb', icon: '▤', level: 66, group: 'cyber' },
  { id: 'reverse', icon: '⟲', level: 62, group: 'cyber' },
  { id: 'asm', icon: '⌗', level: 58, group: 'cyber' },
  { id: 'react', icon: '⚛', level: 90, group: 'dev' },
  { id: 'typescript', icon: '◈', level: 88, group: 'dev' },
  { id: 'javascript', icon: '◇', level: 90, group: 'dev' },
  { id: 'vue', icon: '△', level: 72, group: 'dev' },
];

interface ProjectMeta {
  id: string;
  number: string;
  name: string;
  tags: string[];
  link?: string;
  category?: 'personal' | 'school' | 'professional';
  preview?: string;
  modal?: boolean;
}

// Order = display order. Technical / security-relevant work leads the reel.
const PROJECTS_META: ProjectMeta[] = [
  {
    id: 'NFT-Kyle-app',
    number: '001',
    name: 'NFT\nKyle',
    tags: ['React', 'Ethereum', 'Smart Contracts'],
    link: 'https://kyle-nft-9wih.vercel.app/',
    category: 'school',
  },
  {
    id: 'mes-collections',
    number: '002',
    name: 'Mes\nCollections',
    tags: ['React', 'Authentication', 'Dashboard'],
    link: 'https://bab-nu.vercel.app/',
    category: 'personal',
  },
  {
    id: 'swifty-proteins',
    number: '003',
    name: 'Swifty\nProteins',
    tags: ['React Native', 'ThreeJS', '3D'],
    link: 'https://swifty-proteins.vercel.app/',
    category: 'school',
  },
  {
    id: '3d-pong',
    number: '004',
    name: '3D Pong\nGame',
    tags: ['JavaScript', 'ThreeJS', 'CSS'],
    link: 'https://game-three-fawn.vercel.app/',
    category: 'school',
    preview: '/media/projects/3d-pong-preview.png',
  },
  {
    id: 'shifumi-game',
    number: '005',
    name: 'Shifumi\nGame',
    tags: ['React', 'CSS', 'Game Logic'],
    link: 'https://shifumi-psi.vercel.app/',
    category: 'school',
    preview: '/media/projects/shifumi-preview.png',
  },
  {
    id: 'annabeth-library',
    number: '006',
    name: 'Annabeth\nLibrary',
    tags: ['JavaScript', 'CSS', 'Community'],
    link: 'https://annabeth-library.vercel.app/',
    category: 'personal',
  },
  {
    id: 'playmakers-professional',
    number: '007',
    name: 'PlayMakers\nPlatform',
    tags: ['React', 'TypeScript', 'Tailwind'],
    category: 'professional',
    modal: true,
  },
  {
    id: 'davidson-consulting',
    number: '008',
    name: 'Davidson\nConsulting',
    tags: ['Vue2', 'TypeScript', 'CSS'],
    category: 'professional',
    modal: true,
  },
];

const VIDEOS_META: Array<{ id: string; filename: string }> = [
  { id: 'retardement', filename: 'A_RETARDEMENT_1.mp4' },
  { id: 'golden-sheep', filename: 'FD-GoldenSheep_1_1.mp4' },
  { id: 'moi-assassin', filename: 'FL-Moi_Assassin.mp4' },
  { id: 'trois-femmes', filename: 'TroisFemmesDisparaissent_2_1.mp4' },
];

const CONTACT_META: Array<{ id: string; url: string; external?: boolean }> = [
  { id: 'email', url: 'mailto:alycia.gautier@laposte.net' },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/alycia-gautier/', external: true },
  { id: 'github', url: 'https://github.com/Aceep?tab=repositories', external: true },
  { id: 'cv', url: '/GAUTIER_Alycia_CV.pdf' },
];

/* -------------------------------------------------------------------------- */
/*  Per-language text                                                         */
/* -------------------------------------------------------------------------- */

const SKILL_TEXT: Record<Lang, Record<string, { name: string; label: string }>> = {
  fr: {
    linux: { name: 'Linux', label: 'Kernel · Bash' },
    reseau: { name: 'Réseau & DevOps', label: 'Docker · Kubernetes' },
    gdb: { name: 'GDB', label: 'Débogage' },
    reverse: { name: 'Reverse Engineering', label: 'Binaire' },
    asm: { name: 'Assembleur', label: 'x86' },
    react: { name: 'React', label: 'Expert' },
    typescript: { name: 'TypeScript', label: 'Avancé' },
    javascript: { name: 'JavaScript', label: 'Expert' },
    vue: { name: 'Vue 2', label: 'Avancé' },
  },
  en: {
    linux: { name: 'Linux', label: 'Kernel · Bash' },
    reseau: { name: 'Networking & DevOps', label: 'Docker · Kubernetes' },
    gdb: { name: 'GDB', label: 'Debugging' },
    reverse: { name: 'Reverse Engineering', label: 'Binary' },
    asm: { name: 'Assembly', label: 'x86' },
    react: { name: 'React', label: 'Expert' },
    typescript: { name: 'TypeScript', label: 'Advanced' },
    javascript: { name: 'JavaScript', label: 'Expert' },
    vue: { name: 'Vue 2', label: 'Advanced' },
  },
};

const EXPERIENCE_TEXT: Record<Lang, Experience[]> = {
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
};

const PROJECT_DESC: Record<Lang, Record<string, string>> = {
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

const PORTFOLIO: Record<Lang, PortfolioContent> = {
  fr: {
    name: 'Alycia Gautier',
    tagline: '// Développeuse → Cybersécurité',
    heroJobTitle: 'CYBERSEC',
    heroValue:
      'Je viens du développement web. Aujourd’hui je sécurise, j’analyse et je reverse le code que je sais écrire.',
    alternanceBanner: 'En recherche d’alternance en cybersécurité',
    alternanceDetail:
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
    heroValue:
      'I come from web development. Today I secure, analyze and reverse the code I know how to write.',
    alternanceBanner: 'Seeking a cybersecurity apprenticeship',
    alternanceDetail:
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
};

const UI: Record<Lang, UIStrings> = {
  fr: {
    navLinks: [
      { label: 'À propos', href: '#about' },
      { label: 'Compétences', href: '#skills' },
      { label: 'Projets', href: '#projects' },
      { label: 'Vidéos', href: '#videos' },
      { label: 'Contact', href: '#contact' },
    ],
    navAvailability: 'Alternance cyber · sept. 2026',
    langToggleLabel: 'EN',
    heroBadge: 'DEV → CYBERSEC · OUVERTE À L’ALTERNANCE · ',
    heroCtaWork: 'Voir mes projets ↗',
    heroCtaCv: 'Télécharger le CV',
    aboutLabel: '01 — À propos',
    aboutJourneyLabel: 'Parcours',
    skillsLabel: '02 — Compétences',
    skillsCyberHeading: 'Cybersécurité — en montée',
    skillsDevHeading: 'Socle développement',
    projectsTitle: 'Projets',
    projectsKicker: 'Sélection',
    projectsSummary:
      'Un mélange de projets techniques, d’explorations sécurité et de réalisations produit.',
    projectsShown: 'projet(s) affiché(s)',
    projectsIssueLabel: 'Projet',
    filterAll: 'Tous',
    filterProfessional: 'Pro',
    filterPersonal: 'Perso',
    filterTechnical: 'Technique',
    categoryStudio: 'Studio',
    categoryPersonal: 'Perso',
    categoryLab: 'Lab',
    categoryFeature: 'Projet',
    focusLabel: 'Focus sécurité',
    videosLabel: '06 — Vidéos',
    videosHeading: 'Côté créatif',
    videosSubtitle:
      'En dehors de la tech, je monte des courts-métrages : rythme, cadrage, narration. Une autre façon d’aiguiser l’œil et la rigueur.',
    contactLabel: '04 — Contact',
    contactTitle: 'Travaillons<br><em>ensemble</em>.',
    footerRole: 'Développeuse · Cybersécurité',
  },
  en: {
    navLinks: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Work', href: '#projects' },
      { label: 'Videos', href: '#videos' },
      { label: 'Contact', href: '#contact' },
    ],
    navAvailability: 'Cyber apprenticeship · Sep 2026',
    langToggleLabel: 'FR',
    heroBadge: 'DEV → CYBERSEC · OPEN TO APPRENTICESHIP · ',
    heroCtaWork: 'View my work ↗',
    heroCtaCv: 'Download CV',
    aboutLabel: '01 — About',
    aboutJourneyLabel: 'Journey',
    skillsLabel: '02 — Skills',
    skillsCyberHeading: 'Cybersecurity — leveling up',
    skillsDevHeading: 'Dev foundation',
    projectsTitle: 'Selected Work',
    projectsKicker: 'Curated selection',
    projectsSummary:
      'A mix of technical builds, security explorations and product work.',
    projectsShown: 'project(s) shown',
    projectsIssueLabel: 'Issue',
    filterAll: 'All',
    filterProfessional: 'Professional',
    filterPersonal: 'Personal',
    filterTechnical: 'Technical',
    categoryStudio: 'Studio',
    categoryPersonal: 'Personal',
    categoryLab: 'Lab',
    categoryFeature: 'Feature',
    focusLabel: 'Security focus',
    videosLabel: '06 — Videos',
    videosHeading: 'Creative side',
    videosSubtitle:
      'Outside tech, I edit short films: rhythm, framing, storytelling. Another way to sharpen the eye and the rigor.',
    contactLabel: '04 — Contact',
    contactTitle: "Let's<br><em>work</em><br>together.",
    footerRole: 'Developer · Cybersecurity',
  },
};

const MARQUEE: Record<Lang, string[]> = {
  fr: [
    'Cybersécurité',
    'Reverse Engineering',
    'Linux',
    'Assembleur',
    'GDB',
    'Réseau',
    'Docker',
    'Kubernetes',
    'React',
    'TypeScript',
  ],
  en: [
    'Cybersecurity',
    'Reverse Engineering',
    'Linux',
    'Assembly',
    'GDB',
    'Networking',
    'Docker',
    'Kubernetes',
    'React',
    'TypeScript',
  ],
};

// "Security focus" pillars shown right below the hero — reinforce the
// dev → cyber positioning instead of repeating the project cards.
const FOCUS: Record<Lang, FocusPillar[]> = {
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
};

/* -------------------------------------------------------------------------- */
/*  Assembly — resolve a full single-language content bundle                  */
/* -------------------------------------------------------------------------- */

export function getContent(lang: Lang): LocalizedContent {
  const skills: Skill[] = SKILLS_META.map((meta) => ({
    id: meta.id,
    icon: meta.icon,
    level: meta.level,
    group: meta.group,
    name: SKILL_TEXT[lang][meta.id].name,
    label: SKILL_TEXT[lang][meta.id].label,
  }));

  const projects: Project[] = PROJECTS_META.map((meta) => ({
    ...meta,
    description: PROJECT_DESC[lang][meta.id],
  }));

  const videos: Video[] = VIDEOS_META.map((meta) => ({
    id: meta.id,
    filename: meta.filename,
    title: VIDEO_TEXT[lang][meta.id].title,
    description: VIDEO_TEXT[lang][meta.id].description,
  }));

  const contactLinks: ContactLink[] = CONTACT_META.map((meta) => ({
    id: meta.id,
    url: meta.url,
    external: meta.external,
    label: CONTACT_LABEL[lang][meta.id],
  }));

  return {
    portfolio: PORTFOLIO[lang],
    skills,
    experience: EXPERIENCE_TEXT[lang],
    projects,
    videos,
    contactLinks,
    focusPillars: FOCUS[lang],
    marquee: MARQUEE[lang],
    ui: UI[lang],
  };
}
