export interface WindChimeTubesOptions {
  tubes?: number;
}

export interface WindChimeTubesOptions {
  tubes?: number;
}

export function createWindChimeTubes(
  container: HTMLElement,
  options: WindChimeTubesOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.tubes ?? 6, 8));

  const tubes = Array.from({ length: n }, (_, i) => {
    const len = (34 + ((i * 13) % 22)).toFixed(0);
    const hue = ['#b45309', '#fbbf24', '#67e8f9'][i % 3];
    return `<div class="cl-n116-tube" style="--x:${(14 + i * (72 / n)).toFixed(0)}%;--l:${len}px;--c:${hue};--d:${(-i * 0.7).toFixed(1)}s;--sw:${(2.6 + (i % 3) * 0.6).toFixed(1)}s"><i class="cl-n116-cord"></i><i class="cl-n116-pipe"></i></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n116 { height:100%; position:relative; overflow:hidden;
        background:
          radial-gradient(circle at 60% 20%, rgba(103,232,249,.08), transparent 44%),
          linear-gradient(#1c1917,#0c0a09); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n116-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; }
      .cl-n116-top { position:absolute; top:9%; left:50%; width:34%; height:12px; margin-left:-17%;
        border-radius:999px;
        background:
          repeating-conic-gradient(from 0deg, rgba(254,243,199,.3) 0 10deg, transparent 10deg 30deg),
          linear-gradient(#d97706,#78350f);
        box-shadow:-8px 8px 18px rgba(120,53,15,.35); z-index:2; }
      .cl-n116-tube { position:absolute; left:var(--x); top:calc(9% + 8px);
        transform-origin:center top; will-change:transform;
        animation:cl-n116-sway var(--sw) ease-in-out infinite alternate; animation-delay:var(--d); }
      @keyframes cl-n116-sway { from { rotate:2.5deg; } to { rotate:-2.5deg; } }
      .cl-n116-cord { position:absolute; top:0; left:50%; width:1.5px; height:16px; margin-left:-.75px; background:#a8a29e88; }
      .cl-n116-pipe { position:absolute; top:15px; left:50%; width:11px; height:var(--l); margin-left:-5.5px;
        border-radius:999px;
        background:
          repeating-linear-gradient(0deg, rgba(255,255,255,.14) 0 4px, transparent 4px 9px),
          linear-gradient(90deg, color-mix(in srgb, var(--c) 70%, black), var(--c) 40%, color-mix(in srgb, var(--c) 55%, black));
        box-shadow:0 8px 16px rgba(0,0,0,.4); }
      .cl-n116-clapper { position:absolute; left:48%; top:calc(9% + 24px + var(--mid, 40px)); width:14px; height:14px;
        border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fef3c7,#92400e);
        box-shadow:-4px 6px 12px rgba(0,0,0,.4);
        animation:cl-n116-knock 2.4s ease-in-out infinite alternate; }
      @keyframes cl-n116-knock { from { translate:-7px 0; } to { translate:7px 0; } }
      .cl-n116-note { position:absolute; left:var(--x); top:calc(9% + var(--l,40px) + 26px); color:#fde68aaa;
        font-size:13px; opacity:0; pointer-events:none;
        transition:opacity .3s, translateY .8s ease; }
      .cl-n116.chime .cl-n116-note { opacity:1; translateY:-16px; }
      .cl-n116-tag { position:absolute; bottom:12px; left:16px; color:#d6d3d177; font-size:10px; letter-spacing:.42em; text-transform:uppercase; }
    </style>
    <div class="cl-n116">
      <div class="cl-n116-scene">
        <div class="cl-n116-top"></div>
        ${tubes}
        <div class="cl-n116-clapper" style="--mid:44px"></div>
        <span class="cl-n116-tag">${'BREEZE'}</span>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n116')!;
  const scene = root.querySelector<HTMLElement>('.cl-n116-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.06;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  let timer = 0;

  function onClick() {
    root.classList.add('chime');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => root.classList.remove('chime'), 900);
  }

  root.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(timer);
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
