/**
 * Replay the skill bars' fill animation for every bar inside `element`.
 * Each bar carries its target width as an inline style; we snap back to 0
 * and hand the width back on the next frame so the CSS transition runs.
 */
export const animateSkillBars = (element: Element) => {
  const bars = element.querySelectorAll<HTMLElement>('.skill-level-fill');

  bars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = targetWidth;
      });
    });
  });
};
