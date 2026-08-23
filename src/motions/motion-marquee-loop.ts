import gsap from 'gsap';

export interface MarqueeLoopOptions {
  items?: string[];
  speed?: number;
  reverse?: boolean;
}

export function createMarqueeLoop(
  container: HTMLElement,
  options: MarqueeLoopOptions = {},
): () => void {
  const {
    items = ['✳ Collider', 'Three.js', 'GSAP', 'Copy · Paste · Ship', 'Zero lock-in'],
    speed = 60,
    reverse = false,
  } = options;

  const row = items.map((item) => `<span class="cl-mq-item">${item}</span>`).join('');
  container.innerHTML = `
    <style>
      .cl-mq { height:100%; display:flex; align-items:center; overflow:hidden; }
      .cl-mq-track { display:flex; gap:48px; padding-right:48px; white-space:nowrap; will-change:transform; }
      .cl-mq-item { font-size: clamp(26px, 4vw, 44px); font-weight:800; letter-spacing:-0.02em; color:#e4e4e7; display:inline-flex; align-items:center; }
    </style>
    <div class="cl-mq"><div class="cl-mq-track">${row}${row}</div></div>
  `;

  const track = container.querySelector<HTMLElement>('.cl-mq-track')!;
  const ctx = gsap.context(() => {
    gsap.to(track, {
      xPercent: reverse ? 50 : -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  }, container);

  return () => ctx.revert();
}
