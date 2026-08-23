export interface ClapCountOptions {
  label?: string;
}

export function createClapCountButton(container: HTMLElement, options: ClapCountOptions = {}): () => void {
  const { label = '👏' } = options;

  container.innerHTML = `
    <style>
      .cl-cl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cl-btn { position:relative; display:flex; align-items:center; gap:10px; padding:12px 26px;
        font-size:16px; font-weight:700; color:#e4e4e7; background:#181820; border:1px solid #3f3f46;
        border-radius:999px; cursor:pointer; transition:border-color .25s ease, transform .12s ease; }
      .cl-cl-btn:hover { border-color:#f472b6; }
      .cl-cl-btn:focus-visible { outline:2px solid #f472b6; outline-offset:3px; }
      .cl-cl-btn:active { transform:scale(.94); }
      .cl-cl-float { position:absolute; left:50%; top:-4px; font-size:19px; pointer-events:none; }
    </style>
    <div class="cl-cl">
      <button type="button" class="cl-cl-btn" aria-label="Clap">${label}<span class="cl-cl-count">0</span></button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-cl-btn')!;
  const countEl = container.querySelector<HTMLElement>('.cl-cl-count')!;
  let count = 0;
  let lastClick = 0;

  function onClick(e: MouseEvent) {
    count++;
    countEl.textContent = String(count);
    const now = Date.now();
    const fast = now - lastClick < 350;
    lastClick = now;
    const f = document.createElement('span');
    f.className = 'cl-cl-float';
    f.textContent = label;
    f.style.left = `${e.clientX - btn.getBoundingClientRect().left}px`;
    btn.appendChild(f);
    f.animate(
      [
        { transform: `translate(-50%,0) scale(${fast ? 1.4 : 1})`, opacity: 1 },
        { transform: 'translate(-50%,-52px) scale(.7)', opacity: 0 },
      ],
      { duration: 700, easing: 'ease-out' },
    ).onfinish = () => f.remove();
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
