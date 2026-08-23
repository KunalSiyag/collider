import gsap from 'gsap';

export interface FlightPathOptions {
  from?: string;
  to?: string;
}

export function createFlightPath(container: HTMLElement, options: FlightPathOptions = {}): () => void {
  const { from = 'SFO', to = 'NRT' } = options;

  container.innerHTML = `
    <style>
      .fp { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
        background:#0b0b10; font-family:ui-monospace,monospace; }
      .fp-route { position:relative; width:min(400px,86%); height:120px; }
      .fp-dash { position:absolute; left:6%; right:6%; top:50%; height:2.5px;
        background-image:linear-gradient(90deg,#3f3f46 55%, transparent 45%);
        background-size:14px 100%; }
      .fp-arc { position:absolute; left:6%; right:6%; top:18%; height:64%;
        border-top:2.5px dashed #8b5cf6aa; border-radius:50% 50% 0 0 / 100% 100% 0 0; opacity:.4; }
      .fp-plane { position:absolute; font-size:26px; will-change:transform,rotate; filter:drop-shadow(0 4px 8px #0008); }
      .fp-end { position:absolute; bottom:-30px; color:#a1a1aa; font-size:13px; letter-spacing:.15em; }
      .fp-end.l { left:2%; } .fp-end.r { right:2%; text-align:right; }
    </style>
    <div class="fp"><div class="fp-route">
      <div class="fp-dash"></div><div class="fp-arc"></div>
      <span class="fp-end l">${from} ✈</span>
      <span class="fp-end r">${to}</span>
      <div class="fp-plane">✈️</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const route = container.querySelector<HTMLElement>('.fp-route')!;
    const plane = container.querySelector<HTMLElement>('.fp-plane')!;
    const W = () => route.clientWidth - 60;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.set(plane, { x: -20, y: 0, rotate: 0, scale: 1, transformOrigin: 'center' });
    tl.to(plane, {
      keyframes: [
        { x: W() * 0.25, y: -52, rotate: -16, duration: 0.9, ease: 'power1.inOut' },
        { x: W() * 0.5, y: -66, rotate: 0, duration: 0.9, ease: 'sine.inOut' },
        { x: W() * 0.75, y: -52, rotate: 14, duration: 0.9, ease: 'sine.inOut' },
        { x: W(), y: 0, rotate: 24, duration: 0.9, ease: 'power1.inOut' },
      ],
    });
    tl.to(plane, { scale: 0.25, opacity: 0, duration: 0.35 });
    tl.set(plane, { x: -20, y: 0, rotate: 0, scale: 1, opacity: 1 });
  }, container);

  return () => ctx.revert();
}
