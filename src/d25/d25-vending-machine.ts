export interface VendingMachineOptions {
  items?: number;
}

export function createVendingMachine(
  container: HTMLElement,
  options: VendingMachineOptions = {},
): () => void {
  const rows = Math.max(2, Math.min(options.items ?? 3, 4));

  const slots = Array.from({ length: rows * 3 }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6'][i % 3];
    return `<button class="cl-n17-slot" style="--c:${hue}" data-i="${i}"><b>A${i + 1}</b></button>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n17 { height:100%; display:flex; align-items:center; justify-content:center; gap:16px; background:radial-gradient(#18181b,#09090b); perspective:900px; }
      .cl-n17-body { position:relative; width:min(52%,210px); height:82%; border-radius:14px;
        background:linear-gradient(160deg,#27272a,#101013); border:1px solid #3f3f46; transform-style:preserve-3d;
        transform:rotateY(-14deg); box-shadow:14px 20px 50px rgba(0,0,0,.6), inset 0 0 0 4px rgba(139,92,246,.15);
        transition:transform .4s ease; will-change:transform; }
      .cl-n17:hover .cl-n17-body { transform:rotateY(-6deg); }
      .cl-n17-window { position:absolute; top:7%; left:7%; right:7%; height:56%; display:grid;
        grid-template-columns:repeat(3,1fr); gap:6px; padding:8px; border-radius:8px;
        background:rgba(103,232,249,.06); border:1px solid #155e75; transform-style:preserve-3d; }
      .cl-n17-slot { position:relative; border:none; border-radius:6px; cursor:pointer; overflow:hidden;
        background:linear-gradient(160deg,var(--c),#101014); color:#fafafa; font-size:9px; letter-spacing:.1em;
        transition:transform .2s ease, opacity .5s ease; }
      .cl-n17-slot b { position:absolute; bottom:3px; right:5px; opacity:.7; }
      .cl-n17-slot::before { content:''; position:absolute; top:6px; left:50%; width:16px; height:26px; margin-left:-8px;
        border-radius:8px; background:rgba(255,255,255,.22); }
      .cl-n17-slot:hover { transform:translateZ(16px); }
      .cl-n17-slot.sold { opacity:.18; }
      .cl-n17-tray { position:absolute; bottom:8%; left:7%; right:7%; height:11%; border-radius:6px;
        background:#0b0b10; border:1px dashed #3f3f46; overflow:hidden; }
      .cl-n17-drop { position:absolute; top:100%; left:50%; width:20px; height:26px; margin-left:-10px; border-radius:5px;
        animation:cl-n17-fall .7s cubic-bezier(.5,.05,.7,1.4) forwards; }
      @keyframes cl-n17-fall { to { top:calc(100% - 28px); } }
      .cl-n17-side { width:12px; height:70%; border-radius:6px; background:linear-gradient(#3f3f46,#18181b);
        transform:rotateY(38deg) translateX(-6px); }
    </style>
    <div class="cl-n17">
      <div class="cl-n17-side"></div>
      <div class="cl-n17-body">
        <div class="cl-n17-window">${slots}</div>
        <div class="cl-n17-tray"></div>
      </div>
    </div>
  `;

  const tray = container.querySelector<HTMLElement>('.cl-n17-tray')!;
  const slotsEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-n17-slot'));

  const handlers = slotsEls.map((slot) => {
    const h = () => {
      if (slot.classList.contains('sold')) return;
      slot.classList.add('sold');
      const drop = document.createElement('div');
      drop.className = 'cl-n17-drop';
      drop.style.background = getComputedStyle(slot).backgroundImage.split(',').slice(0, 2).join(',');
      drop.style.background = `linear-gradient(160deg, var(--c), #101014)`;
      drop.style.setProperty('--c', slot.style.getPropertyValue('--c'));
      tray.appendChild(drop);
      setTimeout(() => drop.remove(), 900);
    };
    slot.addEventListener('click', h);
    return { slot, h };
  });

  return () => {
    handlers.forEach(({ slot, h }) => slot.removeEventListener('click', h));
    container.innerHTML = '';
  };
}
