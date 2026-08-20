import { useEffect, useRef } from 'react';

/** What the cursor grows over. Matched per event, not snapshotted. */
const INTERACTIVE = 'a, button, .project-card, .skill-card, .contact-link';

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

    // `translate`, not `transform`: Cursor.css owns transform (centring, .big).
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

    // Delegated: cards and modal content mount after this hook runs.
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
