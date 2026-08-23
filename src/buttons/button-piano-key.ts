export interface PianoKeyOptions {
  label?: string;
}

export function createPianoKeyButton(container: HTMLElement, options: PianoKeyOptions = {}): () => void {
  const { label = 'Piano' } = options;
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  container.innerHTML = `
    <style>
      .cl-pk { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:10px; }
      .cl-pk-row { display:flex; gap:3px; }
      .cl-pk-key { width:38px; height:96px; border:none; border-radius:0 0 7px 7px; cursor:pointer;
        background:linear-gradient(180deg,#f4f4f5,#d4d4d8);
        box-shadow:inset 0 -5px 0 #a1a1aa, 0 4px 6px rgba(0,0,0,.45);
        transform-origin:top; transition:transform .07s ease, background .15s ease; }
      .cl-pk-key:hover { background:#eef2ff; }
      .cl-pk-key:focus-visible { outline:2px solid #8b5cf6; outline-offset:2px; }
      .cl-pk-key[data-down="true"] { transform:rotateX(7deg) translateY(2px);
        background:linear-gradient(180deg,#c4b5fd,#a78bfa); box-shadow:inset 0 -2px 0 #7c3aed; }
      .cl-pk-note { font-size:13.5px; font-weight:700; color:#a1a1aa; min-height:18px; }
    </style>
    <div class="cl-pk">
      <div class="cl-pk-row" role="group" aria-label="${label}">
        ${notes.map((n) => `<button type="button" class="cl-pk-key" data-note="${n}" data-down="false" aria-label="Note ${n}"></button>`).join('')}
      </div>
      <span class="cl-pk-note" aria-live="polite">♪</span>
    </div>
  `;

  const keys = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-pk-key'));
  const noteEl = container.querySelector<HTMLElement>('.cl-pk-note')!;

  function onDown(k: HTMLButtonElement) {
    return () => {
      k.dataset.down = 'true';
      noteEl.textContent = `♪ ${k.dataset.note}`;
    };
  }

  function onUp(k: HTMLButtonElement) {
    return () => { k.dataset.down = 'false'; };
  }

  const downH = keys.map((k) => onDown(k));
  const upH = keys.map((k) => onUp(k));
  keys.forEach((k, i) => {
    k.addEventListener('pointerdown', downH[i]);
    k.addEventListener('pointerup', upH[i]);
    k.addEventListener('pointerleave', upH[i]);
  });

  return () => {
    keys.forEach((k, i) => {
      k.removeEventListener('pointerdown', downH[i]);
      k.removeEventListener('pointerup', upH[i]);
      k.removeEventListener('pointerleave', upH[i]);
    });
    container.innerHTML = '';
  };
}
