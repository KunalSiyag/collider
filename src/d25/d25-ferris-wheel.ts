export interface FerrisWheelCabinsOptions {
  cabins?: number;
}

export function createFerrisWheelCabins(
  container: HTMLElement,
  options: FerrisWheelCabinsOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.cabins ?? 8, 12));
  const radius = 110;

  const spokes = Array.from({ length: n }, (_, i) => {
    const a = ((360 / n) * i * Math.PI) / 180;
    const x = (Math.cos(a) * radius).toFixed(1);
    const y = (Math.sin(a) * radius).toFixed(1);
    return `<line class="cl-n24-spoke" x1="0" y1="0" x2="${x}" y2="${y}"></line>
      <foreignObject class="cl-n24-cab" x="${Number(x) - 14}" y="${Number(y)}" width="28" height="26"><div xmlns="http://www.w3.org/1999/xhtml"></div></foreignObject>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n24 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10,#131317); }
      .cl-n24-scene { position:relative; width:min(70%,300px); height:80%; }
      .cl-n24-svg { position:absolute; inset:0; width:100%; height:100%; overflow:visible;
        animation:cl-n24-turn 16s linear infinite; animation-play-state:var(--ps,running); transform-origin:center; }
      @keyframes cl-n24-turn { to { transform:rotate(360deg); } }
      .cl-n24-spoke { stroke:#a78bfa66; stroke-width:2.5; }
      .cl-n24-cab div { width:26px; height:20px; border-radius:4px 4px 8px 8px; border:1px solid rgba(255,255,255,.2);
        background:linear-gradient(#67e8f9,#155e75); box-shadow:0 3px 8px rgba(0,0,0,.5); }
      .cl-n24-rim { fill:none; stroke:#8b5cf688; stroke-width:3; }
      .cl-n24-legs { position:absolute; bottom:6%; left:50%; width:90px; height:34%; margin-left:-45px;
        background:
          linear-gradient(to top right, transparent 48%, #52525b 48%, #52525b 52%, transparent 52%),
          linear-gradient(to top left, transparent 48%, #52525b 48%, #52525b 52%, transparent 52%);
        z-index:-1; }
      .cl-n24-ground { position:absolute; bottom:2%; left:12%; right:12%; height:4px; border-radius:2px; background:#27272a; }
    </style>
    <div class="cl-n24">
      <div class="cl-n24-scene">
        <svg class="cl-n24-svg" viewBox="-140 -140 280 280">
          <circle class="cl-n24-rim" r="${radius}"></circle>
          ${spokes}
        </svg>
        <div class="cl-n24-legs"></div>
        <div class="cl-n24-ground"></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n24')!;
  const svg = root.querySelector<HTMLElement>('.cl-n24-svg')!;

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    svg.style.rotate = `${((((e.clientX - rect.left) / rect.width) - 0.5) * 40).toFixed(2)}deg`;
  }
  function onLeave() {
    svg.style.rotate = '0deg';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
