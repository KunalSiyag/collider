export interface DepthSlidePuzzleOptions {
  size?: number;
}

export function createDepthSlidePuzzle(
  container: HTMLElement,
  options: DepthSlidePuzzleOptions = {},
): () => void {
  const n = Math.min(Math.max(options.size ?? 3, 2), 4);

  const tiles = Array.from({ length: n * n - 1 }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'][i % 4];
    return `<button class="cl-n05-tile" data-v="${i + 1}" style="--c:${hue}">${i + 1}</button>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n05 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:#0b0b10; perspective:900px; }
      .cl-n05-board { position:relative; width:min(58%,240px); aspect-ratio:1; display:grid;
        grid-template-columns:repeat(${n},1fr); gap:6px; padding:8px; border-radius:16px;
        background:#18181b; border:1px solid #3f3f46; transform-style:preserve-3d;
        transform:rotateX(18deg); box-shadow:0 30px 60px rgba(0,0,0,.55); }
      .cl-n05-tile { position:relative; border:none; border-radius:10px; cursor:pointer; color:#fafafa; font-weight:700;
        background:linear-gradient(160deg,var(--c),#101014); transform-style:preserve-3d;
        transition:transform .25s ease, translate .25s ease; }
      .cl-n05-tile:hover { transform:translateZ(20px); box-shadow:0 14px 26px rgba(0,0,0,.5); }
      .cl-n05-hint { color:#71717a; font-size:11px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n05">
      <div class="cl-n05-board">${tiles}</div>
      <div class="cl-n05-hint">Click a tile to slide</div>
    </div>
  `;

  const board = container.querySelector<HTMLElement>('.cl-n05-board')!;
  const tileEls = Array.from(board.querySelectorAll<HTMLElement>('.cl-n05-tile'));

  const state: (number | null)[] = Array.from({ length: n * n }, (_, i) =>
    i === n * n - 1 ? null : i + 1,
  );

  function render() {
    state.forEach((v, idx) => {
      if (v === null) return;
      const el = tileEls[v - 1];
      el.style.gridArea = `${Math.floor(idx / n) + 1} / ${String((idx % n) + 1)}`;
    });
  }

  function onClick(e: Event) {
    const el = e.currentTarget as HTMLElement;
    const v = Number(el.dataset.v);
    const from = state.indexOf(v);
    const blank = state.indexOf(null);
    const fr = Math.floor(from / n);
    const fc = from % n;
    const br = Math.floor(blank / n);
    const bc = blank % n;
    if (Math.abs(fr - br) + Math.abs(fc - bc) === 1) {
      [state[from], state[blank]] = [state[blank], state[from]];
      render();
    }
  }

  tileEls.forEach((el) => el.addEventListener('click', onClick));
  render();

  return () => {
    tileEls.forEach((el) => el.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
