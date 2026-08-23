export interface GamepadDpadOptions {
  label?: string;
}

export function createGamepadDpadButton(container: HTMLElement, options: GamepadDpadOptions = {}): () => void {
  const { label = 'D-pad' } = options;

  container.innerHTML = `
    <style>
      .cl-gp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gp-grid { display:grid; grid-template-columns:repeat(3, 46px); grid-template-rows:repeat(3, 46px); gap:4px; }
      .cl-gp-k { border:none; cursor:pointer; font-size:16px; color:#c4b5fd;
        background:#1b1b28; transition:background .15s ease, transform .08s ease, box-shadow .15s ease; }
      .cl-gp-u { grid-column:2; grid-row:1; border-radius:10px 10px 0 0; }
      .cl-gp-l { grid-column:1; grid-row:2; border-radius:10px 0 0 10px; }
      .cl-gp-c { grid-column:2; grid-row:2; background:#8b5cf6; color:#fff; }
      .cl-gp-r { grid-column:3; grid-row:2; border-radius:0 10px 10px 0; }
      .cl-gp-d { grid-column:2; grid-row:3; border-radius:0 0 10px 10px; }
      .cl-gp-k:hover { background:#2a2440; }
      .cl-gp-c:hover { background:#9f75f8; }
      .cl-gp-k:focus-visible { outline:2px solid #a78bfa; outline-offset:1px; }
      .cl-gp-k[data-hit="true"] { background:#22d3ee; color:#0b0b10; box-shadow:0 0 12px rgba(34,211,238,.6); }
    </style>
    <div class="cl-gp">
      <div class="cl-gp-grid" role="group" aria-label="${label}">
        <button type="button" class="cl-gp-k cl-gp-u" data-dir="up" data-hit="false">▲</button>
        <button type="button" class="cl-gp-k cl-gp-l" data-dir="left" data-hit="false">◀</button>
        <button type="button" class="cl-gp-k cl-gp-c" data-dir="ok" data-hit="false">●</button>
        <button type="button" class="cl-gp-k cl-gp-r" data-dir="right" data-hit="false">▶</button>
        <button type="button" class="cl-gp-k cl-gp-d" data-dir="down" data-hit="false">▼</button>
      </div>
    </div>
  `;

  const keys = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-gp-k'));

  function onClick(k: HTMLButtonElement) {
    return () => {
      k.dataset.hit = 'true';
      setTimeout(() => { k.dataset.hit = 'false'; }, 220);
    };
  }

  const handlers = keys.map((k) => onClick(k));
  keys.forEach((k, i) => k.addEventListener('click', handlers[i]));

  return () => {
    keys.forEach((k, i) => k.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
