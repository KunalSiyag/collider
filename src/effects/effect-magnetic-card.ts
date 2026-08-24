/** Magnetic Card — card leans toward the cursor with a tracking glare. */
export interface MagneticCardOptions {
  title?: string;
  body?: string;
  strength?: number;
}

export function createMagneticCard(container: HTMLElement, options: MagneticCardOptions = {}): () => void {
  const { title = 'Magnetic Card', body = 'Lean in — the card follows your cursor.', strength = 10 } = options;
  container.innerHTML = `<style>
    .ef-mc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:800px}
    .ef-mc .card{width:300px;padding:26px;border-radius:16px;border:1px solid #3f3f46;background:#18181b;
      transform-style:preserve-3d;transition:transform .18s ease-out,box-shadow .18s ease-out;position:relative;overflow:hidden}
    .ef-mc h3{margin:0 0 8px;color:#fafafa;font:600 17px/1.2 system-ui}
    .ef-mc p{margin:0;color:#a1a1aa;font:400 13.5px/1.55 system-ui}
    .ef-mc .glare{position:absolute;inset:0;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.14),transparent 55%);pointer-events:none}
  </style>
  <div class="ef-mc"><div class="card">
    <div class="glare"></div><h3>${title}</h3><p>${body}</p>
  </div></div>`;

  const card = container.querySelector<HTMLElement>('.card')!;
  const wrap = container.querySelector<HTMLElement>('.ef-mc')!;

  const onMove = (e: MouseEvent) => {
    const r = card.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    card.style.transform = `rotateY(${(dx / r.width) * strength}deg) rotateX(${(-dy / r.height) * strength}deg)`;
    card.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = () => {
    card.style.transform = 'rotateY(0) rotateX(0)';
  };

  wrap.addEventListener('mousemove', onMove);
  wrap.addEventListener('mouseleave', onLeave);
  return () => {
    wrap.removeEventListener('mousemove', onMove);
    wrap.removeEventListener('mouseleave', onLeave);
    container.innerHTML = '';
  };
}
