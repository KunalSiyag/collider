import gsap from 'gsap';

export interface BatteryChargeOptions {
  capacity?: number;
}

export function createBatteryCharge(container: HTMLElement, options: BatteryChargeOptions = {}): () => void {
  const { capacity = 87 } = options;

  container.innerHTML = `
    <style>
      .bt { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .bt-shell { position:relative; width:150px; height:70px; border:3px solid #3f3f46; border-radius:14px; padding:6px; }
      .bt-cap { position:absolute; right:-12px; top:50%; translate:0 -50%; width:9px; height:26px;
        background:#3f3f46; border-radius:0 4px 4px 0; }
      .bt-fill { height:100%; width:0%; border-radius:8px;
        background:linear-gradient(90deg,#22d3ee,#34d399); box-shadow:0 0 16px #22d3ee66; will-change:width; }
      .bt-bolt { position:absolute; left:50%; top:50%; translate:-50% -52%; font-size:30px; opacity:0; z-index:2; }
      .bt-pct { font-size:15px; color:#a1a1aa; letter-spacing:.2em; }
    </style>
    <div class="bt">
      <div class="bt-shell"><div class="bt-cap"></div>
        <div class="bt-fill"></div><div class="bt-bolt">⚡</div>
      </div>
      <div class="bt-pct">0%</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const fill = container.querySelector<HTMLElement>('.bt-fill')!;
    const pct = container.querySelector<HTMLElement>('.bt-pct')!;
    const bolt = container.querySelector<HTMLElement>('.bt-bolt')!;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    const state = { v: 0 };
    tl.to(state, {
      v: capacity,
      duration: 3,
      ease: 'power1.inOut',
      onUpdate() {
        fill.style.width = `${state.v}%`;
        pct.textContent = `${Math.round(state.v)}% CHARGING`;
      },
      onStart: () => gsap.to(bolt, { opacity: 1, yoyo: true, repeat: -1, duration: 0.35, ease: 'sine.inOut' }),
    });
    tl.call(() => {
      gsap.killTweensOf(bolt);
      gsap.set(bolt, { opacity: 0 });
    });
    tl.fromTo(fill, {}, { duration: 0.01 });
    tl.to({}, { duration: 1.4 });
    tl.to(state, {
      v: 0,
      duration: 0.5,
      ease: 'power2.in',
      onUpdate() { fill.style.width = `${state.v}%`; pct.textContent = 'DRAINING…'; },
    });
  }, container);

  return () => ctx.revert();
}
