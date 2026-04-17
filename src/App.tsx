import { useEffect } from 'react';
import {
  Cursor,
  Navigation,
  Hero,
  FeaturedReel,
  Marquee,
  About,
  Skills,
  Projects,
  Videos,
  Contact,
  Footer,
} from './components';
import {
  PORTFOLIO_CONTENT,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  VIDEOS,
  CONTACT_LINKS,
  MARQUEE_ITEMS,
} from './constants/content';
import './styles/App.css';

/**
 * Main App component - Orchestrates all page sections
 */
function App() {
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

      <Hero
        tagline={PORTFOLIO_CONTENT.tagline}
        name={PORTFOLIO_CONTENT.name}
        yearsExp={PORTFOLIO_CONTENT.yearsExp}
      />

      <Marquee items={MARQUEE_ITEMS} />

      <FeaturedReel projects={PROJECTS} />

      <About
        title={PORTFOLIO_CONTENT.aboutTitle}
        description={PORTFOLIO_CONTENT.aboutDescription}
        experience={EXPERIENCE}
      />

      <Skills skills={SKILLS} />

      <Projects projects={PROJECTS} title="Selected Work" sectionNumber="03" />

      <Videos videos={VIDEOS} />

      <Contact
        title="Let's<br><em>work</em><br>together."
        description={PORTFOLIO_CONTENT.contactAvailability}
        contactLinks={CONTACT_LINKS}
      />

      <Footer copyright={`© 2025 — ${PORTFOLIO_CONTENT.name} — Front-End Developer`} />
    </>
  );
}

export default App;
