import gsap from 'gsap';

export interface RadarSweepOptions {
  blips?: number;
}

export function createRadarSweep(
  container: HTMLElement,
  options: RadarSweepOptions = {},
): () => void {
  const { blips = 4 } = options;

  container.innerHTML = `
    <style>
      .rd { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .rd-scope { width:min(320px,80vw); aspect-ratio:1; border-radius:50%; position:relative;
        border:2px solid #164e63; background:
          repeating-radial-gradient(circle at center, transparent 0 24%, #164e6333 24% calc(24% + 1px)),
          radial-gradient(circle, #052e2e 0%, #02101a 70%);
        box-shadow:inset 0 0 40px #06b6d41a; overflow:hidden; }
      .rd-cross-h, .rd-cross-v { position:absolute; background:#164e63; }
      .rd-cross-h { left:6%; right:6%; top:50%; height:1px; }
      .rd-cross-v { top:6%; bottom:6%; left:50%; width:1px; }
      .rd-wedge { position:absolute; inset:0; border-radius:50%;
        background:conic-gradient(from 0deg, #22d3ee55, transparent 70deg);
        transform-origin:center; will-change:transform; }
      .rd-line { position:absolute; left:50%; top:50%; width:50%; height:2px;
        background:linear-gradient(90deg,#22d3ee,transparent); transform-origin:left center; }
      .rd-blip { position:absolute; width:8px; height:8px; border-radius:50%; background:#67e8f9;
        box-shadow:0 0 10px #22d3ee; opacity:0; }
    </style>
    <div class="rd">
      <div class="rd-scope">
        <div class="rd-cross-h"></div><div class="rd-cross-v"></div>
        <div class="rd-wedge"></div><div class="rd-line"></div>
        ${Array.from({ length: blips }, (_, i) =>
          `<div class="rd-blip" style="left:${18 + ((i * 37) % 64)}%;top:${16 + ((i * 53) % 68)}%"></div>`).join('')}
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.rd-wedge, .rd-line', {
      rotate: 360,
      duration: 3.2,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center',
    });
    container.querySelectorAll<HTMLElement>('.rd-blip').forEach((blip, i) => {
      gsap.to(blip, {
        keyframes: [{ opacity: 1, scale: 1.4, duration: 0.25 }, { opacity: 0, scale: 0.6, duration: 1.6 }],
        repeat: -1,
        delay: (i * 0.75 + 0.4) % 3.2,
        ease: 'sine.out',
      });
    });
  }, container);

  return () => ctx.revert();
}
