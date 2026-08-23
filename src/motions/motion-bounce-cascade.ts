import gsap from 'gsap';

export interface BounceCascadeOptions {
  balls?: number;
}

export function createBounceCascade(
  container: HTMLElement,
  options: BounceCascadeOptions = {},
): () => void {
  const { balls = 6 } = options;
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .bz { height:100%; position:relative; background:#0b0b10; overflow:hidden;
        display:flex; align-items:flex-end; justify-content:center; gap:26px;
        padding-bottom:36px; box-sizing:border-box; }
      .bz-floor { position:absolute; bottom:28px; left:8%; right:8%; height:2px; background:#3f3f46; }
      .bz-ball { width:26px; height:26px; border-radius:50%; will-change:transform;
        box-shadow:0 8px 16px rgba(0,0,0,.45); }
    </style>
    <div class="bz">
      <div class="bz-floor"></div>
      ${Array.from({ length: balls }, (_, i) =>
        `<div class="bz-ball" style="background:radial-gradient(circle at 32% 30%, #fff5, transparent), ${palette[i % palette.length]};"></div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.bz-ball').forEach((ball, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.18 });
      tl.to(ball, { y: -170 - i * 8, duration: 0.55, ease: 'power2.out' })
        .to(ball, { y: 0, duration: 0.55, ease: 'bounce.out' })
        .to(ball, { y: -(90 + i * 10), duration: 0.38, ease: 'power2.out' })
        .to(ball, { y: 0, duration: 0.38, ease: 'bounce.out' })
        .to(ball, { y: 0, duration: 0.5 });
    });
  }, container);

  return () => ctx.revert();
}
