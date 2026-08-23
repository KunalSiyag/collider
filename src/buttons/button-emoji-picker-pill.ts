export interface EmojiPickerPillOptions {
  emojis?: string[];
}

export function createEmojiPickerPill(container: HTMLElement, options: EmojiPickerPillOptions = {}): () => void {
  const emojis = options.emojis ?? ['😀', '🚀', '💜', '🔥', '✨'];

  container.innerHTML = `
    <style>
      .cl-emp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-emp-pill { position:relative; display:flex; align-items:center; gap:4px; padding:8px 16px;
        background:#16161f; border:1px solid #3f3f46; border-radius:999px; transition:border-color .25s ease; }
      .cl-emp-pill:hover { border-color:#f472b6; }
      .cl-emp-opt { width:40px; height:40px; font-size:21px; line-height:1; background:none; border:none;
        border-radius:50%; cursor:pointer; transition:transform .18s cubic-bezier(.34,1.56,.64,1), background .2s ease; }
      .cl-emp-opt:hover { transform:scale(1.35) translateY(-3px); background:#241a33; }
      .cl-emp-opt:focus-visible { outline:2px solid #f472b6; outline-offset:2px; }
      .cl-emp-opt:active { transform:scale(1.15); }
    </style>
    <div class="cl-emp">
      <div class="cl-emp-pill" role="toolbar" aria-label="Pick a reaction emoji">
        ${emojis.map((e) => `<button type="button" class="cl-emp-opt" data-picked="false" aria-label="React with ${e}">${e}</button>`).join('')}
      </div>
    </div>
  `;

  const opts = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-emp-opt'));

  function onClick(i: number) {
    return () => {
      opts.forEach((o, j) => o.dataset.picked = String(i === j));
      const el = opts[i];
      el.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
        { duration: 320, easing: 'ease-out' },
      );
    };
  }

  const handlers = opts.map((_, i) => onClick(i));
  opts.forEach((o, i) => o.addEventListener('click', handlers[i]));

  return () => {
    opts.forEach((o, i) => o.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
