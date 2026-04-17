/**
 * Utility function to animate skill bars on intersection
 * Resets bar width to 0, then animates to target width
 */
export const animateSkillBars = (element: Element) => {
  const bars = element.querySelectorAll('.skill-level-fill');
  bars.forEach((bar) => {
    const element = bar as HTMLElement;
    const targetWidth = element.style.width;
    element.style.width = '0%';
    setTimeout(() => {
      element.style.width = targetWidth;
    }, 100);
  });
};

/**
 * Smooth scroll handler for anchor links
 */
export const smoothScroll = (target: string) => {
  const element = document.querySelector(target);
  element?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Classname utility for conditional styling
 */
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
