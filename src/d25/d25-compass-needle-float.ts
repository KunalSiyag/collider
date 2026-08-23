export interface CompassNeedleFloatOptions {
  label?: string;
}

export function createCompassNeedleFloat(
  container: HTMLElement,
  options: CompassNeedleFloatOptions = {},
): () => void {
  const { label = 'N 42° W' } = options;

  container.innerHTML = `
    <style>
      .cl-n100 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:
          radial-gradient(circle at 40% 25%, rgba(251,191,36,.08), transparent 44%),
          radial-gradient(circle at 50% 60%, #1c1917, #0b0b10); perspective:800px; }
      .cl-n100-case { position:relative; width:min(56%,220px); aspect-ratio:.9;
        transform-style:preserve-3d; will-change:transform;
        animation:cl-n100-float 5s ease-in-out infinite alternate; }
      @keyframes cl-n100-float { from { translate:0 -6px; } to { translate:0 8px; } }
      .cl-n100-brass { position:absolute; inset:0; border-radius:14px 14px 999px 999px / 12px 12px 160px 160px;
        background:linear-gradient(#fbbf24aa,#713f1288);
        clip-path:polygon(0 0,100% 0,100% 78%,50% 100%,0 78%);
        box-shadow:-12px 18px 38px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.35); }
      .cl-n100-glass { position:absolute; inset:7% 9%; border-radius:50%;
        background:
          repeating-conic-gradient(from 0deg, rgba(254,243,199,.22) 0 1.5deg, transparent 1.5deg 15deg),
          radial-gradient(circle at 40% 34%, rgba(254,243,199,.14), transparent 46%),
          radial-gradient(circle, #0c0a09ee 58%, #1c1917);
        border:2px solid #78716c66;
        box-shadow:inset 0 4px 14px rgba(0,0,0,.55);
        overflow:hidden; }
      .cl-n100-cardinal { position:absolute; color:#fef9c399; font-size:11px; letter-spacing:.05em; font-weight:700; }
      .cl-n100-needle { position:absolute; left:50%; top:50%; width:7px; height:64%;
        margin-left:-3.5px; transform-origin:center center; will-change:transform;
        transform-style:preserve-3d; }
      .cl-n100-needle::before { content:''; position:absolute; top:0; left:0; width:100%; height:52%;
        clip-path:polygon(50% 0,100% 100%,0 100%); background:#f43f5e; box-shadow:0 0 12px rgba(244,63,94,.6); }
      .cl-n100-needle::after { content:''; position:absolute; bottom:0; left:0; width:100%; height:48%;
        clip-path:polygon(0 0,100% 0,50% 100%); background:#e4e4e7; }
      .cl-n100-cap { position:absolute; left:50%; top:50%; width:12px; height:12px; margin:-6px 0 0 -6px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fde68a,#92400e); z-index:2; }
      .cl-n100-tag { color:#d6d3d1aa; font-size:11px; letter-spacing:.34em; text-transform:uppercase; }
    </style>
    <div class="cl-n100">
      <div class="cl-n100-case">
        <div class="cl-n100-brass"></div>
        <div class="cl-n100-glass">
          <span class="cl-n100-cardinal" style="top:6px;left:50%;translate:-50% 0">N</span>
          <span class="cl-n100-cardinal" style="bottom:6px;left:50%;translate:-50% 0">S</span>
          <span class="cl-n100-cardinal" style="left:6px;top:50%;translate:0 -50%">W</span>
          <span class="cl-n100-cardinal" style="right:6px;top:50%;translate:0 -50%">E</span>
          <div class="cl-n100-needle"></div>
          <div class="cl-n100-cap"></div>
        </div>
      </div>
      <span class="cl-n100-tag">${label}</span>
    </div>
  `;

  const caseEl = container.querySelector<HTMLElement>('.cl-n100-case')!;
  const needle = container.querySelector<HTMLElement>('.cl-n100-needle')!;
  const tag = container.querySelector<HTMLElement>('.cl-n100-tag')!;

  let raf = 0;
  let angle = 24;
  const target = { rx: 0, ry: 0 };
  const cur = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.rx += (target.rx - cur.rx) * 0.08;
    cur.ry += (target.ry - cur.ry) * 0.08;
    caseEl.style.transform = `rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  const headings = [24, 118, 205, 312];
  let idx = 0;

  function onClick() {
    idx = (idx + 1) % headings.length;
    angle = headings[idx];
    needle.style.transform = `rotateZ(${angle}deg)`;
    tag.textContent = `HDG ${angle}°`;
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    target.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    target.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
  }

  function onLeave() {
    target.rx = 0;
    target.ry = 0;
  }

  container.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
