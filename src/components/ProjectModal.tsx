import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../types';
import '../styles/components/ProjectModal.css';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

interface CaseStudy {
  title: string;
  kicker: string;
  role: string;
  duration: string;
  context: string;
  challenge: string;
  approach: string[];
  results: string[];
  stack: string[];
}

const HEADINGS: Record<Lang, {
  context: string;
  challenge: string;
  approach: string;
  results: string;
  stack: string;
  soon: string;
}> = {
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

/**
 * Project modal component - displays detailed project information
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const headings = HEADINGS[lang];

  const renderContent = () => {
    const study = CASE_STUDIES[lang][projectId];

    if (!study) {
      return <div className="modal-content">{headings.soon}</div>;
    }

    return (
      <div className="modal-content">
        <p className="modal-kicker">{study.kicker}</p>
        <h2 className="modal-title">{study.title}</h2>

        <div className="modal-meta-row">
          <span className="modal-meta-pill">{study.role}</span>
          <span className="modal-meta-pill">{study.duration}</span>
        </div>

        <div className="modal-section">
          <h3>{headings.context}</h3>
          <p>{study.context}</p>
        </div>

        <div className="modal-section">
          <h3>{headings.challenge}</h3>
          <p>{study.challenge}</p>
        </div>

        <div className="modal-section">
          <h3>{headings.approach}</h3>
          <ul className="modal-list">
            {study.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>{headings.results}</h3>
          <ul className="modal-list">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>{headings.stack}</h3>
          <div className="modal-tech-stack">
            {study.stack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {renderContent()}
      </div>
    </div>
  );
};
