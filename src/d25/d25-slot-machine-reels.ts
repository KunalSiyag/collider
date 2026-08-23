export interface SlotMachineReelsOptions {
  label?: string;
}

export function createSlotMachineReels(
  container: HTMLElement,
  options: SlotMachineReelsOptions = {},
): () => void {
  const { label = 'JACKPOT?' } = options;
  const symbols = ['7', '★', '♦', '●', '▲'];

  const reels = Array.from({ length: 3 }, (_, r) => {
    const strip = Array.from({ length: symbols.length * 2 }, (_, i) =>
      `<span>${symbols[i % symbols.length]}</span>`).join('');
    return `<div class="cl-n64-reel" data-r="${r}">${strip}</div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n65 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:radial-gradient(circle at 50% 25%,#1e1b4b,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n65-cab { position:relative; width:min(56%,230px); height:62%; border-radius:16px;
        background:linear-gradient(160deg,#4c1d95,#18181b 75%); border:1px solid #6d28d955;
        transform-style:preserve-3d; transform:rotateX(12deg); will-change:transform;
        box-shadow:-16px 26px 54px rgba(76,29,149,.28), inset 0 3px 0 rgba(255,255,255,.08); }
      .cl-n65-marquee { position:absolute; top:5%; left:8%; right:8%; text-align:center; color:#fbbf24;
        font-size:11px; letter-spacing:.36em; text-transform:uppercase; text-shadow:0 0 14px rgba(251,191,36,.7); }
      .cl-n65-window { position:absolute; top:20%; left:9%; right:9%; height:42%; border-radius:10px;
        background:#0b0b10; border:2px solid #27272a; overflow:hidden; display:flex; gap:5%; padding:0 5%;
        transform-style:preserve-3d; }
      .cl-n65-reel { flex:1; display:flex; flex-direction:column; align-items:center; color:#67e8f9; font-size:22px;
        will-change:transform; }
      .cl-n65-reel span { line-height:1.9; }
      .cl-n65-lever { position:absolute; right:-9%; top:30%; width:10px; height:34%;
        transform-origin:center top; transition:transform .18s ease; }
      .cl-n65.lever .cl-n65-lever { transform:rotateZ(-24deg); }
      .cl-n65-lever::before { content:''; position:absolute; top:-13px; left:50%; width:19px; height:19px; margin-left:-9.5px;
        border-radius:50%; background:radial-gradient(circle at 35% 32%,#fb7185,#881337);
        box-shadow:0 0 14px rgba(251,113,133,.55); }
      .cl-n65-hint { color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n65">
      <div class="cl-n65-cab">
        <div class="cl-n65-marquee">${label}</div>
        <div class="cl-n65-window">${reels}</div>
        <div class="cl-n65-lever"></div>
      </div>
      <div class="cl-n65-hint">Click to spin</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n65')!;
  const cab = root.querySelector<HTMLElement>('.cl-n65-cab')!;
  const reelEls = Array.from(root.querySelectorAll<HTMLElement>('.cl-n64-reel'));

  let raf = 0;
  const t = { rx: 12 };
  const c = { rx: 12 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    cab.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  let spinning = false;

  function onClick() {
    if (spinning) return;
    spinning = true;
    root.classList.add('lever');
    reelEls.forEach((reel, i) => {
      reel.animate(
        [
          { transform: 'translateY(0)' },
          { transform: `translateY(calc(-100% + ${symbols.length}em))` },
          { transform: 'translateY(0)' },
        ],
        { duration: 900 + i * 450, easing: 'cubic-bezier(.2,.6,.3,1)', iterations: 1 },
      );
    });
    setTimeout(() => {
      root.classList.remove('lever');
      spinning = false;
    }, 1900);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 12 + ((e.clientY - rect.top) / rect.height - 0.5) * -18;
  }

  function onLeave() {
    t.rx = 12;
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
