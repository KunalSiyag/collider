export interface ConfettiPopOptions {
  label?: string;
}

export function createConfettiPopButton(container: HTMLElement, options: ConfettiPopOptions = {}): () => void {
  const { label = 'Party time' } = options;

  container.innerHTML = `
    <style>
      .cl-cp { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-cp-btn { z-index:2; padding:15px 40px; font-size:15.5px; font-weight:800; color:#0b0b10;
        background:linear-gradient(120deg,#fde047,#f472b6,#a78bfa); border:none; border-radius:12px; cursor:pointer;
        transition:filter .2s ease, transform .1s ease; }
      .cl-cp-btn:hover { filter:brightness(1.08) saturate(1.2); }
      .cl-cp-btn:focus-visible { outline:2px solid #fde047; outline-offset:4px; }
      .cl-cp-btn:active { transform:scale(.94); }
      .cl-cp-bit { position:absolute; width:9px; height:14px; pointer-events:none; z-index:1; border-radius:2px; }
    </style>
    <div class="cl-cp">
      <button type="button" class="cl-cp-btn">🎉 ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-cp')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-cp-btn')!;
  const colors = ['#f472b6', '#a78bfa', '#22d3ee', '#fde047', '#67e8f9'];

  function onClick() {
    const r = wrap.getBoundingClientRect();
    for (let i = 0; i < 34; i++) {
      const bit = document.createElement('span');
      bit.className = 'cl-cp-bit';
      bit.style.background = colors[i % colors.length];
      bit.style.left = `${r.width / 2}px`;
      bit.style.top = `${r.height / 2}px`;
      wrap.appendChild(bit);
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      const v = 90 + Math.random() * 130;
      bit.animate(
        [
          { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
          {
            transform:
              `translate(calc(-50% + ${Math.cos(a) * v * 1.6}px), calc(-50% + ${r.height * 0.75}px)) rotate(${540 + Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.5,.4,1)' },
      ).onfinish = () => bit.remove();
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
