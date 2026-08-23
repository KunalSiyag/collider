import gsap from 'gsap';

export interface OrbitLoaderOptions {
  dots?: number;
}

export function createOrbitLoader(container: HTMLElement, options: OrbitLoaderOptions = {}): () => void {
  const { dots = 3 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6'];

  container.innerHTML = `
    <style>
      .ol { height:100%; display:flex; align-items:center; justify-content:center; gap:34px; background:#0b0b10; }
      .ol-orbit { position:relative; width:56px; height:56px; }
      .ol-ring { position:absolute; inset:0; border-radius:50%; border:1.5px solid #27272a; }
      .ol-dot { position:absolute; left:50%; top:-4px; width:12px; height:12px; margin-left:-6px; border-radius:50%; }
      .ol-label { font-family:ui-monospace,monospace; font-size:13px; color:#71717a; letter-spacing:.3em; align-self:center; }
    </style>
    <div class="ol">
      ${Array.from({ length: dots }, (_, i) => `
        <div class="ol-orbit">
          <div class="ol-ring"></div>
          <div class="ol-dot" style="background:${colors[i % colors.length]}"></div>
        </div>`).join('')}
      <div class="ol-label">ORBITING</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.ol-orbit').forEach((orbit, i) => {
      const dot = orbit.querySelector<HTMLElement>('.ol-dot')!;
      gsap.to(orbit, {
        rotate: i % 2 ? -360 : 360,
        duration: 1.1 + i * 0.35,
        ease: 'none',
        repeat: -1,
      });
      gsap.set(dot, {});
      gsap.to(dot, {
        scale: 0.55,
        duration: (1.1 + i * 0.35) / 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
