export interface ReactionBarOptions {
  reactions?: string[];
}

export function createReactionBarButton(container: HTMLElement, options: ReactionBarOptions = {}): () => void {
  const reactions = options.reactions ?? ['👍', '❤️', '😂', '😮'];

  container.innerHTML = `
    <style>
      .cl-rb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-rb-bar { display:flex; gap:6px; padding:7px 12px; background:#16161f;
        border:1px solid #3f3f46; border-radius:999px; }
      .cl-rb-opt { display:flex; align-items:center; gap:5px; padding:6px 12px; font-size:17px; line-height:1;
        color:#a1a1aa; font-size:13px; font-weight:700; background:none; border:none; border-radius:999px;
        cursor:pointer; transition:transform .18s cubic-bezier(.34,1.56,.64,1), background .2s ease; }
      .cl-rb-opt:hover { transform:scale(1.2); background:#242433; }
      .cl-rb-opt:focus-visible { outline:2px solid #f472b6; outline-offset:2px; }
      .cl-rb-opt[data-on="true"] { background:rgba(244,114,182,.16); box-shadow:inset 0 0 0 1px #f472b6; }
    </style>
    <div class="cl-rb">
      <div class="cl-rb-bar" role="group" aria-label="Reactions">
        ${reactions.map((r) => `<button type="button" class="cl-rb-opt" data-on="false" aria-label="React ${r}">${r}<span class="cl-rb-n">0</span></button>`).join('')}
      </div>
    </div>
  `;

  const opts = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-rb-opt'));

  function onClick(o: HTMLButtonElement) {
    return () => {
      const on = o.dataset.on === 'true';
      o.dataset.on = String(!on);
      const n = o.querySelector<HTMLElement>('.cl-rb-n')!;
      n.textContent = String(Number(n.textContent) + (on ? -1 : 1));
    };
  }

  const handlers = opts.map((o) => onClick(o));
  opts.forEach((o, i) => o.addEventListener('click', handlers[i]));

  return () => {
    opts.forEach((o, i) => o.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
