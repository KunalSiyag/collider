export interface AbacusFrame3DOptions {
  rods?: number;
}

export function createAbacusFrame3D(
  container: HTMLElement,
  options: AbacusFrame3DOptions = {},
): () => void {
  const n = Math.max(5, Math.min(options.rods ?? 7, 9));

  const rods = Array.from({ length: n }, (_, r) => {
    const beads = Array.from({ length: 5 }, (_, b) => {
      const hue = ['#a78bfa', '#67e8f9', '#f472b6'][b % 3];
      return `<button class="cl-n50-bead" style="--c:${hue}" data-r="${r}" aria-label="bead"></button>`;
    }).join('');
    return `<div class="cl-n50-rod" style="--i:${r}">${beads}</div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n50 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 55% 20%,#1c1917,#09090b); perspective:800px; }
      .cl-n50-frame { position:relative; width:min(64%,270px); height:60%; padding:12px 16px;
        border-radius:12px; background:linear-gradient(150deg,#3f3f46,#18181b);
        border:2px solid #52525b; transform-style:preserve-3d;
        transform:rotateX(30deg) rotateZ(-6deg); will-change:transform;
        box-shadow:-18px 26px 56px rgba(0,0,0,.65), inset 0 3px 0 rgba(255,255,255,.07);
        display:flex; gap:${(100 / n / 2).toFixed(1)}%; justify-content:center; }
      .cl-n50-rod { position:relative; flex:1; background:linear-gradient(#71717a44,#27272a);
        border-radius:999px; display:flex; align-items:center; justify-content:center; gap:4px; }
      .cl-n50-bead { width:70%; aspect-ratio:.8; max-width:24px; border:none; border-radius:8px; cursor:pointer;
        background:radial-gradient(circle at 34% 28%, color-mix(in srgb, var(--c) 80%, white), var(--c) 55%, #101014);
        box-shadow:0 4px 8px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.35);
        transition:translateY .22s cubic-bezier(.3,.85,.35,1.15), transform .22s ease; }
      .cl-n50-bead.up { translate:0% -160%; transform:rotateX(14deg); box-shadow:0 -4px 10px rgba(0,0,0,.4); }
    </style>
    <div class="cl-n50"><div class="cl-n50-frame">${rods}</div></div>
  `;

  const frame = container.querySelector<HTMLElement>('.cl-n50-frame')!;

  let raf = 0;
  const t = { rx: 30, rz: -6 };
  const c = { rx: 30, rz: -6 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    c.rz += (t.rz - c.rz) * 0.09;
    frame.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateZ(${c.rz.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  const beadEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-n50-bead'));
  const handlers = beadEls.map((bead) => {
    const h = () => bead.classList.toggle('up');
    bead.addEventListener('click', h);
    return { bead, h };
  });

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rz = -6 + ((e.clientX - rect.left) / rect.width - 0.5) * 26;
    t.rx = 30 + ((e.clientY - rect.top) / rect.height - 0.5) * -20;
  }

  function onLeave() {
    t.rx = 30;
    t.rz = -6;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    handlers.forEach(({ bead, h }) => bead.removeEventListener('click', h));
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
