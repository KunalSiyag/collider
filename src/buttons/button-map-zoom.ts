export interface MapZoomOptions {
  label?: string;
}

export function createMapZoomButton(container: HTMLElement, options: MapZoomOptions = {}): () => void {
  const { label = 'Zoom' } = options;

  container.innerHTML = `
    <style>
      .cl-mz { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px; }
      .cl-mz-col { display:flex; flex-direction:column; border-radius:10px; overflow:hidden;
        border:1px solid #3f3f46; }
      .cl-mz-btn { width:44px; height:40px; font-size:19px; font-weight:800; color:#e4e4e7;
        background:#16161f; border:none; cursor:pointer; transition:background .2s ease, color .2s ease; }
      .cl-mz-btn + .cl-mz-btn { border-top:1px solid #3f3f46; }
      .cl-mz-btn:hover { background:#8b5cf6; color:#fff; }
      .cl-mz-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:-3px; z-index:1; position:relative; }
      .cl-mz-btn:active { background:#7c3aed; }
      .cl-mz-level { font-size:13.5px; font-weight:700; color:#a1a1aa; min-width:52px; }
    </style>
    <div class="cl-mz">
      <span class="cl-mz-col" role="group" aria-label="${label}">
        <button type="button" class="cl-mz-btn" aria-label="Zoom in">+</button>
        <button type="button" class="cl-mz-btn" aria-label="Zoom out">−</button>
      </span>
      <span class="cl-mz-level">100%</span>
    </div>
  `;

  const btns = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-mz-btn'));
  const levelEl = container.querySelector<HTMLElement>('.cl-mz-level')!;
  let level = 100;

  function zoom(dir: number) {
    return () => {
      level = Math.max(50, Math.min(200, level + dir * 25));
      levelEl.textContent = `${level}%`;
      levelEl.animate([{ color: '#67e8f9' }, { color: '' }], { duration: 400 });
    };
  }

  const inH = zoom(1);
  const outH = zoom(-1);
  btns[0].addEventListener('click', inH);
  btns[1].addEventListener('click', outH);

  return () => {
    btns[0].removeEventListener('click', inH);
    btns[1].removeEventListener('click', outH);
    container.innerHTML = '';
  };
}
