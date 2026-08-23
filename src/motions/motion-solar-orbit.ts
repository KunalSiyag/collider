import gsap from 'gsap';

export interface SolarOrbitOptions {
  planets?: number;
}

export function createSolarOrbit(container: HTMLElement, options: SolarOrbitOptions = {}): () => void {
  const { planets = 4 } = options;
  const sizes = [14, 20, 16, 26, 18, 22];
  const colors = ['#a78bfa', '#22d3ee', '#f472b6', '#fbbf24', '#67e8f9', '#8b5cf6'];
  const speeds = [3, 5, 7.5, 11, 15, 19];

  container.innerHTML = `
    <style>
      .so { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .so-system { position:relative; width:min(340px,72vw); aspect-ratio:1; }
      .so-sun { position:absolute; left:50%; top:50%; translate:-50% -50%; width:44px; height:44px; border-radius:50%;
        background:radial-gradient(circle at 35% 32%, #fef08a, #f59e0b 70%);
        box-shadow:0 0 46px #fbbf2499, 0 0 90px #f59e0b33; z-index:2; }
      .so-orbit { position:absolute; left:50%; top:50%; translate:-50% -50%; border-radius:50%;
        border:1px dashed #27272a; will-change:transform; }
      .so-planet { border-radius:50%; will-change:transform; box-shadow:0 0 12px rgba(0,0,0,.6); }
    </style>
    <div class="so"><div class="so-system">
      <div class="so-sun"></div>
      ${Array.from({ length: planets }, (_, i) => {
        const size = 34 + i * ((100 - 34) / Math.max(planets, 1));
        return `<div class="so-orbit" data-i="${i}" style="width:${size}%;height:${size}%">
          <div class="so-planet" style="width:${sizes[i % sizes.length]}px;height:${sizes[i % sizes.length]}px;
            margin-top:-${sizes[i % sizes.length] / 2}px;margin-left:-1px;
            background:radial-gradient(circle at 32% 30%, #fff7, transparent), ${colors[i % colors.length]}"></div>
        </div>`;
      }).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.so-orbit').forEach((orbit, i) => {
      gsap.to(orbit, { rotate: i % 2 === 0 ? 360 : -360, duration: speeds[i % speeds.length], ease: 'none', repeat: -1 });
      gsap.to(orbit.querySelector<HTMLElement>('.so-planet')!, {
        rotate: i % 2 === 0 ? -360 : 360,
        duration: speeds[i % speeds.length],
        ease: 'none',
        repeat: -1,
      });
    });
    gsap.to('.so-sun', {
      scale: 1.06,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, container);

  return () => ctx.revert();
}
