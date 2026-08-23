import gsap from 'gsap';

export interface ThermostatDialOptions {
  temps?: number[];
}

export function createThermostatDial(container: HTMLElement, options: ThermostatDialOptions = {}): () => void {
  const { temps = [18, 24, 21, 28] } = options;

  container.innerHTML = `
    <style>
      .th { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:#0b0b10; font-family:ui-monospace,monospace; }
      .th-dial { position:relative; width:150px; height:150px; border-radius:50%;
        background:conic-gradient(from -135deg, #22d3ee var(--p,40%), #27272a 0);
        mask:radial-gradient(circle, transparent 58%, #000 60%);
        -webkit-mask:radial-gradient(circle, transparent 58%, #000 60%); will-change:--p; }
      .th-core { position:absolute; inset:18px; border-radius:50%; background:#131317; border:1.5px solid #27272a;
        display:flex; flex-direction:column; align-items:center; justify-content:center; }
      .th-temp { font-size:34px; font-weight:700; color:#fafafa; }
      .th-unit { font-size:11px; color:#71717a; letter-spacing:.3em; }
      .th-mode { color:#67e8f9; font-size:13px; letter-spacing:.25em; }
    </style>
    <div class="th">
      <div class="th-dial" id="th-ring">
        <div class="th-core">
          <div class="th-temp">20°</div>
          <div class="th-unit">CELSIUS</div>
        </div>
      </div>
      <div class="th-mode">● HEATING</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const ring = container.querySelector<HTMLElement>('#th-ring')!;
    const tempEl = container.querySelector<HTMLElement>('.th-temp')!;
    const mode = container.querySelector<HTMLElement>('.th-mode')!;

    const apply = (t: number) => {
      ring.style.setProperty('--p', `${((t - 10) / 25) * 100}%`);
      tempEl.textContent = `${Math.round(t)}°`;
      mode.textContent = t > 22 ? '● COOLING' : '● HEATING';
      mode.style.color = t > 22 ? '#f472b6' : '#67e8f9';
    };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    temps.forEach((target) => {
      const proxy = { v: temps[temps.indexOf(target) - 1] ?? 20 };
      if (tl.getChildren(false).length === 0) proxy.v = 20;
      else {
        const prevTarget = temps[Math.max(temps.indexOf(target) - 1, 0)];
        proxy.v = prevTarget;
        void prevTarget;
      }
      tl.to(proxy, {
        v: target,
        duration: 1,
        ease: 'elastic.out(1, 0.55)',
        onStart() { proxy.v = parseFloat(tempEl.textContent || '20'); },
        onUpdate() { apply(proxy.v); },
      });
    });
  }, container);

  return () => ctx.revert();
}
