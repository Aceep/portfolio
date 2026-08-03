import { useEffect } from 'react';
import {
  Cursor,
  Navigation,
  Hero,
  Focus,
  Marquee,
  About,
  Skills,
  Projects,
  Videos,
  Contact,
  Footer,
} from './components';
import { useLanguage } from './i18n/LanguageContext';
import './styles/App.css';

/**
 * Main App component - Orchestrates all page sections
 */
function App() {
  const { c } = useLanguage();
  const {
    portfolio,
    skills,
    skillGroups,
    experience,
    projects,
    videos,
    contactLinks,
    cvUrl,
    focusPillars,
    marquee,
    ui,
  } = c;

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));

    sections.forEach((section, index) => {
      section.classList.add('narrative-section');
      section.style.setProperty('--reveal-delay', `${Math.min(index * 60, 280)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('narrative-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="film-vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <Cursor />
      <Navigation />

      <Hero portfolio={portfolio} ui={ui} cvUrl={cvUrl} />

      <Marquee items={marquee} />

      <Focus pillars={focusPillars} label={ui.focusLabel} />

      <About
        title={portfolio.aboutTitle}
        description={portfolio.aboutDescription}
        experience={experience}
        label={ui.aboutLabel}
        journeyLabel={ui.aboutJourneyLabel}
      />

      <Skills skills={skills} groups={skillGroups} ui={ui} />

      <Projects projects={projects} ui={ui} />

      <Videos videos={videos} ui={ui} />

      <Contact
        title={ui.contactTitle}
        description={portfolio.contactAvailability}
        contactLinks={contactLinks}
        label={ui.contactLabel}
      />

      <Footer
        copyright={`© 2025 — ${portfolio.name} — ${ui.footerRole}`}
        otherProfileLabel={ui.otherProfileLabel}
        otherProfileHref={ui.otherProfileHref}
      />
    </>
  );
}

export default App;
