export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createHoloFoilCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'HOLO FOIL', body = 'Rainbow foil that shifts with the pointer.' } = options;

  container.innerHTML = `
    <style>
      .cl-hfc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-hfc-card { position:relative; width:min(70%, 300px); height:200px; border-radius:16px; overflow:hidden;
        border:1px solid rgba(255,255,255,0.25); cursor:pointer;
        display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;
        background:
          repeating-linear-gradient(115deg, rgba(139,92,246,0.35) 0 12px, rgba(34,211,238,0.3) 12px 24px, rgba(244,114,182,0.3) 24px 36px, rgba(103,232,249,0.28) 36px 48px);
        transition: transform .2s ease; }
      .cl-hfc-card::before { content:''; position:absolute; inset:-60%;
        background: radial-gradient(closest-side at var(--hx,50%) var(--hy,50%), rgba(255,255,255,0.85), transparent 45%);
        mix-blend-mode: overlay; opacity:0; transition: opacity .25s ease; }
      .cl-hfc-card:hover::before { opacity:1; }
      .cl-hfc-card h3 { position:relative; margin:0; color:#fff; font-size:22px; letter-spacing:0.18em;
        text-shadow: 0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.4); }
      .cl-hfc-card p { position:relative; margin:0; color:rgba(255,255,255,0.85); font-size:12px; }
    </style>
    <div class="cl-hfc"><div class="cl-hfc-card"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  const card = container.querySelector<HTMLElement>('.cl-hfc-card');
  if (card) {
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--hx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--hy', `${((e.clientY - r.top) / r.height) * 100}%`);
      card.style.transform = 'rotateX(0deg) scale(1.01)';
    };
    card.addEventListener('pointermove', move);
    return () => {
      card.removeEventListener('pointermove', move);
      container.innerHTML = '';
    };
  }

  return () => {
    container.innerHTML = '';
  };
}
