import gsap from 'gsap';

export interface CountdownRingOptions {
  from?: number;
  seconds?: number;
}

export function createCountdownRing(
  container: HTMLElement,
  options: CountdownRingOptions = {},
): () => void {
  const { from = 10, seconds = 6 } = options;
  const R = 54;
  const C = 2 * Math.PI * R;

  container.innerHTML = `
    <style>
      .cd { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; font-family:ui-monospace,monospace; }
      .cd-stage { position:relative; width:140px; height:140px; }
      .cd-svg { width:100%; height:100%; rotate:-90deg; }
      .cd-track { fill:none; stroke:#27272a; stroke-width:8; }
      .cd-prog { fill:none; stroke:url(#cd-grad); stroke-width:8; stroke-linecap:round;
        filter:drop-shadow(0 0 8px #22d3ee88); }
      .cd-num { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:40px; font-weight:800; color:#fafafa; }
      .cd-unit { position:absolute; bottom:18px; left:50%; translate:-50%; font-size:11px; color:#71717a; letter-spacing:.3em; }
    </style>
    <div class="cd"><div class="cd-stage">
      <svg class="cd-svg" viewBox="0 0 128 128">
        <defs><linearGradient id="cd-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient></defs>
        <circle class="cd-track" cx="64" cy="64" r="${R}"></circle>
        <circle class="cd-prog" cx="64" cy="64" r="${R}" stroke-dasharray="${C}"></circle>
      </svg>
      <div class="cd-num">${from}</div>
      <div class="cd-unit">SEC</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const num = container.querySelector<HTMLElement>('.cd-num')!;
    const prog = container.querySelector<SVGCircleElement>('.cd-prog')!;
    const state = { v: from };
    gsap.to(state, {
      v: 0,
      duration: seconds,
      ease: 'none',
      repeat: -1,
      repeatDelay: 1.2,
      onUpdate() {
        const cur = Math.ceil(state.v);
        if (num.textContent !== String(cur)) {
          num.textContent = String(cur);
          gsap.fromTo(num, { scale: 1.3 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
        }
        gsap.set(prog, { strokeDashoffset: C * (state.v / from) });
      },
    });
  }, container);

  return () => ctx.revert();
}
