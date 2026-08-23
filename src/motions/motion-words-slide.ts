import gsap from 'gsap';

export interface WordsSlideOptions {
  text?: string;
  stagger?: number;
}

export function createWordsSlide(
  container: HTMLElement,
  options: WordsSlideOptions = {},
): () => void {
  const { text = 'Copy. Paste. Ship faster.', stagger = 0.09 } = options;

  container.innerHTML = `
    <style>
      .cl-ws { height:100%; display:flex; align-items:center; justify-content:center; padding:24px; }
      .cl-ws h2 { font-size: clamp(26px, 4.6vw, 50px); font-weight:800; letter-spacing:-0.02em; color:#fafafa; }
      .cl-ws .w { display:inline-block; overflow:hidden; vertical-align:bottom; margin-right:0.3em; }
      .cl-ws .wi { display:inline-block; will-change:transform; }
      .cl-ws .accent .wi { color:#67e8f9; }
    </style>
    <h2 class="cl-ws" aria-label="${text}">${text
      .split(' ')
      .map((word, i) => {
        const accent = word.replace(/\W/g, '').toLowerCase() === 'ship';
        return `<span class="w${accent ? ' accent' : ''}"><span class="wi">${word}</span></span>`;
      })
      .join('')}</h2>
  `;

  const ctx = gsap.context(() => {
    gsap.from('.cl-ws .wi', {
      yPercent: 130,
      rotate: 6,
      duration: 0.85,
      stagger,
      ease: 'back.out(1.6)',
    });
  }, container);

  return () => ctx.revert();
}
