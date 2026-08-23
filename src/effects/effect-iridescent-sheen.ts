export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createIridescentSheen(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Iridescent', body = 'A soft sheen sweeps across on hover.' } = options;

  container.innerHTML = `
    <style>
      .cl-irs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-irs-card { position:relative; width:min(78%, 320px); padding:26px; border-radius:18px;
        background:#18181b; border:1px solid #27272a; overflow:hidden; }
      .cl-irs-card::after { content:''; position:absolute; top:-50%; bottom:-50%; width:60%; left:-80%;
        transform: rotate(20deg);
        background: linear-gradient(90deg, transparent, rgba(139,92,246,0.16), rgba(103,232,249,0.22), rgba(244,114,182,0.16), transparent);
        transition: left .9s cubic-bezier(.4,0,.2,1); }
      .cl-irs-card:hover::after { left:130%; }
      .cl-irs-card h3 { margin:0 0 8px; color:#fafafa; font-size:18px; }
      .cl-irs-card p { margin:0; color:#a1a1aa; font-size:13.5px; line-height:1.6; }
    </style>
    <div class="cl-irs"><div class="cl-irs-card"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
