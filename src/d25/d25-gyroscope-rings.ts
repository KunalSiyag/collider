export interface GyroscopeRingsOptions {
  rings?: number;
}

export function createGyroscopeRings(
  container: HTMLElement,
  options: GyroscopeRingsOptions = {},
): () => void {
  const n = Math.max(2, Math.min(options.rings ?? 3, 4));

  const rings = Array.from({ length: n }, (_, i) => `<div class="cl-n60-ring r${i}"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n60 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 40%,#141420,#05050a); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n60-gyro { position:relative; width:min(56%,230px); aspect-ratio:1; transform-style:preserve-3d; will-change:transform; }
      .cl-n60-ring { position:absolute; inset:0; border-radius:50%; border:5px solid var(--c);
        box-shadow:0 0 20px color-mix(in srgb, var(--c) 45%, transparent), inset 0 0 20px rgba(0,0,0,.4); }
      .cl-n60-ring.r0 { --c:#8b5cf6; animation:cl-n60-a 6s linear infinite; }
      .cl-n60-ring.r1 { --c:#22d3ee; inset:7%; animation:cl-n60-b 5s linear infinite reverse; }
      .cl-n60-ring.r2 { --c:#f472b6; inset:14%; animation:cl-n60-c 4.4s linear infinite; }
      .cl-n60-ring.r3 { --c:#a78bfa; inset:20%; animation:cl-n60-b 6.6s linear infinite reverse; }
      @keyframes cl-n60-a { to { rotate:x 360deg; } from { rotate:x 0deg; } }
      @keyframes cl-n60-b { to { rotate:y 360deg; } from { rotate:y 0deg; } }
      @keyframes cl-n60-c { to { rotate:z 360deg; } from { rotate:z 0deg; } }
      .cl-n60-core { position:absolute; left:50%; top:50%; width:26px; height:26px; margin:-13px 0 0 -13px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#fef9c3,#ca8a04 62%,#713f12);
        box-shadow:0 0 26px rgba(254,249,195,.75); z-index:2; }
      .cl-n60-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n60">
      <div class="cl-n60-gyro">${rings}<div class="cl-n60-core"></div></div>
      <div class="cl-n60-hint">Click to slow</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n60')!;
  const gyro = root.querySelector<HTMLElement>('.cl-n60-gyro')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.08;
    c.ry += (t.ry - c.ry) * 0.08;
    gyro.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    const slowed = root.dataset.slow === '1';
    root.dataset.slow = slowed ? '0' : '1';
    root.querySelectorAll<HTMLElement>('.cl-n60-ring').forEach((r) => {
      r.style.animationDuration = '';
    });
    if (!slowed) {
      root.querySelectorAll<HTMLElement>('.cl-n60-ring').forEach((r) => {
        r.style.animationDuration = '18s';
      });
    }
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
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
