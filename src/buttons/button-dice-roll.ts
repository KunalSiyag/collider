export interface DiceRollOptions {
  label?: string;
}

export function createDiceRollButton(container: HTMLElement, options: DiceRollOptions = {}): () => void {
  const { label = 'Roll' } = options;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  container.innerHTML = `
    <style>
      .cl-dr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:15px; font-weight:600; color:#e4e4e7; }
      .cl-dr-die { width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:40px;
        line-height:1; color:#a78bfa; background:#16161f; border:1px solid #3f3f46; border-radius:12px;
        transition:transform .12s ease, color .3s ease; }
      .cl-dr-btn { padding:12px 28px; font-size:15px; font-weight:700; color:#fff;
        background:linear-gradient(120deg,#8b5cf6,#f472b6); border:none; border-radius:12px; cursor:pointer;
        transition:filter .2s ease, transform .1s ease; }
      .cl-dr-btn:hover { filter:brightness(1.12); }
      .cl-dr-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-dr-btn:active { transform:scale(.94); }
    </style>
    <div class="cl-dr">
      <span class="cl-dr-die" aria-live="polite">⚀</span>
      <button type="button" class="cl-dr-btn">${label}</button>
    </div>
  `;

  const die = container.querySelector<HTMLElement>('.cl-dr-die')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-dr-btn')!;
  let rolling = false;

  function onClick() {
    if (rolling) return;
    rolling = true;
    const final = Math.floor(Math.random() * 6);
    let ticks = 0;
    const iv = setInterval(() => {
      die.textContent = faces[Math.floor(Math.random() * 6)];
      die.style.transform = `rotate(${(ticks % 2 === 0 ? -1 : 1) * 8}deg) scale(${1 + Math.sin(ticks) * 0.05})`;
      if (++ticks > 10) {
        clearInterval(iv);
        die.textContent = faces[final];
        die.style.transform = 'rotate(0deg)';
        die.style.color = '#22d3ee';
        setTimeout(() => { die.style.color = '#a78bfa'; }, 400);
        rolling = false;
      }
    }, 70);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
