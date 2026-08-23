import gsap from 'gsap';

export interface LetterScrambleOptions {
  text?: string;
  chars?: string;
  duration?: number;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

export function createLetterScramble(
  container: HTMLElement,
  options: LetterScrambleOptions = {},
): () => void {
  const { text = 'HOVER TO DECODE', duration = 1.1 } = options;

  container.innerHTML = `
    <style>
      .cl-ls { height:100%; display:flex; align-items:center; justify-content:center; }
      .cl-ls-text { font-family: ui-monospace, monospace; font-size: clamp(24px, 4.4vw, 46px); font-weight:700;
        letter-spacing:0.08em; color:#67e8f9; cursor:default; user-select:none; }
      .cl-ls-text span { display:inline-block; min-width:0.6ch; }
    </style>
    <div class="cl-ls"><div class="cl-ls-text" tabindex="0">${[...text].map((ch) => `<span>${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')}</div></div>
  `;

  const el = container.querySelector<HTMLElement>('.cl-ls-text')!;
  const spans = [...el.querySelectorAll<HTMLSpanElement>('span')];
  const target = [...text];
  let tween: gsap.core.Tween | null = null;

  function scramble() {
    tween?.kill();
    const progress = { p: 0 };
    tween = gsap.to(progress, {
      p: 1,
      duration,
      ease: 'none',
      onUpdate: () => {
        spans.forEach((span, i) => {
          if (target[i] === ' ') return;
          const revealPoint = (i / spans.length) * 0.7;
          if (progress.p >= revealPoint) {
            span.textContent = target[i]!;
          } else {
            span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        });
      },
    });
  }

  el.addEventListener('pointerenter', scramble);
  el.addEventListener('focus', scramble);
  scramble();

  return () => {
    el.removeEventListener('pointerenter', scramble);
    tween?.kill();
  };
}
