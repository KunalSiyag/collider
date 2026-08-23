import gsap from 'gsap';

export interface LightningStormOptions {
  bolts?: number;
}

export function createLightningStorm(container: HTMLElement, options: LightningStormOptions = {}): () => void {
  const { bolts = 3 } = options;

  const boltPath = (x: number) =>
    `M${x} 0 L${x - 14} 52 L${x + 6} 50 L${x - 18} 104 L${x + 4} 100 L${x - 30} 160`;

  container.innerHTML = `
    <style>
      .lg { height:100%; position:relative; overflow:hidden; background:#0a0a12; }
      .lg-clouds { position:absolute; top:-8%; left:-10%; right:-10%; height:34%;
        border-radius:50%; background:radial-gradient(ellipse, #27273a, #14141f 70%); filter:blur(6px); }
      .lg-city { position:absolute; bottom:0; left:0; right:0; height:26%;
        display:flex; align-items:flex-end; justify-content:space-around; }
      .lg-bldg { width:11%; background:#18181f; border-top:2px solid #27272a; }
      .lg-svg { position:absolute; inset:0; width:100%; height:100%; }
      .lg-flash { fill:none; stroke:#e0f2fe; stroke-width:3.5; stroke-linejoin:round;
        filter:drop-shadow(0 0 10px #7dd3fc); opacity:0; }
      .lg-sky { position:absolute; inset:0; background:#cbd5e1; opacity:0; pointer-events:none; }
    </style>
    <div class="lg">
      <div class="lg-sky"></div>
      <svg class="lg-svg" preserveAspectRatio="none" viewBox="0 0 400 200">
        ${Array.from({ length: bolts }, (_, i) =>
          `<path class="lg-flash" data-i="${i}" d="${boltPath(60 + i * 130)}"></path>`).join('')}
      </svg>
      <div class="lg-clouds"></div>
      <div class="lg-city">
        ${[52, 78, 40, 88, 62].map((h) => `<div class="lg-bldg" style="height:${h}%"></div>`).join('')}
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<SVGPathElement>('.lg-flash').forEach((bolt, i) => {
      gsap.set(bolt, { strokeDasharray: 260, strokeDashoffset: 260 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 + i * 0.9, delay: i * 1.3 });
      tl.to('.lg-sky', { opacity: 0.16, duration: 0.06, yoyo: true, repeat: 3 });
      tl.to(bolt, {
        strokeDashoffset: 0,
        duration: 0.22,
        ease: 'none',
        onStart() { gsap.set(bolt, { opacity: 1 }); },
      }, '<');
      tl.to(bolt, { opacity: 0, duration: 0.35 });
      tl.set(bolt, { strokeDashoffset: 260 });
    });
    gsap.to('.lg-clouds', { x: 14, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
