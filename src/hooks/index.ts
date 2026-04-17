import { useEffect, useRef } from 'react';

/**
 * Custom mouse cursor tracking hook
 * Tracks cursor position and manages hover states for interactive elements
 */
export const useCursorTracker = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const shouldDisableCursor = window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;
    if (shouldDisableCursor) {
      cursor.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleHover = (isHovering: boolean) => {
      if (isHovering) {
        cursor.classList.add('big');
      } else {
        cursor.classList.remove('big');
      }
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .skill-card, .contact-link'
    );

    const enterHandlers = new Map<Element, EventListener>();
    const leaveHandlers = new Map<Element, EventListener>();

    document.addEventListener('mousemove', handleMouseMove);

    interactiveElements.forEach((el) => {
      const onEnter = () => handleHover(true);
      const onLeave = () => handleHover(false);

      enterHandlers.set(el, onEnter);
      leaveHandlers.set(el, onLeave);

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        const onEnter = enterHandlers.get(el);
        const onLeave = leaveHandlers.get(el);

        if (onEnter) {
          el.removeEventListener('mouseenter', onEnter);
        }

        if (onLeave) {
          el.removeEventListener('mouseleave', onLeave);
        }
      });
    };
  }, []);

  return cursorRef;
};

/**
 * Hook for animating elements on intersection (scroll into view)
 */
export const useIntersectionObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback]);

  return ref;
};
