export interface EffectOptions {
  value?: number;
}

export function createVolumeKnobRotate(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { value = 65 } = options;

  container.innerHTML = `
    <style>
      .cl-vkr { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px;
        background:#0b0b10; }
      .cl-vkr-knob { position:relative; width:150px; height:150px; border-radius:50%; cursor:grab;
        background:radial-gradient(circle at 34% 30%, #2b2b3d, #13131c 70%);
        border:1px solid rgba(255,255,255,0.12); box-shadow:0 16px 36px rgba(0,0,0,0.55);
        touch-action:none; }
      .cl-vkr-knob:active { cursor:grabbing; }
      .cl-vkr-ind { position:absolute; top:10px; left:50%; margin-left:-3px; width:6px; height:26px;
        border-radius:4px; background:linear-gradient(#67e8f9,#22d3ee);
        transform-origin:50% calc(75px - 10px); box-shadow:0 0 10px rgba(34,211,238,0.8); }
      .cl-vkr-val { font-size:30px; font-weight:800; color:#fafafa; font-variant-numeric:tabular-nums; }
      .cl-vkr-hint { color:rgba(255,255,255,0.45); font-size:12px; letter-spacing:0.14em; }
    </style>
    <div class="cl-vkr">
      <div class="cl-vkr-knob"><div class="cl-vkr-ind"></div></div>
      <div class="cl-vkr-val">${value}</div>
      <div class="cl-vkr-hint">DRAG TO ADJUST</div>
    </div>
  `;

  const knob = container.querySelector('.cl-vkr-knob') as HTMLElement;
  const ind = knob.querySelector('.cl-vkr-ind') as HTMLElement;
  const val = container.querySelector('.cl-vkr-val')!;
  let v = value;
  const set = () => {
    ind.style.transform = `rotate(${-135 + (v / 100) * 270}deg)`;
    val.textContent = String(v);
  };
  set();

  let dragging = false, startY = 0, startV = 0;
  const onDown = (e: PointerEvent) => { dragging = true; startY = e.clientY; startV = v; };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    v = Math.max(0, Math.min(100, Math.round(startV + (startY - e.clientY) * 0.8)));
    set();
  };
  const onUp = () => { dragging = false; };
  knob.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);

  return () => {
    knob.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    container.innerHTML = '';
  };
}
