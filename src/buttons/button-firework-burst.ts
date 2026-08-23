export interface FireworkBurstOptions {
  label?: string;
}

export function createFireworkBurstButton(container: HTMLElement, options: FireworkBurstOptions = {}): () => void {
  const { label = 'Celebrate' } = options;

  container.innerHTML = `
    <style>
      .cl-fw { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-fw-btn { z-index:2; padding:15px 40px; font-size:15.5px; font-weight:800; color:#fff;
        background:#1c1c28; border:2px solid #f472b6; border-radius:999px; cursor:pointer;
        transition:box-shadow .25s ease, transform .12s ease; }
      .cl-fw-btn:hover { box-shadow:0 0 22px rgba(244,114,182,.5); }
      .cl-fw-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
      .cl-fw-btn:active { transform:scale(.95); }
      .cl-fw-p { position:absolute; width:7px; height:7px; border-radius:50%; pointer-events:none; z-index:1; }
    </style>
    <div class="cl-fw">
      <button type="button" class="cl-fw-btn">🎆 ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-fw')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-fw-btn')!;
  const colors = ['#f472b6', '#a78bfa', '#22d3ee', '#fde047'];

  function onClick() {
    const r = wrap.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 3;
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('span');
      p.className = 'cl-fw-p';
      p.style.background = colors[i % colors.length];
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      wrap.appendChild(p);
      const a = (Math.PI * 2 * i) / 26 + Math.random() * 0.3;
      const d = 60 + Math.random() * 70;
      p.animate(
        [
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d + 30}px)) scale(.2)`, opacity: 0 },
        ],
        { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(.1,.6,.4,1)' },
      ).onfinish = () => p.remove();
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
