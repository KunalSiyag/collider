export interface EqualizerBars3DOptions {
  bars?: number;
}

export function createEqualizerBars3D(
  container: HTMLElement,
  options: EqualizerBars3DOptions = {},
): () => void {
  const n = Math.max(6, Math.min(options.bars ?? 12, 18));

  const bars = Array.from({ length: n }, (_, i) => {
    const hue = i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#22d3ee' : '#f472b6';
    return `<div class="cl-n73-col" style="--c:${hue};--i:${i}"><i></i></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n73 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 30%,#141420,#05050a); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n73-deck { display:flex; gap:7px; align-items:flex-end; padding:18px 22px 0;
        border-radius:14px 14px 0 0; background:linear-gradient(#18181b,#101014);
        border:1px solid #27272a; transform-style:preserve-3d;
        will-change:transform; transition:transform .5s ease; }
      .cl-n73-col { position:relative; width:16px; height:120px; transform-style:preserve-3d; }
      .cl-n73-col i { position:absolute; left:0; right:0; top:100%; height:100%;
        background:linear-gradient(180deg,var(--c),#101014); border-radius:3px;
        box-shadow:inset 0 2px 0 rgba(255,255,255,.35), 0 0 12px color-mix(in srgb, var(--c) 45%, transparent);
        animation:cl-n73-bounce 0.9s ease-in-out infinite alternate;
        animation-delay:calc(var(--i) * -0.13s);
        animation-play-state:var(--ps,running);
        transform-origin:bottom center; }
      @keyframes cl-n73-bounce { from { top:calc(100% - 14%); } to { top:calc(100% - 92%); } }
      .cl-n73-floor { width:min(78%,300px); height:10px; border-radius:0 0 10px 10px; background:#27272a;
        transform-origin:center top; transform:rotateX(58deg); box-shadow:0 16px 34px rgba(0,0,0,.55); }
      .cl-n73-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n73" style="display:flex;flex-direction:column;align-items:center;gap:0;position:relative;">
      <span class="cl-n73-hint">Click to freeze</span>
      <div class="cl-n73-deck">${bars}</div>
      <div class="cl-n73-floor"></div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n73')!;
  const deck = root.querySelector<HTMLElement>('.cl-n73-deck')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.08;
    c.ry += (t.ry - c.ry) * 0.08;
    deck.style.transform = `translateZ(0) rotateY(${c.ry.toFixed(2)}deg)`;
    root.querySelector<HTMLElement>('.cl-n73-floor')!.style.transform =
      `rotateX(${(58 + c.rx).toFixed(1)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    const paused = root.style.getPropertyValue('--ps') === 'paused';
    root.style.setProperty('--ps', paused ? 'running' : 'paused');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 36;
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
  }

  function onLeave() {
    t.rx = 0;
    t.ry = 0;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
