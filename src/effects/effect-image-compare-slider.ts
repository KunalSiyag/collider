export interface EffectOptions {
  before?: string;
  after?: string;
}

export function createImageCompareSlider(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { before = '🌙', after = '☀️' } = options;

  container.innerHTML = `
    <style>
      .cl-ics { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-ics-box { position:relative; width:min(100%,420px); aspect-ratio:16/10; border-radius:16px; overflow:hidden;
        cursor:ew-resize; user-select:none; touch-action:none;
        border:1px solid rgba(255,255,255,0.14); }
      .cl-ics-side { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:84px; }
      .cl-ics-a { background:linear-gradient(150deg,#fbbf24,#f97316); }
      .cl-ics-b-wrap { position:absolute; inset:0; overflow:hidden; }
      .cl-ics-b { background:linear-gradient(150deg,#1e1b4b,#0f172a); width:100%; height:100%; }
      .cl-ics-handle { position:absolute; top:0; bottom:0; left:50%; width:3px; margin-left:-1.5px; background:#fff;
        box-shadow:0 0 12px rgba(255,255,255,0.8); z-index:2; pointer-events:none; }
      .cl-ics-handle::after { content:'⇔'; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        width:34px; height:34px; border-radius:50%; background:#18181b; border:1.5px solid #fff;
        display:flex; align-items:center; justify-content:center; font-size:15px; color:#fff; }
      .cl-ics-tag { position:absolute; bottom:10px; font-size:11px; letter-spacing:0.18em; color:#fff;
        background:rgba(0,0,0,0.45); padding:4px 10px; border-radius:999px; z-index:1; }
    </style>
    <div class="cl-ics"><div class="cl-ics-box">
      <div class="cl-ics-side cl-ics-a">${after}<span class="cl-ics-tag" style="right:10px">AFTER</span></div>
      <div class="cl-ics-b-wrap" style="width:50%">
        <div class="cl-ics-side cl-ics-b">${before}<span class="cl-ics-tag" style="left:10px">BEFORE</span></div>
      </div>
      <div class="cl-ics-handle"></div>
    </div></div>
  `;

  const root = container.querySelector('.cl-ics-box') as HTMLElement;
  const wrap = container.querySelector('.cl-ics-b-wrap') as HTMLElement;
  const handle = container.querySelector('.cl-ics-handle') as HTMLElement;
  let down = false;
  const setPct = (clientX: number) => {
    const r = root.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
    wrap.style.width = `${pct}%`;
    handle.style.left = `${pct}%`;
  };
  const onDown = (e: PointerEvent) => { down = true; setPct(e.clientX); };
  const onMove = (e: PointerEvent) => { if (down) setPct(e.clientX); };
  const onUp = () => { down = false; };
  root.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);

  return () => {
    root.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    container.innerHTML = '';
  };
}
