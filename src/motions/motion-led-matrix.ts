import gsap from 'gsap';

export interface LedMatrixOptions {
  message?: string;
}

export function createLedMatrix(container: HTMLElement, options: LedMatrixOptions = {}): () => void {
  const { message = 'HELLO COLLIDER' } = options;

  container.innerHTML = `
    <style>
      .lm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .lm-panel { padding:16px 20px; border-radius:14px; background:#050505;
        border:2px solid #27272a; box-shadow:inset 0 0 24px #000, 0 14px 30px #0007; overflow:hidden; }
      .lm-text { font-family:ui-monospace,monospace; font-size:34px; font-weight:800; letter-spacing:.35em;
        white-space:nowrap; will-change:transform; }
      .lm-char { display:inline-block;
        color:#f59e0b; text-shadow:0 0 8px #f59e0b, 0 0 18px #f59e0b66; }
    </style>
    <div class="lm"><div class="lm-panel"><div class="lm-text"></div></div></div>
  `;

  const ctx = gsap.context(() => {
    const el = container.querySelector<HTMLElement>('.lm-text')!;
    const render = (str: string) => {
      el.innerHTML = [...str].map((ch) =>
        ch === ' ' ? '<span class="lm-char">&nbsp;&nbsp;</span>' : `<span class="lm-char">${ch}</span>`).join('');
    };
    render(`${message}   ·   `);
    gsap.to(el, {
      xPercent: -100,
      duration: 9,
      ease: 'none',
      repeat: -1,
      modifiers: {},
      onStart() {},
    });
    const flicker = () => {
      el.querySelectorAll<HTMLElement>('.lm-char').forEach((c) => {
        if (Math.random() < 0.06) {
          gsap.fromTo(c,
            { opacity: 0.25 },
            { opacity: 1, duration: 0.12, delay: Math.random() * 0.3 });
        }
      });
    };
    const iv = window.setInterval(() => { if (!document.hidden) flicker(); }, 900);
    (container as any).__lmIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__lmIv);
    ctx.revert();
  };
}
