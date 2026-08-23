import gsap from 'gsap';

export interface BarRaceOptions {
  bars?: { label: string; color: string; target: number }[];
}

export function createBarRace(
  container: HTMLElement,
  options: BarRaceOptions = {},
): () => void {
  const {
    bars = [
      { label: 'GSAP', color: '#8b5cf6', target: 92 },
      { label: 'CSS', color: '#22d3ee', target: 74 },
      { label: 'WAAPI', color: '#f472b6', target: 58 },
      { label: 'rAF', color: '#a78bfa', target: 41 },
    ],
  } = options;

  container.innerHTML = `
    <style>
      .br { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .br-chart { width:min(420px,86%); display:flex; flex-direction:column; gap:14px; }
      .br-row { display:flex; align-items:center; gap:10px; }
      .br-label { width:64px; text-align:right; font-size:13px; color:#a1a1aa; }
      .br-track { flex:1; height:22px; background:#18181b; border-radius:11px; overflow:hidden;
        border:1px solid #27272a; }
      .br-fill { height:100%; border-radius:11px; width:0%; }
      .br-val { width:36px; font-size:12px; color:#e4e4e7; }
    </style>
    <div class="br"><div class="br-chart">
      ${bars.map((b) => `
        <div class="br-row">
          <span class="br-label">${b.label}</span>
          <div class="br-track"><div class="br-fill" style="background:linear-gradient(90deg, ${b.color}, ${b.color}99)"></div></div>
          <span class="br-val">0</span>
        </div>`).join('')}
    </div></div>
  `;

  const fills = [...container.querySelectorAll<HTMLElement>('.br-fill')];
  const vals = [...container.querySelectorAll<HTMLElement>('.br-val')];

  const ctx = gsap.context(() => {
    bars.forEach((bar, i) => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      tl.fromTo(fills[i], { width: '0%' }, { width: `${bar.target}%`, duration: 1.6 + i * 0.25, ease: 'power3.out', delay: i * 0.2 });
      tl.to(counter, {
        v: bar.target,
        duration: 1.6 + i * 0.25,
        ease: 'power3.out',
        delay: i * 0.2,
        onUpdate: () => { vals[i].textContent = String(Math.round(counter.v)); },
      }, '<');
      tl.to(fills[i], { width: '0%', duration: 0.6, ease: 'power2.in' });
      tl.to(counter, { v: 0, duration: 0.6, ease: 'power2.in', onUpdate: () => { vals[i].textContent = String(Math.round(counter.v)); } }, '<');
    });
  }, container);

  return () => ctx.revert();
}
