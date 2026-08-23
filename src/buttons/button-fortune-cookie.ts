export interface FortuneCookieOptions {
  label?: string;
  fortunes?: string[];
}

export function createFortuneCookieButton(container: HTMLElement, options: FortuneCookieOptions = {}): () => void {
  const { label = 'Crack open' } = options;
  const fortunes = options.fortunes ?? [
    'A mysterious CSS bug will vanish on its own.',
    'You will ship on Friday. Probably.',
    'Great refactors begin with a single delete key.',
    'The answer lies in the docs you skipped.',
    'Your next merge conflict hides wisdom.',
  ];

  container.innerHTML = `
    <style>
      .cl-fc { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:16px; }
      .cl-fc-icon { font-size:44px; transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
      .cl-fc-icon.crack { animation:cl-fc-shake .4s ease; }
      @keyframes cl-fc-shake {
        25% { transform:rotate(-14deg); } 50% { transform:rotate(12deg); } 75% { transform:rotate(-7deg); }
      }
      .cl-fc-msg { max-width:280px; text-align:center; font-size:14px; font-style:italic; color:#fde047;
        min-height:38px; opacity:0; transition:opacity .5s ease; }
      .cl-fc-btn { padding:12px 30px; font-size:15px; font-weight:700; color:#fff;
        background:#1c1c28; border:1px solid #8b5cf6; border-radius:999px; cursor:pointer;
        transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-fc-btn:hover { box-shadow:0 0 16px rgba(139,92,246,.45); }
      .cl-fc-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
    </style>
    <div class="cl-fc">
      <span class="cl-fc-icon" aria-hidden="true">🥠</span>
      <span class="cl-fc-msg" aria-live="polite"></span>
      <button type="button" class="cl-fc-btn">${label}</button>
    </div>
  `;

  const icon = container.querySelector<HTMLElement>('.cl-fc-icon')!;
  const msg = container.querySelector<HTMLElement>('.cl-fc-msg')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-fc-btn')!;

  function onClick() {
    msg.style.opacity = '0';
    icon.classList.remove('crack');
    void icon.offsetWidth;
    icon.classList.add('crack');
    setTimeout(() => {
      icon.textContent = '📜';
      msg.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
      msg.style.opacity = '1';
    }, 380);
    setTimeout(() => { icon.textContent = '🥠'; }, 2600);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
