export interface ElevatorShaftViewOptions {
  floors?: number;
}

export function createElevatorShaftView(
  container: HTMLElement,
  options: ElevatorShaftViewOptions = {},
): () => void {
  const floors = Math.max(4, options.floors ?? 6);

  container.innerHTML = `
    <style>
      .cl-n09 { height:100%; display:flex; align-items:center; justify-content:center; gap:20px; background:#09090b; perspective:800px; }
      .cl-n09-shaft { position:relative; width:min(52%,200px); height:80%;
        transform-style:preserve-3d; transform:rotateY(-22deg); border-left:3px solid #27272a; border-right:3px solid #27272a; }
      .cl-n09-floor { position:absolute; left:-14px; right:-14px; height:9px; background:linear-gradient(90deg,#a78bfa,#6d28d9);
        border-radius:2px; box-shadow:0 4px 10px rgba(0,0,0,.5); }
      ${Array.from({ length: floors }, (_, i) => `<div class="cl-n09-floor" style="top:${((i / (floors - 1)) * 100).toFixed(1)}%"><i>${floors - i}</i></div>`).join('')}
      .cl-n09-car { position:absolute; left:-8px; right:-8px; height:calc(${(100 / (floors - 1)).toFixed(2)}% - 9px); top:0;
        background:linear-gradient(180deg,#67e8f933,#22d3ee55); border:2px solid #67e8f9; border-radius:6px;
        box-shadow:0 0 26px rgba(103,232,249,.35), inset 0 0 18px rgba(103,232,249,.15);
        transform-style:preserve-3d; transition:top 1.4s cubic-bezier(.5,.05,.2,1.2); }
      .cl-n09-cable { position:absolute; left:50%; top:0; width:2px; height:var(--ch,50%);
        background:repeating-linear-gradient(#52525b 0 4px, transparent 4px 8px); transform-origin:top center;
        transition:height 1.4s cubic-bezier(.5,.05,.2,1.2); z-index:-1; }
      .cl-n09-btns { display:flex; flex-direction:column; gap:8px; }
      .cl-n09-btns button { width:34px; height:30px; border:none; border-radius:6px; cursor:pointer;
        background:#18181b; color:#a78bfa; border:1px solid #3f3f46; font-size:11px; }
      .cl-n09-btns button:hover { background:#27272a; box-shadow:0 0 12px rgba(167,139,250,.4); }
    </style>
    <div class="cl-n09">
      <div class="cl-n09-shaft">
        <div class="cl-n09-cable"></div>
        <div class="cl-n09-car"></div>
      </div>
      <div class="cl-n09-btns">
        ${Array.from({ length: floors }, (_, i) => `<button data-f="${i}">${floors - i}</button>`).join('')}
      </div>
    </div>
  `;

  const shaft = container.querySelector<HTMLElement>('.cl-n09-shaft')!;
  const car = container.querySelector<HTMLElement>('.cl-n09-car')!;
  const cable = container.querySelector<HTMLElement>('.cl-n09-cable')!;

  function go(floor: number) {
    const topPct = ((floor / (floors - 1)) * (100 - parseFloat(String(100 / (floors - 1))))).toFixed(2);
    car.style.top = `${topPct}%`;
    cable.style.setProperty('--ch', `${topPct}%`);
    cable.style.height = `${topPct}%`;
  }

  const btns = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-n09-btns button'));
  const handlers = btns.map((b) => {
    const h = () => go(Number(b.dataset.f));
    b.addEventListener('click', h);
    return { b, h };
  });

  void shaft;

  return () => {
    handlers.forEach(({ b, h }) => b.removeEventListener('click', h));
    container.innerHTML = '';
  };
}
