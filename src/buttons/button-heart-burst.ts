export interface HeartBurstOptions {
  label?: string;
}

export function createHeartBurstButton(container: HTMLElement, options: HeartBurstOptions = {}): () => void {
  const { label = 'Like' } = options;

  container.innerHTML = `
    <style>
      .cl-hb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-hb-btn { position:relative; display:flex; align-items:center; gap:9px; padding:12px 24px;
        font-size:14.5px; font-weight:700; color:#f472b6; background:#181122; border:1px solid #3f3f46;
        border-radius:999px; cursor:pointer; transition:transform .15s ease, border-color .25s ease; }
      .cl-hb-btn:hover { border-color:#f472b6; }
      .cl-hb-btn:focus-visible { outline:2px solid #f472b6; outline-offset:3px; }
      .cl-hb-heart { font-size:18px; line-height:1; transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
      .cl-hb-btn[aria-pressed="true"] .cl-hb-heart { transform:scale(1.25); }
      .cl-hb-spark { position:absolute; width:6px; height:6px; border-radius:50%; pointer-events:none; }
      .cl-hb-count { min-width:14px; text-align:left; }
    </style>
    <div class="cl-hb">
      <button type="button" class="cl-hb-btn" aria-pressed="false" aria-label="${label}">
        <span class="cl-hb-heart">🤍</span><span class="cl-hb-label">${label}</span>
        <span class="cl-hb-count">0</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-hb-btn')!;
  const heart = container.querySelector<HTMLElement>('.cl-hb-heart')!;
  const countEl = container.querySelector<HTMLElement>('.cl-hb-count')!;
  let liked = false;
  let count = 0;

  function burst() {
    const colors = ['#f472b6', '#a78bfa', '#22d3ee'];
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('span');
      s.className = 'cl-hb-spark';
      s.style.background = colors[i % 3];
      s.style.left = '50%';
      s.style.top = '50%';
      btn.appendChild(s);
      const angle = (Math.PI * 2 * i) / 8;
      s.animate(
        [
          { transform: 'translate(-50%,-50%)', opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(angle) * 38}px), calc(-50% + ${Math.sin(angle) * 38}px))`, opacity: 0 },
        ],
        { duration: 550, easing: 'ease-out' },
      ).onfinish = () => s.remove();
    }
  }

  function onClick() {
    liked = !liked;
    count += liked ? 1 : -1;
    btn.setAttribute('aria-pressed', String(liked));
    heart.textContent = liked ? '💖' : '🤍';
    countEl.textContent = String(count);
    if (liked) burst();
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
