export interface VolumeSliderOptions {
  label?: string;
}

export function createVolumeSliderButton(container: HTMLElement, options: VolumeSliderOptions = {}): () => void {
  const { label = 'Volume' } = options;

  container.innerHTML = `
    <style>
      .cl-vs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px; }
      .cl-vs-btn { display:flex; align-items:center; gap:12px; padding:12px 20px; font-size:15px; font-weight:700;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        user-select:none; touch-action:none; transition:border-color .25s ease; }
      .cl-vs-btn:hover, .cl-vs-btn[data-drag="true"] { border-color:#22d3ee; }
      .cl-vs-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-vs-track { position:relative; width:110px; height:7px; border-radius:999px; background:#27272a; overflow:hidden; }
      .cl-vs-fill { height:100%; width:60%; background:linear-gradient(90deg,#22d3ee,#a78bfa); border-radius:inherit; }
      .cl-vs-knob { position:absolute; top:50%; left:60%; width:15px; height:15px; border-radius:50%;
        background:#fff; transform:translate(-50%,-50%); box-shadow:0 1px 5px rgba(0,0,0,.55); }
      .cl-vs-val { min-width:32px; text-align:right; font-variant-numeric:tabular-nums; }
    </style>
    <div class="cl-vs">
      <button type="button" class="cl-vs-btn" data-drag="false" aria-label="${label}: use arrow keys to adjust">
        🔊
        <span class="cl-vs-track"><span class="cl-vs-fill"></span><span class="cl-vs-knob"></span></span>
        <span class="cl-vs-val">60</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-vs-btn')!;
  const fill = container.querySelector<HTMLElement>('.cl-vs-fill')!;
  const knob = container.querySelector<HTMLElement>('.cl-vs-knob')!;
  const val = container.querySelector<HTMLElement>('.cl-vs-val')!;
  let level = 60;
  let dragging = false;

  function render() {
    fill.style.width = `${level}%`;
    knob.style.left = `${level}%`;
    val.textContent = String(Math.round(level));
  }

  function setFromEvent(e: PointerEvent) {
    const rect = btn.getBoundingClientRect();
    level = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    render();
  }

  function onDown(e: PointerEvent) {
    dragging = true;
    btn.dataset.drag = 'true';
    btn.setPointerCapture(e.pointerId);
    setFromEvent(e);
  }

  function onMove(e: PointerEvent) {
    if (dragging) setFromEvent(e);
  }

  function onUp(e: PointerEvent) {
    dragging = false;
    btn.dataset.drag = 'false';
    try { btn.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') level = Math.min(100, level + 5);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') level = Math.max(0, level - 5);
    else return;
    e.preventDefault();
    render();
  }

  btn.addEventListener('pointerdown', onDown);
  btn.addEventListener('pointermove', onMove);
  btn.addEventListener('pointerup', onUp);
  btn.addEventListener('keydown', onKey);
  render();

  return () => {
    btn.removeEventListener('pointerdown', onDown);
    btn.removeEventListener('pointermove', onMove);
    btn.removeEventListener('pointerup', onUp);
    btn.removeEventListener('keydown', onKey);
    container.innerHTML = '';
  };
}
