export interface HuePickerOptions {
  label?: string;
}

export function createHuePickerButton(container: HTMLElement, options: HuePickerOptions = {}): () => void {
  const { label = 'Pick hue' } = options;

  container.innerHTML = `
    <style>
      .cl-hp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px;
        font-size:13.5px; font-weight:700; color:#a1a1aa; font-variant-numeric:tabular-nums; }
      .cl-hp-btn { position:relative; width:170px; height:44px; border:none; border-radius:10px; cursor:pointer;
        background:linear-gradient(90deg, hsl(0 80% 60%), hsl(60 80% 60%), hsl(120 80% 60%),
          hsl(180 80% 60%), hsl(240 80% 60%), hsl(300 80% 60%), hsl(360 80% 60%));
        transition:transform .15s ease, box-shadow .2s ease; }
      .cl-hp-btn:hover { transform:scaleY(1.12); }
      .cl-hp-btn:focus-visible { outline:2px solid #fff; outline-offset:3px; }
      .cl-hp-cursor { position:absolute; top:-6px; bottom:-6px; width:5px; border-radius:3px; background:#fff;
        box-shadow:0 0 8px rgba(255,255,255,.9); pointer-events:none; }
    </style>
    <div class="cl-hp">
      <button type="button" class="cl-hp-btn" aria-label="${label}"><span class="cl-hp-cursor" style="left:30%"></span></button>
      <span class="cl-hp-val">108°</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-hp-btn')!;
  const cursor = container.querySelector<HTMLElement>('.cl-hp-cursor')!;
  const val = container.querySelector<HTMLElement>('.cl-hp-val')!;
  let hue = 108;

  function onClick(e: MouseEvent) {
    const r = btn.getBoundingClientRect();
    hue = Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360));
    cursor.style.left = `calc(${(hue / 360) * 100}% - 2.5px)`;
    val.textContent = `${Math.round(hue)}°`;
    btn.style.boxShadow = `0 0 18px hsla(${hue}, 80%, 60%, .55)`;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
