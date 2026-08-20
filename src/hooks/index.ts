import { useEffect, useRef } from 'react';

/** What the cursor grows over. Matched per event, not snapshotted. */
const INTERACTIVE = 'a, button, .project-card, .skill-card, .contact-link';

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

    // Position is written once per frame via the independent `translate`
    // property: setting left/top per mousemove laid out the page on every
    // pointer event, and writing `transform` here would clobber the centring
    // and the .big scale that Cursor.css owns.
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      cursor.style.translate = `${x}px ${y}px`;
    };

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(paint);
      }
    };

    /*
     * Delegated rather than bound to a snapshot of the matching nodes. The
     * previous version queried once on mount, so every card remounted by the
     * project filter — and everything inside the case-study modal — arrived
     * without handlers, and the cursor quietly stopped reacting.
     */
    const handleOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.(INTERACTIVE)) {
        cursor.classList.add('big');
      }
    };

    const handleOut = (event: MouseEvent) => {
      const from = (event.target as Element | null)?.closest?.(INTERACTIVE);
      if (!from) return;

      // Ignore moves that stay inside the same interactive element.
      const to = (event.relatedTarget as Element | null)?.closest?.(INTERACTIVE);
      if (to === from) return;

      cursor.classList.remove('big');
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return cursorRef;
};
