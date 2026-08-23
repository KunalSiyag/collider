import gsap from 'gsap';

export interface SeismographOptions {
  width?: number;
}

export function createSeismograph(container: HTMLElement, options: SeismographOptions = {}): () => void {
  const { width = 420 } = options;

  container.innerHTML = `
    <style>
      .sz { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; background:#0b0b10; }
      .sz-drum { position:relative; border:1px solid #3f3f46; border-radius:12px; overflow:hidden;
        background:#0a0a0f; box-shadow:inset 0 0 30px #000; }
      .sz-gridlines { position:absolute; inset:0;
        background:repeating-linear-gradient(90deg, transparent 0 39px, #27272a55 39px 40px); }
      .sz-svg { display:block; }
      .sz-trace { fill:none; stroke:#22d3ee; stroke-width:1.8; filter:drop-shadow(0 0 4px #22d3ee88); }
      .sz-needle { position:absolute; top:0; bottom:0; width:2px; background:#f472b6; left:70%; }
      .sz-label { font-family:ui-monospace,monospace; font-size:13px; color:#71717a; letter-spacing:.25em; }
    </style>
    <div class="sz">
      <div class="sz-label">SEISMIC ACTIVITY — LIVE</div>
      <div class="sz-drum" style="width:${Math.min(width, 460)}px;height:150px">
        <svg class="sz-svg" width="100%" height="100%" viewBox="0 0 ${width} 150">
          <path class="sz-trace"></path>
        </svg>
        <div class="sz-gridlines"></div>
        <div class="sz-needle"></div>
      </div>
    </div>
  `;

  const trace = container.querySelector<SVGPathElement>('.sz-trace')!;

  const ctx = gsap.context(() => {
    const pts = Array.from({ length: Math.ceil(width / 4) + 2 }, () => 75);
    const render = () => {
      trace.setAttribute('d', `M${pts.map((y, i) => `${i * 4} ${y.toFixed(1)}`).join(' L')}`);
    };
    render();
    const iv = window.setInterval(() => {
      if (document.hidden) return;
      const quake = Math.random() < 0.18;
      pts.shift();
      if (quake) {
        for (let k = 0; k < 6 && pts.length > k; k++) {
          pts[pts.length - 1 - k] = 75 + (Math.random() * 2 - 1) * (46 + k * 10);
        }
      } else {
        pts.push(75 + (Math.random() * 2 - 1) * 5);
      }
      gsap.to(trace, {});
      render();
    }, 90);
    (container as any).__szIv = iv;
    gsap.fromTo(trace, {}, {});
  }, container);

  return () => {
    window.clearInterval((container as any).__szIv);
    ctx.revert();
  };
}
