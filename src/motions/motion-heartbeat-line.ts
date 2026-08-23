import gsap from 'gsap';

export interface HeartbeatLineOptions {
  bpm?: number;
}

export function createHeartbeatLine(
  container: HTMLElement,
  options: HeartbeatLineOptions = {},
): () => void {
  const { bpm = 64 } = options;

  container.innerHTML = `
    <style>
      .ht { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:18px; background:#0b0b10; }
      .ht-scope { width:min(460px,88%); height:120px; border:1px solid #27272a; border-radius:14px;
        background:#050508; overflow:hidden; position:relative; }
      .ht-svg { width:100%; height:100%; }
      .ht-trace { fill:none; stroke:#22d3ee; stroke-width:2.5; stroke-linecap:round;
        filter:drop-shadow(0 0 6px #22d3eeaa); }
      .ht-bpm { font-family:ui-monospace,monospace; font-size:15px; color:#a78bfa; letter-spacing:.15em; }
    </style>
    <div class="ht">
      <div class="ht-scope">
        <svg class="ht-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path class="ht-trace" d="M-40 60 L60 60 L75 60 L82 34 L90 86 L98 52 L106 60 L160 60 L175 60 L182 30 L190 90 L198 50 L206 60 L260 60 L275 60 L282 36 L290 84 L298 54 L306 60 L360 60 L420 60"></path>
        </svg>
      </div>
      <div class="ht-bpm">${bpm} BPM ♥</div>
    </div>
  `;

  const trace = container.querySelector<SVGPathElement>('.ht-trace')!;

  const ctx = gsap.context(() => {
    const len = trace.getTotalLength();
    gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(trace, {
      strokeDashoffset: -len / 2,
      duration: 60 / bpm * 3,
      ease: 'none',
    });
    tl.set(trace, { strokeDashoffset: len });
    tl.fromTo('.ht-bpm', { scale: 1 }, {
      scale: 1.25,
      color: '#f472b6',
      duration: 0.14,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
    }, `<${(60 / bpm) * 2}`);
  }, container);

  return () => ctx.revert();
}
