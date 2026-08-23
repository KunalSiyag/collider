import gsap from 'gsap';

export interface MoonPhasesOptions {
  cycle?: number;
}

export function createMoonPhases(container: HTMLElement, options: MoonPhasesOptions = {}): () => void {
  const { cycle = 8 } = options;

  container.innerHTML = `
    <style>
      .mp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .mp-stage { position:relative; width:150px; height:150px; }
      .mp-moon { position:absolute; inset:0; border-radius:50%;
        background:radial-gradient(circle at 38% 34%, #f1f5f9, #cbd5e1 60%, #94a3b8);
        box-shadow:inset -10px -12px 24px #47556988; }
      .mp-shadow { position:absolute; inset:-2px; border-radius:50%; background:#0b0b10;
        box-shadow:inset 6px 6px 18px #00000022; will-change:transform; transform-origin:left center; }
      .mp-label { position:absolute; bottom:-34px; left:50%; translate:-50%; white-space:nowrap;
        font-family:ui-monospace,monospace; font-size:13px; color:#a78bfa; letter-spacing:.25em; }
    </style>
    <div class="mp"><div class="mp-stage">
      <div class="mp-moon"></div>
      <div class="mp-shadow" id="mp-sh"></div>
      <div class="mp-label">Waxing Crescent</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const shadow = container.querySelector<HTMLElement>('#mp-sh')!;
    const label = container.querySelector<HTMLElement>('.mp-label')!;
    const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];

    const tl = gsap.timeline({ repeat: -1 });
    names.forEach((name, i) => {
      const p = i / names.length;
      const scaleX = Math.abs(Math.cos(p * Math.PI * 2));
      const flip = Math.sin(p * Math.PI * 2) >= 0 ? 1 : -1;
      tl.to(shadow, {
        scaleX: Math.max(scaleX, 0.02) * flip,
        duration: cycle / names.length,
        ease: 'sine.inOut',
        onStart: () => { label.textContent = name; },
      });
    });
  }, container);

  return () => ctx.revert();
}
