export interface EffectOptions {
  emoji?: string;
  label?: string;
}

export function createScratchCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🎉', label = 'You won!' } = options;

  container.innerHTML = `
    <style>
      .cl-scc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-scc-card { position:relative; width:min(80%,320px); aspect-ratio:8/5; border-radius:16px; overflow:hidden;
        background:linear-gradient(150deg,#1c1440,#0e0a24);
        display:flex; align-items:center; justify-content:center; flex-direction:column; gap:6px; }
      .cl-scc-card em { font-style:normal; font-size:52px; }
      .cl-scc-card span { color:#f472b6; font-weight:700; letter-spacing:0.14em; }
      .cl-scc-cover { position:absolute; inset:0; cursor:crosshair;
        background:
          repeating-linear-gradient(-45deg, #6d28d9 0 14px, #8b5cf6 14px 28px); }
      .cl-scc-hint { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:1;
        pointer-events:none; color:rgba(255,255,255,0.75); font-size:12px; letter-spacing:0.22em; }
    </style>
    <div class="cl-scc"><div class="cl-scc-card">
      <em>${emoji}</em><span>${label}</span>
      <canvas class="cl-scc-cover" width="480" height="300"></canvas>
    </div></div>
  `;

  const canvas = container.querySelector('.cl-scc-cover') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const card = canvas.parentElement as HTMLElement;

  const paint = () => {
    const w = card.clientWidth, h = card.clientHeight;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#7c3aed'); g.addColorStop(1, '#a78bfa');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '600 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH ME', w / 2, h / 2 + 4);
  };
  paint();

  let down = false;
  let cleared = false;
  const scratch = (e: PointerEvent) => {
    if (!down) return;
    const r = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 26, 0, Math.PI * 2);
    ctx.fill();
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < img.length; i += 40) if (img[i] === 0) clear++;
    if (!cleared && clear > img.length / 40 * 0.55) {
      cleared = true;
      canvas.style.transition = 'opacity .4s';
      canvas.style.opacity = '0';
    }
  };
  const onDown = (e: PointerEvent) => { down = true; scratch(e); };
  const onUp = () => { down = false; };

  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointermove', scratch);

  return () => {
    canvas.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointermove', scratch);
    container.innerHTML = '';
  };
}
