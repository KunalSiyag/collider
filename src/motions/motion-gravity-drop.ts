import gsap from 'gsap';

export interface GravityDropOptions {
  balls?: number;
}

export function createGravityDrop(
  container: HTMLElement,
  options: GravityDropOptions = {},
): () => void {
  const { balls = 5 } = options;
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .gv { height:100%; position:relative; background:#0b0b10; overflow:hidden; }
      .gv-ball { position:absolute; top:-40px; width:34px; height:34px; border-radius:50%;
        box-shadow:0 12px 22px rgba(0,0,0,.5); will-change:transform; }
      .gv-shadow { position:absolute; bottom:26px; width:40px; height:8px; border-radius:50%;
        background:#00000066; filter:blur(3px); }
    </style>
    <div class="gv">
      ${Array.from({ length: balls }, (_, i) => {
        const left = 10 + i * (80 / Math.max(balls - 1, 1));
        return `<div class="gv-shadow" style="left:${left}%"></div>
          <div class="gv-ball" data-i="${i}" style="left:${left}%;background:radial-gradient(circle at 32% 30%, #fff6, transparent), ${palette[i % palette.length]}"></div>`;
      }).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.gv-ball').forEach((ball, i) => {
      const shadow = container.querySelectorAll<HTMLElement>('.gv-shadow')[i];
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.25 });
      tl.fromTo(ball, { y: -20 }, { y: () => container.clientHeight - ball.offsetHeight - 60, duration: 0.7, ease: 'power2.in' });
      tl.to(shadow, { scaleX: 1.1, opacity: 1, duration: 0.7, ease: 'power2.in' }, '<');
      tl.to(ball, { y: -120, duration: 0.5, ease: 'power2.out' });
      tl.to(shadow, { scaleX: 0.7, opacity: 0.4, duration: 0.5, ease: 'power2.out' }, '<');
      tl.to(ball, { y: 0, duration: 0.45, ease: 'bounce.out' });
      tl.to(shadow, { scaleX: 1.1, opacity: 1, duration: 0.45, ease: 'power2.in' }, '<');
      tl.to({}, { duration: 0.4 });
    });
  }, container);

  return () => ctx.revert();
}
