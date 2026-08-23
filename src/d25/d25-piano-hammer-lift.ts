export interface PianoHammerLiftOptions {
  keys?: number;
}

export function createPianoHammerLift(
  container: HTMLElement,
  options: PianoHammerLiftOptions = {},
): () => void {
  const n = Math.max(7, Math.min(options.keys ?? 10, 14));
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  const keys = Array.from({ length: n }, (_, i) => {
    const isBlack = [1, 3, 6, 8, 10].includes(i % 12) && i < n - 1;
    return `<button class="cl-n69-key ${isBlack ? 'bk' : 'wt'}" data-note="${notes[i % 7]}${Math.floor(i / 7)}"></button>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n70 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 20%,#18181b,#09090b); perspective:800px; }
      .cl-n70-piano { position:relative; padding:16px 16px 22px; border-radius:12px;
        background:linear-gradient(#3f3f46,#101014); border:1px solid #52525b;
        transform-style:preserve-3d; transform:rotateX(36deg); will-change:transform;
        box-shadow:0 40px 70px rgba(0,0,0,.65); }
      .cl-n70-bed { position:relative; }
      .cl-n70-key { position:absolute; top:0; border:none; cursor:pointer; border-radius:4px;
        transition:translate .1s ease, box-shadow .1s ease; }
      .cl-n70-key.wt { height:110px; background:linear-gradient(#fafafa,#d4d4d8);
        box-shadow:0 5px 0 #a1a1aa, inset 0 -3px 8px rgba(0,0,0,.15); z-index:1; }
      .cl-n70-key.bk { height:68px; background:linear-gradient(#3f3f46,#101014);
        box-shadow:0 4px 0 #000, inset 0 -3px 6px rgba(255,255,255,.08); z-index:2; }
      .cl-n70-key.pressed { translate:0 4px; box-shadow:0 0 0 #000, 0 0 18px rgba(167,139,250,.75); }
      .cl-n70-hammer { position:absolute; left:50%; bottom:100%; width:100%; height:26px; margin-bottom:6px;
        pointer-events:none; opacity:.85; }
      .cl-n70-hammer::before { content:''; position:absolute; top:0; left:50%; width:9px; height:22px;
        margin-left:-4.5px; border-radius:4px; background:#f472b6; transform-origin:center bottom;
        transform:rotateZ(0deg); box-shadow:0 0 10px rgba(244,114,182,.45); }
      .cl-n70-key.pressed .cl-n70-hammer::before { animation:cl-n70-hit .25s ease; }
      @keyframes cl-n70-hit { 40% { transform:rotateZ(38deg); } }
      .cl-n70-note { position:absolute; top:-30px; color:#67e8f9; font-size:11px; letter-spacing:.1em;
        opacity:0; pointer-events:none; }
      .cl-n70-key.pressed ~ .cl-n70-note { opacity:1; }
    </style>
    <div class="cl-n70">
      <div class="cl-n70-piano"><div class="cl-n70-bed">${keys}</div></div>
    </div>
  `;

  const piano = container.querySelector<HTMLElement>('.cl-n70-piano')!;
  const bed = piano.querySelector<HTMLElement>('.cl-n70-bed')!;

  const keyEls = Array.from(bed.querySelectorAll<HTMLElement>('.cl-n70-key'));
  const whiteW = 28;
  let whiteIdx = 0;
  keyEls.forEach((k) => {
    if (k.classList.contains('bk')) {
      k.style.left = `${whiteIdx * whiteW - 9}px`;
      k.style.width = '20px';
    } else {
      k.style.left = `${whiteIdx * whiteW}px`;
      k.style.width = `${whiteW - 3}px`;
      whiteIdx += 1;
    }
    bed.style.width = `${whiteIdx * whiteW}px`;
    bed.style.height = '112px';
    const hammer = document.createElement('div');
    hammer.className = 'cl-n70-hammer';
    hammer.style.left = k.classList.contains('bk') ? '6px' : '10px';
    k.appendChild(hammer);
  });

  const handlers = keyEls.map((k) => {
    const h = () => {
      k.classList.add('pressed');
      setTimeout(() => k.classList.remove('pressed'), 160);
    };
    k.addEventListener('pointerdown', h);
    return { k, h };
  });

  let raf = 0;
  const t = { rx: 36 };
  const c = { rx: 36 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    piano.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 36 + ((e.clientY - rect.top) / rect.height - 0.5) * -28;
  }

  function onLeave() {
    t.rx = 36;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    handlers.forEach(({ k, h }) => k.removeEventListener('pointerdown', h));
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
