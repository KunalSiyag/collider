export interface GreetingCardOptions {
  front?: string;
  inside?: string;
}

export function createGreetingCard(
  container: HTMLElement,
  options: GreetingCardOptions = {},
): () => void {
  const { front = 'Hello!', inside = 'Wishing you depth in all dimensions.' } = options;

  container.innerHTML = `
    <style>
      .cl-n01 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 25%,#1c1917,#0b0b10); perspective:1100px; cursor:pointer; user-select:none; }
      .cl-n01-card { position:relative; width:min(56%,240px); aspect-ratio:0.78; transform-style:preserve-3d;
        transform:rotateX(10deg) rotateY(-18deg); transition:transform .8s cubic-bezier(.2,.8,.2,1); will-change:transform; }
      .cl-n01.open .cl-n01-card { transform:rotateX(8deg) rotateY(-58deg); }
      .cl-n01-front, .cl-n01-back { position:absolute; inset:0; border-radius:14px; backface-visibility:hidden; }
      .cl-n01-front { background:linear-gradient(160deg,#8b5cf6,#6d28d9); display:flex; align-items:center; justify-content:center;
        color:#f5f3ff; font-size:21px; letter-spacing:.1em; transform-origin:left center; z-index:2;
        box-shadow:-8px 12px 36px rgba(139,92,246,.35), inset 0 0 0 1px rgba(255,255,255,.14); }
      .cl-n01-back { transform:rotateY(180deg); background:#18181b; border:1px solid #3f3f46; }
      .cl-n01-inner { position:absolute; inset:0; border-radius:14px; background:#1c1c22; border:1px solid #3f3f46;
        display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; color:#c4b5fd; font-size:13px; line-height:1.6; }
      .cl-n01-pop { position:absolute; bottom:14px; left:50%; width:64px; height:74px; margin-left:-32px;
        transform-origin:bottom center; transform:translateZ(0) rotateX(0); transition:transform .8s .25s cubic-bezier(.2,.8,.2,1);
        background:linear-gradient(#67e8f9,#0e7490); clip-path:polygon(50% 0,100% 100%,0 100%); opacity:.85; }
      .cl-n01-pop2 { position:absolute; bottom:14px; left:18%; width:44px; height:48px;
        transform-origin:bottom center; transition:transform .8s .45s cubic-bezier(.2,.8,.2,1);
        background:linear-gradient(#f472b6,#be185d); clip-path:polygon(50% 0,100% 100%,0 100%); opacity:.8; }
      .cl-n01.open .cl-n01-front ~ * , .cl-n01.open .cl-n01-pop, .cl-n01.open .cl-n01-pop2 { pointer-events:none; }
      .cl-n01.open .cl-n01-pop { transform:translateZ(66px) rotateX(-16deg); }
      .cl-n01.open .cl-n01-pop2 { transform:translateZ(44px) rotateX(-12deg); }
      .cl-n01-hint { margin-top:18px; color:#71717a; font-size:11px; letter-spacing:.3em; text-transform:uppercase; text-align:center; }
    </style>
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div class="cl-n01">
        <div class="cl-n01-card">
          <div class="cl-n01-inner">${inside}<div class="cl-n01-pop"></div><div class="cl-n01-pop2"></div></div>
          <div class="cl-n01-back"></div>
          <div class="cl-n01-front"><span>${front}</span></div>
        </div>
      </div>
      <div class="cl-n01-hint">Click to open</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n01')!;

  let open = false;
  function onClick(e: Event) {
    e.stopPropagation();
    open = !open;
    root.classList.toggle('open', open);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
