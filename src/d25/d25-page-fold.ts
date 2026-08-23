export interface BookPageFoldOptions {
  pages?: number;
}

export function createBookPageFold(
  container: HTMLElement,
  options: BookPageFoldOptions = {},
): () => void {
  const leaves = Math.max(2, options.pages ?? 4);

  const sheets = Array.from({ length: leaves }, (_, i) => {
    return `<div class="cl-n04-leaf" style="--i:${i};--z:${leaves - i}"><span>${i + 1}</span></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n04 { height:100%; display:flex; align-items:center; justify-content:center; gap:18px; background:#0b0b10; perspective:1300px; }
      .cl-n04-book { position:relative; width:min(58%,260px); height:62%; transform-style:preserve-3d; transform:rotateX(24deg); }
      .cl-n04-spine { position:absolute; left:50%; top:-6%; bottom:-6%; width:8px; margin-left:-4px; border-radius:4px;
        background:linear-gradient(90deg,#7c3aed,#4c1d95); box-shadow:0 14px 30px rgba(124,58,237,.35); }
      .cl-n04-base { position:absolute; inset:0; border-radius:0 10px 10px 0; background:#18181b; border:1px solid #3f3f46; }
      .cl-n04-leaf { position:absolute; left:50%; top:0; right:0; bottom:0; transform-style:preserve-3d;
        transform-origin:left center; transition:transform .9s cubic-bezier(.4,.1,.2,1); z-index:var(--z);
        background:linear-gradient(120deg,#a78bfa,#7c3aed); border-radius:0 10px 10px 0; cursor:pointer;
        box-shadow:4px 8px 24px rgba(0,0,0,.45); }
      .cl-n04-leaf:nth-child(even) { background:linear-gradient(120deg,#22d3ee,#0e7490); }
      .cl-n04-leaf span { position:absolute; right:12px; bottom:8px; color:rgba(255,255,255,.75); font-size:11px; letter-spacing:.2em; }
      .cl-n04-leaf.flipped { transform:rotateY(-165deg); }
      .cl-n04-hint { color:#71717a; font-size:12px; letter-spacing:.24em; text-transform:uppercase; }
    </style>
    <div class="cl-n04">
      <div class="cl-n04-book">
        <div class="cl-n04-spine"></div>
        <div class="cl-n04-base"></div>
        ${sheets}
      </div>
      <div class="cl-n04-hint">Click<br/>pages</div>
    </div>
  `;

  const leavesEls = Array.from(container.querySelectorAll<HTMLElement>('.cl-n04-leaf'));

  function onClickLeaf(el: HTMLElement) {
    el.classList.toggle('flipped');
  }

  const handlers = leavesEls.map((el) => {
    const h = () => onClickLeaf(el);
    el.addEventListener('click', h);
    return { el, h };
  });

  return () => {
    handlers.forEach(({ el, h }) => el.removeEventListener('click', h));
    container.innerHTML = '';
  };
}
