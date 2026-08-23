import gsap from 'gsap';

export interface DotLoaderOptions {
  count?: number;
}

export function createDotLoader(container: HTMLElement, options: DotLoaderOptions = {}): () => void {
  const { count = 5 } = options;

  container.innerHTML = `
    <style>
      .dl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .dl-row { display:flex; align-items:flex-end; gap:12px; height:60px; }
      .dl-dot { width:14px; height:14px; border-radius:50%; will-change:transform;
        background:linear-gradient(180deg,#a78bfa,#7c3aed); }
      .dl-dot:nth-child(2n) { background:linear-gradient(180deg,#67e8f9,#0891b2); }
      .dl-dot:nth-child(3) { background:linear-gradient(180deg,#f9a8d4,#db2777); }
    </style>
    <div class="dl"><div class="dl-row">
      ${Array.from({ length: count }, () => `<div class="dl-dot"></div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.dl-dot', {
      keyframes: [
        { y: -34, scaleY: 1.25, scaleX: 0.85, duration: 0.32, ease: 'power2.out' },
        { y: 0, scaleY: 0.8, scaleX: 1.2, duration: 0.26, ease: 'bounce.out' },
        { scaleY: 1, scaleX: 1, duration: 0.18 },
      ],
      repeat: -1,
      stagger: 0.13,
    });
    gsap.fromTo('.dl-dot', { opacity: 0.55 }, {
      opacity: 1,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      stagger: 0.13,
      ease: 'sine.inOut',
    });
  }, container);

  return () => ctx.revert();
}
