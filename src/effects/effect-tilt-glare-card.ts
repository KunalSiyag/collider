export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createTiltGlareCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Tilt card', body = 'Move your pointer across the surface.' } = options;

  container.innerHTML = `
    <style>
      .cl-tgc { height:100%; display:flex; align-items:center; justify-content:center;
        background:radial-gradient(circle at 50% 40%, #17122b, #0b0b10 70%); perspective:800px; }
      .cl-tgc-card { position:relative; width:min(78%,320px); padding:28px; border-radius:20px;
        background:#18181b; border:1px solid rgba(167,139,250,0.3);
        transform-style:preserve-3d; will-change:transform; overflow:hidden;
        box-shadow:0 24px 50px rgba(0,0,0,0.5); }
      .cl-tgc-glare { position:absolute; inset:-60%; pointer-events:none;
        background:radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.16), transparent 42%);
        transition:opacity .3s; opacity:0; }
      .cl-tgc-card:hover .cl-tgc-glare { opacity:1; }
      .cl-tgc-card h3 { color:#fafafa; font-size:19px; margin-bottom:8px; transform:translateZ(34px); }
      .cl-tgc-card p { color:rgba(255,255,255,0.66); font-size:13.5px; line-height:1.6; transform:translateZ(20px); }
    </style>
    <div class="cl-tgc"><div class="cl-tgc-card">
      <div class="cl-tgc-glare"></div><h3>${title}</h3><p>${body}</p>
    </div></div>
  `;

  const root = container.querySelector('.cl-tgc')!;
  const card = root.querySelector('.cl-tgc-card') as HTMLElement;
  const glare = root.querySelector('.cl-tgc-glare') as HTMLElement;

  const onMove = (e: PointerEvent) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.transform = `rotateY(${(px - 0.5) * 18}deg) rotateX(${(0.5 - py) * 16}deg)`;
    card.style.setProperty('--gx', `${px * 100}%`);
    card.style.setProperty('--gy', `${py * 100}%`);
  };
  const onLeave = () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    card.style.transition = 'transform .45s ease';
    setTimeout(() => { card.style.transition = ''; }, 450);
  };
  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);

  return () => {
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
