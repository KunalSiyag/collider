export interface PinArtToyOptions {
  cols?: number;
}

export function createPinArtToy(
  container: HTMLElement,
  options: PinArtToyOptions = {},
): () => void {
  const n = Math.max(5, Math.min(options.cols ?? 7, 9));
  let pins = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      pins += `<button class="cl-n81-pin" data-r="${r}" data-c="${c}" aria-label="pin"></button>`;
    }
  }

  container.innerHTML = `
    <style>
      .cl-n81 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px;
        background:radial-gradient(circle at 50% 25%,#1e1b4b,#09090b); perspective:800px; }
      .cl-n81-frame { position:relative; width:min(62%,250px); aspect-ratio:1; padding:14px; border-radius:16px;
        background:linear-gradient(#3f3f46,#18181b); border:2px solid #52525b;
        transform-style:preserve-3d; transform:rotateX(26deg); will-change:transform;
        box-shadow:-18px 28px 56px rgba(0,0,0,.65); }
      .cl-n81-grid { position:relative; height:100%; display:grid; grid-template-columns:repeat(${n},1fr);
        grid-template-rows:repeat(${n},1fr); gap:6px; }
      .cl-n81-pin { border:none; border-radius:4px; cursor:pointer;
        background:#a78bfa; box-shadow:inset 0 -4px 0 rgba(76,29,149,.8), inset 0 2px 0 rgba(255,255,255,.35);
        transition:translateY .18s cubic-bezier(.3,.85,.35,1.2), background .18s; will-change:transform; }
      .cl-n81-pin.out { translateY(-46%); background:#67e8f9; box-shadow:0 6px 12px rgba(103,232,249,.3), inset 0 2px 0 rgba(255,255,255,.45); }
      .cl-n81-hint { color:#a78bfa99; font-size:10px; letter-spacing:.32em; text-transform:uppercase; }
    </style>
    <div class="cl-n81">
      <div class="cl-n81-frame"><div class="cl-n81-grid">${pins}</div></div>
      <div class="cl-n81-hint">Drag across the pins</div>
    </div>
  `;

  const frame = container.querySelector<HTMLElement>('.cl-n81-frame')!;
  const pinEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-n81-pin'));

  function onDown(e: PointerEvent) {
    e.preventDefault();
    const move = (ev: PointerEvent) => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      if (el && el.classList.contains('cl-n81-pin')) el.classList.toggle('out');
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  frame.addEventListener('pointerdown', onDown);

  let raf = 0;
  const t = { rx: 26 };
  const c = { rx: 26 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    frame.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 26 + ((e.clientY - rect.top) / rect.height - 0.5) * -22;
  }

  function onLeave() {
    t.rx = 26;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    frame.removeEventListener('pointerdown', onDown);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
