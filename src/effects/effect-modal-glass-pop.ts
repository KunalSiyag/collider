export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createModalGlassPop(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Glass modal', body = 'Springy pop-in with a frosted backdrop.' } = options;

  container.innerHTML = `
    <style>
      .cl-mgp { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:#0b0b10; }
      .cl-mgp-open { padding:12px 26px; border-radius:12px; border:0; cursor:pointer; font-weight:700; color:#fff;
        background:linear-gradient(90deg,#8b5cf6,#22d3ee); }
      .cl-mgp-ov { position:absolute; inset:0; background:rgba(5,5,10,0.55);
        backdrop-filter:blur(10px) saturate(1.3); -webkit-backdrop-filter:blur(10px);
        display:flex; align-items:center; justify-content:center; z-index:10;
        opacity:0; pointer-events:none; transition:opacity .25s; }
      .cl-mgp.show .cl-mgp-ov { opacity:1; pointer-events:auto; }
      .cl-mgp-card { width:min(84%,360px); padding:28px; border-radius:20px; text-align:center;
        background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2);
        transform:scale(0.7) translateY(24px); transition:transform .38s cubic-bezier(.34,1.56,.64,1); }
      .cl-mgp.show .cl-mgp-card { transform:scale(1) translateY(0); }
      .cl-mgp-card h3 { color:#fafafa; margin-bottom:8px; }
      .cl-mgp-card p { color:rgba(255,255,255,0.72); font-size:13.5px; line-height:1.6; margin-bottom:18px; }
      .cl-mgp-close { padding:9px 22px; border-radius:999px; border:1px solid rgba(167,139,250,0.6); cursor:pointer;
        background:none; color:#a78bfa; font-weight:600; }
    </style>
    <div class="cl-mgp">
      <button class="cl-mgp-open" type="button">Open modal</button>
      <div class="cl-mgp-ov"><div class="cl-mgp-card">
        <h3>${title}</h3><p>${body}</p>
        <button class="cl-mgp-close" type="button">Close</button>
      </div></div>
    </div>
  `;

  const root = container.querySelector('.cl-mgp')!;
  const onOpen = () => root.classList.add('show');
  const onClose = (e: Event) => {
    if ((e.currentTarget as HTMLElement) === e.target || true) root.classList.remove('show');
  };
  root.querySelector('.cl-mgp-open')!.addEventListener('click', onOpen);
  const ov = root.querySelector('.cl-mgp-ov')!;
  ov.addEventListener('click', e => { if (e.target === ov) root.classList.remove('show'); });
  root.querySelector('.cl-mgp-close')!.addEventListener('click', onClose as EventListener);

  return () => {
    container.innerHTML = '';
  };
}
