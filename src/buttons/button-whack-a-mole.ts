export interface WhackAMoleOptions {
  label?: string;
}

export function createWhackAMoleButton(container: HTMLElement, options: WhackAMoleOptions = {}): () => void {
  const { label = 'Whack!' } = options;

  container.innerHTML = `
    <style>
      .cl-wm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px; }
      .cl-wm-holes { display:flex; gap:10px; }
      .cl-wm-hole { width:46px; height:46px; border-radius:50%; border:none; cursor:pointer;
        background:#0d0d13; box-shadow:inset 0 5px 10px rgba(0,0,0,.8);
        font-size:22px; line-height:1; transition:transform .12s ease; }
      .cl-wm-hole[data-up="true"] { transform:translateY(-4px); }
      .cl-wm-hole:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .cl-wm-btn { padding:12px 26px; font-size:15px; font-weight:800; color:#0b0b10;
        background:linear-gradient(120deg,#fde047,#f472b6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-wm-btn:hover { filter:brightness(1.08); }
      .cl-wm-btn:focus-visible { outline:2px solid #fde047; outline-offset:3px; }
    </style>
    <div class="cl-wm">
      <span class="cl-wm-holes" aria-label="${label}">
        ${Array.from({ length: 3 }, (_, i) => `<button type="button" class="cl-wm-hole" data-i="${i}" data-up="false" aria-label="Hole ${i + 1}"></button>`).join('')}
      </span>
      <button type="button" class="cl-wm-btn">🔨 ${label}</button>
    </div>
  `;

  const holes = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-wm-hole'));
  const btn = container.querySelector<HTMLButtonElement>('.cl-wm-btn')!;
  let playing = false;
  const timers: number[] = [];

  function popRandom() {
    const h = holes[Math.floor(Math.random() * holes.length)];
    h.textContent = '🐹';
    h.dataset.up = 'true';
    h.setAttribute('aria-label', 'Mole up!');
    setTimeout(() => {
      h.textContent = '';
      h.dataset.up = 'false';
      h.setAttribute('aria-label', `Empty hole`);
    }, 900);
  }

  function onHit(h: HTMLButtonElement) {
    return () => {
      if (h.dataset.up !== 'true') return;
      h.textContent = '💥';
      setTimeout(() => { h.textContent = ''; h.dataset.up = 'false'; }, 250);
    };
  }

  function onClick() {
    if (playing) return;
    playing = true;
    for (let i = 0; i < 6; i++) {
      timers.push(window.setTimeout(popRandom, 500 + i * 700));
    }
    timers.push(window.setTimeout(() => { playing = false; }, 500 + 6 * 700));
  }

  const hitHandlers = holes.map((h) => onHit(h));
  holes.forEach((h, i) => h.addEventListener('click', hitHandlers[i]));
  btn.addEventListener('click', onClick);

  return () => {
    timers.forEach(clearTimeout);
    holes.forEach((h, i) => h.removeEventListener('click', hitHandlers[i]));
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
