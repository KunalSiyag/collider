export interface ChessboardTiltOptions {
  cells?: number;
}

export function createChessboardTilt(
  container: HTMLElement,
  options: ChessboardTiltOptions = {},
): () => void {
  const n = Math.min(Math.max(options.cells ?? 8, 4), 8);
  const pieces: Record<string, string> = { e4: '♞' };

  let grid = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const dark = (r + c) % 2 === 0;
      const key = `${'abcdefgh'[c]}${n - r}`;
      const piece = pieces[key] ?? '';
      grid += `<div class="cl-n12-cell ${dark ? 'dk' : 'lt'}" data-r="${r}" data-c="${c}">${piece}</div>`;
    }
  }

  container.innerHTML = `
    <style>
      .cl-n12 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(#1c1917,#0b0b10); perspective:1000px; }
      .cl-n12-board { width:min(66%,300px); aspect-ratio:1; display:grid; grid-template-columns:repeat(${n},1fr);
        border-radius:10px; overflow:hidden; transform-style:preserve-3d; will-change:transform;
        box-shadow:0 40px 80px rgba(0,0,0,.65), 0 0 0 6px #27272a, 0 0 0 7px #3f3f46; }
      .cl-n12-cell { aspect-ratio:1; display:flex; align-items:center; justify-content:center; font-size:${Math.round(240 / n / 1.4)}px;
        transition:transform .2s ease; will-change:transform; }
      .cl-n12-cell.dk { background:#27272a; color:#a78bfa; }
      .cl-n12-cell.lt { background:#52525b33; color:#67e8f9; }
      .cl-n12-cell:hover { transform:translateZ(26px); box-shadow:inset 0 0 0 9999px rgba(139,92,246,.25), 0 12px 20px rgba(0,0,0,.4); }
    </style>
    <div class="cl-n12">
      <div class="cl-n12-board">${grid}</div>
    </div>
  `;

  const board = container.querySelector<HTMLElement>('.cl-n12-board')!;

  let raf = 0;
  const target = { rx: 0, ry: 0 };
  const cur = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.rx += (target.rx - cur.rx) * 0.1;
    cur.ry += (target.ry - cur.ry) * 0.1;
    board.style.transform = `translateZ(-30px) rotateX(${(52 + cur.rx).toFixed(2)}deg) rotateZ(${cur.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    target.rx = py * -26;
    target.ry = px * 30;
  }

  function onLeave() {
    target.rx = 0;
    target.ry = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
