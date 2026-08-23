export interface RotaryPhoneDialOptions {
  label?: string;
}

export function createRotaryPhoneDial(
  container: HTMLElement,
  options: RotaryPhoneDialOptions = {},
): () => void {
  const { label = 'DIAL 9' } = options;

  const holes = Array.from({ length: 10 }, (_, i) => {
    const a = (-60 + i * (300 / 9)) * (Math.PI / 180);
    const x = (Math.cos(a) * 34).toFixed(1);
    const y = (Math.sin(a) * 34).toFixed(1);
    return `<button class="cl-n49-hole" data-d="${(i + 1) % 10}" style="left:calc(50% + ${x}px - 11px);top:calc(50% + ${y}px - 11px)">${(i + 1) % 10}</button>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n49 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:radial-gradient(circle at 40% 20%,#1c1917,#0b0b10); perspective:800px; }
      .cl-n49-phone { position:relative; width:min(52%,200px); aspect-ratio:.92; border-radius:18px;
        background:linear-gradient(150deg,#3f3f46,#18181b); border:1px solid #52525b;
        transform-style:preserve-3d; transform:rotateX(24deg); will-change:transform;
        box-shadow:-16px 26px 54px rgba(0,0,0,.65), inset 0 3px 0 rgba(255,255,255,.08); }
      .cl-n49-plate { position:absolute; left:50%; top:47%; width:96px; height:96px; margin:-48px 0 0 -48px;
        border-radius:50%; background:radial-gradient(circle at 42% 38%,#27272a,#101014);
        box-shadow:inset 0 0 0 3px #52525b, inset 0 6px 16px rgba(0,0,0,.6); transform-style:preserve-3d; }
      .cl-n49-plate.spin { transition:transform 2s cubic-bezier(.35,.05,.25,1); transform:rotateZ(-330deg); }
      .cl-n49-center { position:absolute; left:50%; top:50%; width:30px; height:30px; margin:-15px 0 0 -15px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#f472b6,#9d174d); box-shadow:0 0 14px rgba(244,114,182,.5); z-index:2; }
      .cl-n49-hole { position:absolute; width:22px; height:22px; border-radius:50%; border:none; cursor:pointer;
        background:#0b0b10; box-shadow:inset 0 2px 5px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.06);
        color:#a78bfa; font-size:10px; font-weight:700; }
      .cl-n49-handset { position:absolute; top:-9%; left:6%; right:6%; height:20%; border-radius:999px;
        background:linear-gradient(#27272a,#101014); border:1px solid #52525b; }
      .cl-n49-hint { color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n49-readout { color:#67e8f9; font-size:12px; letter-spacing:.4em; min-height:16px; }
    </style>
    <div class="cl-n49">
      <div class="cl-n49-phone">
        <div class="cl-n49-handset"></div>
        <div class="cl-n49-plate"><div class="cl-n49-center"></div>${holes}</div>
      </div>
      <div class="cl-n49-readout"></div>
      <div class="cl-n49-hint">${label}</div>
    </div>
  `;

  const phone = container.querySelector<HTMLElement>('.cl-n49-phone')!;
  const plate = container.querySelector<HTMLElement>('.cl-n49-plate')!;
  const readout = container.querySelector<HTMLElement>('.cl-n49-readout')!;

  let dialed = '';

  function spin() {
    plate.classList.remove('spin');
    void plate.offsetWidth;
    plate.classList.add('spin');
    setTimeout(() => {
      readout.textContent = dialed;
    }, 1400);
  }

  const holesEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-n49-hole'));
  const handlers = holesEls.map((hole) => {
    const h = () => {
      dialed = (dialed + hole.dataset.d).slice(-8);
      spin();
    };
    hole.addEventListener('click', h);
    return { hole, h };
  });

  let raf = 0;
  const t = { rx: 24 };
  const c = { rx: 24 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    phone.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 24 + ((e.clientY - rect.top) / rect.height - 0.5) * -22;
  }
  function onLeave() {
    t.rx = 24;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    handlers.forEach(({ hole, h }) => hole.removeEventListener('click', h));
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
