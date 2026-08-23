export interface SkipTrackOptions {
  label?: string;
}

export function createSkipTrackButton(container: HTMLElement, options: SkipTrackOptions = {}): () => void {
  const { label = 'Next track' } = options;

  container.innerHTML = `
    <style>
      .cl-sk { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px; }
      .cl-sk-btn { display:flex; align-items:center; justify-content:center; width:52px; height:52px;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:50%; cursor:pointer;
        transition:all .18s ease; }
      .cl-sk-btn:hover { border-color:#22d3ee; color:#67e8f9; box-shadow:0 0 16px rgba(34,211,238,.35); }
      .cl-sk-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-sk-btn:active { transform:scale(.9); }
      .cl-sk-glyph { font-size:17px; letter-spacing:-2px; }
      .cl-sk-title { font-size:14px; font-weight:600; color:#a1a1aa; min-width:120px; text-align:left; }
    </style>
    <div class="cl-sk">
      <button type="button" class="cl-sk-btn" aria-label="Previous track"><span class="cl-sk-glyph">◀◀</span></button>
      <button type="button" class="cl-sk-btn" aria-label="${label}"><span class="cl-sk-glyph">▶▶</span></button>
      <span class="cl-sk-title" aria-live="polite">Midnight Drive</span>
    </div>
  `;

  const prev = container.querySelector<HTMLButtonElement>('.cl-sk-btn:nth-of-type(1)')!;
  const next = container.querySelector<HTMLButtonElement>('.cl-sk-btn:nth-of-type(2)')!;
  const title = container.querySelector<HTMLElement>('.cl-sk-title')!;
  const tracks = ['Midnight Drive', 'Neon Skyline', 'Violet Static', 'Cyan Waves'];
  let idx = 0;
  let animating = false;

  function skip(dir: number) {
    if (animating) return;
    animating = true;
    idx = (idx + dir + tracks.length) % tracks.length;
    title.animate(
      [
        { opacity: 0, transform: `translateX(${dir * 24}px)` },
        { opacity: 1, transform: 'translateX(0)' },
      ],
      { duration: 260, easing: 'ease-out' },
    ).onfinish = () => { title.textContent = tracks[idx]; animating = false; };
  }

  function onNext() { skip(1); }
  function onPrev() { skip(-1); }
  next.addEventListener('click', onNext);
  prev.addEventListener('click', onPrev);

  return () => {
    next.removeEventListener('click', onNext);
    prev.removeEventListener('click', onPrev);
    container.innerHTML = '';
  };
}
