import gsap from 'gsap';

export interface GearTrainOptions {
  gears?: number;
}

export function createGearTrain(container: HTMLElement, options: GearTrainOptions = {}): () => void {
  const { gears = 3 } = options;
  const radii = [64, 42, 52, 34, 46];

  const teeth = (r: number, n: number) => Array.from({ length: n }, (_, i) => {
    const a = (360 / n) * i * (Math.PI / 180);
    const x1 = 50 + Math.cos(a) * r, y1 = 50 + Math.sin(a) * r;
    return `<circle cx="${x1}%" cy="${y1}%" r="4.5"></circle>`;
  }).join('');

  container.innerHTML = `
    <style>
      .gr { height:100%; display:flex; align-items:center; justify-content:center; gap:-10px; background:#0b0b10; }
      .gr-row { display:flex; align-items:center; }
      .gr-gear { position:relative; border-radius:50%; background:#18181b; border:3px solid #3f3f46;
        will-change:transform; flex:0 0 auto; }
      .gr-gear svg { position:absolute; inset:-8%; width:116%; height:116%; fill:#52525b; }
      .gr-hub { position:absolute; left:50%; top:50%; translate:-50% -50%; border-radius:50%;
        background:#0b0b10; border:2px solid #71717a; }
      .gr-g:nth-child(odd) { color:#8b5cf6; } .gr-g:nth-child(odd) .gr-hub { border-color:#a78bfa; }
      .gr-g:nth-child(even) { color:#22d3ee; } .gr-g:nth-child(even) .gr-hub { border-color:#67e8f9; }
      .gr-gear.gr-g { box-shadow:inset 0 0 18px #0009; }
    </style>
    <div class="gr"><div class="gr-row">
      ${Array.from({ length: gears }, (_, i) => {
        const d = radii[i % radii.length] * 2;
        return `<div class="gr-gear gr-g" data-i="${i}" style="width:${d}px;height:${d}px;margin-right:${i === gears - 1 ? 0 : -radii[i] * 0.28}px">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">${teeth(48, Math.round(d / 6))}</svg>
          <div class="gr-hub" style="width:22%;height:22%"></div>
        </div>`;
      }).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.gr-gear').forEach((gear, i) => {
      gsap.to(gear, {
        rotate: i % 2 === 0 ? 360 : -360,
        duration: 4 + (i % 3),
        ease: 'none',
        repeat: -1,
      });
    });
  }, container);

  return () => ctx.revert();
}
