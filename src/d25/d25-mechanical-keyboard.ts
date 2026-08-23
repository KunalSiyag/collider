export interface MechanicalKeyboardOptions {
  label?: string;
}

export function createMechanicalKeyboard(
  container: HTMLElement,
  options: MechanicalKeyboardOptions = {},
): () => void {
  const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  const html = rows
    .map(
      (row) =>
        `<div class="cl-n37-row">${row
          .split('')
          .map((k) => `<button class="cl-n37-key" data-k="${k}"><b>${k}</b><i></i></button>`)
          .join('')}</div>`,
    )
    .join('');

  container.innerHTML = `
    <style>
      .cl-n37 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 20%,#18181b,#09090b); perspective:800px; }
      .cl-n37-board { padding:14px; border-radius:12px; background:linear-gradient(#27272a,#101014);
        border:1px solid #3f3f46; transform-style:preserve-3d;
        transform:rotateX(34deg) rotateZ(-4deg); box-shadow:0 40px 70px rgba(0,0,0,.6); will-change:transform; }
      .cl-n37-row { display:flex; gap:6px; margin-bottom:6px; justify-content:center; }
      .cl-n37-row:nth-child(2) { transform:translateX(-8px); }
      .cl-n37-row:nth-child(3) { transform:translateX(-18px); }
      .cl-n37-key { position:relative; width:26px; height:30px; border:none; border-radius:5px; cursor:pointer;
        background:linear-gradient(#3f3f46,#18181b); color:#a78bfa; font-size:10px;
        box-shadow:0 4px 0 #0b0b10, inset 0 1px 0 rgba(255,255,255,.15);
        transition:transform .08s ease, box-shadow .08s ease, color .2s; }
      .cl-n37-key b { position:relative; z-index:1; }
      .cl-n37-key i { position:absolute; left:5px; right:5px; bottom:5px; height:3px; border-radius:2px;
        background:#22d3ee; opacity:.35; transition:opacity .15s, box-shadow .15s; }
      .cl-n37-key.pressed { transform:translateY(4px) translateZ(-4px);
        box-shadow:0 0 0 #0b0b10, inset 0 1px 0 rgba(255,255,255,.1); }
      .cl-n37-key.pressed i { opacity:1; box-shadow:0 0 10px rgba(34,211,238,.9); }
      .cl-n37-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.28em; }
    </style>
    <div class="cl-n37">
      <div class="cl-n37-board">${html}</div>
      <div class="cl-n37-hint">Type on your keyboard</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n37')!;
  const board = root.querySelector<HTMLElement>('.cl-n37-board')!;
  const keys = new Map<string, HTMLElement>();
  root.querySelectorAll<HTMLElement>('.cl-n37-key').forEach((el) => keys.set(el.dataset.k!, el));

  function onKeyDown(e: KeyboardEvent) {
    const key = keys.get(e.key.toUpperCase());
    if (!key) return;
    key.classList.add('pressed');
    setTimeout(() => key.classList.remove('pressed'), 140);
  }

  window.addEventListener('keydown', onKeyDown);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    container.innerHTML = '';
  };
}
