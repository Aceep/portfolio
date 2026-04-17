import type {
  Skill,
  Experience,
  Project,
  ContactLink,
  PortfolioContent,
  Video,
} from '../types';

/**
 * Main portfolio content configuration
 */
export const PORTFOLIO_CONTENT: PortfolioContent = {
  name: 'Alycia Gautier',
  tagline: '// Front-End Developer',
  description:
    'Curiosity and creativity have always been at the heart of what I do. Since I was a child, I’ve expressed myself through writing and drawing, driven by a desire to explore and create. Later, my passion grew to include videos and movies, which opened new ways to tell stories and connect ideas. Today, I bring that same curiosity and creative energy to digital projects, blending ideas and skills to build meaningful experiences. Balancing exploration with self-reflection keeps me learning and growing, both personally and professionally.',
  yearsExp: '2+ yrs exp',
  aboutTitle: 'Curiosity & creativity\ndriving digital\nprojects.',
  aboutDescription:
   'From childhood creativity to professional development, I bring a passion for exploration and innovation to every project. With a background in writing, drawing, and video production, I blend creativity with technical skills to craft engaging digital experiences. My journey is fueled by curiosity and a desire to create meaningful work that resonates with users.',
  contactEmail: 'alycia.gautier@laposte.net',
  contactLocation: 'Based in France — Open to remote opportunities',
  contactAvailability:
    'Open to full-time roles and interesting projects. I bring technical rigor, clean code practices, and a strong focus on user experience.',
};

/**
 * Skills with proficiency levels
 */
export const SKILLS: Skill[] = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛',
    level: 90,
    label: 'Expert',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '◈',
    level: 88,
    label: 'Advanced',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: '◭',
    level: 90,
    label: 'Expert',
  },
  {
    id: 'jest',
    name: 'Jest Testing',
    icon: '✦',
    level: 85,
    label: 'Advanced',
  },
  {
    id: 'figma',
    name: 'Figma Design',
    icon: '⎇',
    level: 85,
    label: 'Advanced',
  },
];

/**
 * Work experience timeline
 */
export const EXPERIENCE: Experience[] = [
  {
    id: 'davidson',
    year: '09/2025 — 09/2026',
    company: 'Davidson Consulting - Boulogne',
    role: '// Front-End Developer',
  },
  {
    id: 'playmakers',
    year: '09/2024 — 08/2025',
    company: 'PlayMakers - Remote',
    role: '// Front-End Developer',
  },
];

/**
 * Selected project portfolio - organized by category
 */
export const PROJECTS: Project[] = [
  // Personal Projects
  {
    id: 'annabeth-library',
    number: '001',
    name: 'Annabeth\nLibrary',
    description:
      'Book challenge project with friends. A web application for managing and sharing book collections.',
    tags: ['JavaScript', 'CSS', 'Community'],
    link: 'https://annabeth-library.vercel.app/',
    category: 'personal',
  },

  // School Projects
  {
    id: 'swifty-proteins',
    number: '001',
    name: 'Swifty\nProteins',
    description:
      'Educational project exploring protein structures and functions through interactive visualizations.',
    tags: ['React Native', 'ThreeJS', 'Education'],
    link: 'https://swifty-proteins.vercel.app/',
    category: 'school',
  },
  {
    id: 'NFT-Kyle-app',
    number: '002',
    name: 'NFT\nKyle',
    description:
      'Creation of a web3 application for minting and showcasing NFTs, built with React and Ethereum smart contracts. From scratch development to deployment, this project demonstrates my ability to work with blockchain technologies and create engaging user experiences in the web3 space.',
    tags: ['React', 'Ethereum', 'Web3'],
    link: 'https://kyle-nft-9wih.vercel.app/',
    category: 'school',
  },
  {
    id: '3d-pong',
    number: '003',
    name: '3D Pong\nGame',
    description:
      'School project showcasing 3D graphics with ThreeJS. A modern twist on the classic Pong game with immersive visuals.',
    tags: ['JavaScript', 'ThreeJS', 'CSS'],
    link: 'https://game-three-fawn.vercel.app/',
    category: 'school',
    preview: '/media/projects/3d-pong-preview.png',
  },

  // Interview/Technical Projects
  {
    id: 'shifumi-game',
    number: '003',
    name: 'Shifumi\nGame',
    description:
      'Technical interview project - Interactive rock-paper-scissors game built with React and CSS animations.',
    tags: ['React', 'CSS', 'Game Logic'],
    link: 'https://shifumi-psi.vercel.app/',
    category: 'school',
    preview: '/media/projects/shifumi-preview.png',
  },

  // Professional Projects
  {
    id: 'playmakers-professional',
    number: '004',
    name: 'PlayMakers\nPlatform',
    description:
      'Professional platform frontend management with React, TypeScript, Tailwind CSS, and Jest testing. Full autonomy on frontend implementation.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    category: 'professional',
    modal: true,
  },
  {
    id: 'davidson-consulting',
    number: '005',
    name: 'Davidson\nConsulting',
    description:
      'ERP project development with Vue2, TypeScript, and CSS. Focus on component architecture, performance optimization, and translating Figma designs into pixel-perfect code.',
    tags: ['Vue2', 'TypeScript', 'CSS'],
    category: 'professional',
    modal: true,
  }
];

/**
 * Video portfolio - Adobe Premiere projects
 */
export const VIDEOS: Video[] = [
  {
    id: 'retardement',
    title: 'À Retardement',
    filename: 'A_RETARDEMENT_1.mp4',
    description: 'Short film project exploring timing and narrative flow',
  },
  {
    id: 'golden-sheep',
    title: 'FD - Golden Sheep',
    filename: 'FD-GoldenSheep_1_1.mp4',
    description: 'Creative video production with visual storytelling',
  },
  {
    id: 'moi-assassin',
    title: 'FL - Moi Assassin',
    filename: 'FL-Moi_Assassin.mp4',
    description: 'Dramatic short with editing and sound design',
  },
  {
    id: 'trois-femmes',
    title: 'Trois Femmes Disparaissent',
    filename: 'TroisFemmesDisparaissent_2_1.mp4',
    description: 'Cinematic narrative featuring advanced editing techniques',
  },
];

/**
 * Contact links and information
 */
export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:alycia.gautier@email.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/alyciagautier',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/Aceep?tab=repositories',
    external: true,
  },
  {
    id: 'cv',
    label: 'Download CV',
    url: '/GAUTIER_Alycia_CV.pdf',
  },
];

/**
 * Marquee scrolling text items
 */
export const MARQUEE_ITEMS = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Jest Testing',
  'ThreeJS',
  'Figma Design',
  'Front-End Engineer',
  'Creative Development',
  'Game Development',
  'Performance Optimization',
];
