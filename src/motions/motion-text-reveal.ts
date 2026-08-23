import gsap from 'gsap';

export interface TextRevealOptions {
  text?: string;
  stagger?: number;
  duration?: number;
}

export function createTextReveal(
  container: HTMLElement,
  options: TextRevealOptions = {},
): () => void {
  const { text = 'Motion is meaning', stagger = 0.035, duration = 0.9 } = options;

  container.innerHTML = `
    <style>
      .cl-tr { display:flex; align-items:center; justify-content:center; height:100%; padding:24px; }
      .cl-tr h2 { font-size: clamp(28px, 5vw, 56px); font-weight: 800; letter-spacing: -0.03em; color: #fafafa; }
      .cl-tr .word { display:inline-block; overflow:hidden; margin-right:0.28em; vertical-align:bottom; }
      .cl-tr .char { display:inline-block; will-change: transform; }
    </style>
    <div class="cl-tr"><h2 aria-label="${text}">${text
      .split(' ')
      .map(
        (word) =>
          `<span class="word">${[...word].map((ch) => `<span class="char">${ch}</span>`).join('')}</span>`,
      )
      .join('')}</h2></div>
  `;

  const ctx = gsap.context(() => {
    gsap.from('.cl-tr .char', {
      yPercent: 120,
      rotate: 8,
      opacity: 0,
      duration,
      stagger: { each: stagger, from: 'start' },
      ease: 'power4.out',
    });
  }, container);

  return () => ctx.revert();
}
