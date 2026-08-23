export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createCursorSpotlightBorder(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Spotlight border', body = 'A glowing border segment follows your cursor.' } = options;

  container.innerHTML = `
    <style>
      .cl-csb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-csb-card { position:relative; width:min(74%, 310px); padding:26px; border-radius:18px;
        background:#18181b; border:1px solid #27272a; }
      .cl-csb-card::before { content:''; position:absolute; inset:-2px; border-radius:20px; pointer-events:none;
        background: radial-gradient(140px 140px at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.9), rgba(34,211,238,0.35) 45%, transparent 70%);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude;
        padding:2px; opacity:0; transition: opacity .3s ease; }
      .cl-csb-card:hover::before { opacity:1; }
      .cl-csb-card h3 { margin:0 0 8px; color:#fafafa; font-size:18px; }
      .cl-csb-card p { margin:0; color:#a1a1aa; font-size:13.5px; line-height:1.6; }
    </style>
    <div class="cl-csb"><div class="cl-csb-card"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  const card = container.querySelector<HTMLElement>('.cl-csb-card');
  if (card) {
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
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
