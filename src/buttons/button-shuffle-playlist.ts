export interface ShufflePlaylistOptions {
  label?: string;
}

export function createShufflePlaylistButton(container: HTMLElement, options: ShufflePlaylistOptions = {}): () => void {
  const { label = 'Shuffle' } = options;

  container.innerHTML = `
    <style>
      .cl-sh { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sh-btn { display:flex; align-items:center; gap:10px; padding:13px 28px; font-size:15px; font-weight:700;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        transition:border-color .25s ease, color .25s ease, box-shadow .3s ease; }
      .cl-sh-btn:hover { border-color:#8b5cf6; }
      .cl-sh-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-sh-btn[aria-pressed="true"] { color:#c4b5fd; border-color:#8b5cf6;
        box-shadow:0 0 16px rgba(139,92,246,.45); }
      .cl-sh-glyph { display:inline-block; font-size:18px; line-height:1;
        transition:transform .5s cubic-bezier(.34,1.56,.64,1); }
      .cl-sh-btn[aria-pressed="true"] .cl-sh-glyph { transform:rotate(360deg); }
    </style>
    <div class="cl-sh"><button type="button" class="cl-sh-btn" aria-pressed="false"><span class="cl-sh-glyph">🔀</span>${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-sh-btn')!;
  let on = false;

  function onClick() {
    on = !on;
    btn.setAttribute('aria-pressed', String(on));
    btn.lastChild!.textContent = on ? 'Shuffling' : label;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
