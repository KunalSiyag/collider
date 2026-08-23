export interface SpiralStaircaseOptions {
  steps?: number;
}

export function createSpiralStaircase(
  container: HTMLElement,
  options: SpiralStaircaseOptions = {},
): () => void {
  const n = Math.max(10, Math.min(options.steps ?? 14, 18));

  const steps = Array.from({ length: n }, (_, i) => {
    const a = i * (300 / n);
    return `<div class="cl-n33-step" style="--a:${a.toFixed(1)}deg;--y:${(i * 100) / n}%;--i:${i}"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n33 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 60% 20%,#1e1b4b,#09090b); perspective:900px; cursor:pointer; }
      .cl-n33-scene { position:relative; width:min(56%,230px); height:78%; transform-style:preserve-3d;
        transform:rotateX(-12deg); will-change:transform; transition:transform 1s ease; }
      .cl-n33-step { position:absolute; left:50%; top:var(--y); width:86px; height:10px; margin-left:-43px; border-radius:3px;
        background:linear-gradient(#67e8f9,#155e75); box-shadow:0 6px 14px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.3);
        transform-origin:center center; transform-style:preserve-3d;
        transform:rotateY(var(--a)) translateZ(52px) translateY(calc(var(--y) * -0.06px)); }
      .cl-n33-step::after { content:''; position:absolute; top:100%; left:8px; right:8px; height:16px;
        background:#0e749088; transform:rotateX(-90deg); transform-origin:top center; opacity:.5; }
      .cl-n33-pole { position:absolute; left:50%; top:0; bottom:0; width:5px; margin-left:-2.5px; border-radius:3px;
        background:linear-gradient(#a78bfa,#4c1d95); box-shadow:0 0 14px rgba(167,139,250,.4); }
      .cl-n33-hint { position:absolute; bottom:12px; left:0; right:0; text-align:center; color:#71717a;
        font-size:10px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n33">
      <div class="cl-n33-scene"><div class="cl-n33-pole"></div>${steps}</div>
      <div class="cl-n33-hint">Click to spin</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n33')!;
  const scene = root.querySelector<HTMLElement>('.cl-n33-scene')!;

  let quarter = 0;
  function onClick() {
    quarter += 1;
    scene.style.transform = `rotateX(${-12 + (quarter % 2 ? 8 : -4)}deg) rotateZ(${quarter * 90}deg)`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
