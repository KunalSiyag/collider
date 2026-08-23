export interface PopupBookOptions {
  title?: string;
}

export function createPopupBook(
  container: HTMLElement,
  options: PopupBookOptions = {},
): () => void {
  const { title = 'Pop-up page' } = options;

  container.innerHTML = `
    <style>
      .cl-pb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:1100px; }
      .cl-pb-page { width:min(66%,300px); aspect-ratio:1.25; position:relative; transform-style:preserve-3d;
        border-radius:6px 16px 16px 6px; background:#f5f3ee;
        box-shadow:14px 18px 0 #d6d0c2, 20px 26px 40px rgba(0,0,0,.45);
        transition:transform .3s ease-out; }
      .cl-pb-fold { position:absolute; left:50%; top:0; bottom:0; width:34px;
        transform:translateX(-50%);
        background:linear-gradient(90deg, rgba(0,0,0,.12), transparent); }
      .cl-pb-piece { position:absolute; left:50%; bottom:24%;
        transform-origin:bottom center; transition:transform .5s cubic-bezier(.2,.9,.3,1.15);
        display:flex; flex-direction:column; align-items:center; gap:8px; font-weight:700; color:#44403c; font-size:13px; }
      .cl-pb-piece svg { transition:transform .5s cubic-bezier(.2,.9,.3,1.15); filter:drop-shadow(4px 8px 6px rgba(0,0,0,.22)); }
      .cl-pb-title { position:absolute; top:20px; left:0; right:0; text-align:center; color:#78716c;
        letter-spacing:.14em; text-transform:uppercase; font-size:11px; }
    </style>
    <div class="cl-pb"><div class="cl-pb-page">
      <div class="cl-pb-fold"></div>
      <div class="cl-pb-title">${title} — hover</div>
      <div class="cl-pb-piece" style="left:32%">
        <svg width="64" height="72" viewBox="0 0 64 72"><path d="M32 4 L58 60 L6 60 Z" fill="#7c3aed"/><rect x="27" y="60" width="10" height="10" fill="#a1a1aa"/></svg>
        <span>mountain</span>
      </div>
      <div class="cl-pb-piece" style="left:62%">
        <svg width="52" height="76" viewBox="0 0 52 76"><rect x="22" y="30" width="8" height="42" fill="#713f12"/><circle cx="26" cy="22" r="20" fill="#16a34a"/></svg>
        <span>tree</span>
      </div>
    </div></div>
  `;

  const page = container.querySelector<HTMLElement>('.cl-pb-page')!;
  const pieces = [...page.querySelectorAll<HTMLElement>('.cl-pb-piece')];
  const svgs = pieces.map((p) => p.querySelector('svg')!);

  function onEnter() {
    page.style.transform = 'rotateX(14deg)';
    pieces.forEach((piece, i) => {
      piece.style.transform = `translateX(-50%) translateY(-${18 + i * 6}px)`;
      svgs[i]!.style.transform = `rotateY(${i % 2 ? -16 : 16}deg) scale(1.05)`;
    });
  }

  function onLeave() {
    page.style.transform = '';
    pieces.forEach((piece) => (piece.style.transform = ''));
    svgs.forEach((svg) => (svg.style.transform = ''));
  }

  page.addEventListener('pointerenter', onEnter);
  page.addEventListener('pointerleave', onLeave);

  return () => {
    page.removeEventListener('pointerenter', onEnter);
    page.removeEventListener('pointerleave', onLeave);
  };
}
