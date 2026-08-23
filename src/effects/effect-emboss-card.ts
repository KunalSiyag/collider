export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createEmbossCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'EMBOSSED', body = 'Press in and out — tactile light-and-shadow relief.' } = options;

  container.innerHTML = `
    <style>
      .cl-emb { height:100%; display:flex; align-items:center; justify-content:center; background:#131316; }
      .cl-emb-card { width:min(70%, 300px); padding:26px; border-radius:20px; cursor:pointer;
        background:#1b1b20; border:none; text-align:left;
        box-shadow: -6px -6px 14px rgba(255,255,255,0.06), 8px 8px 18px rgba(0,0,0,0.55);
        transition: box-shadow .25s ease, transform .25s ease; }
      .cl-emb-card:hover {
        box-shadow: inset -5px -5px 12px rgba(255,255,255,0.05), inset 7px 7px 14px rgba(0,0,0,0.6);
        transform: scale(0.99); }
      .cl-emb-card h3 { margin:0 0 8px; color:#e4e4e7; font-size:18px;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.8), -1px -1px 1px rgba(255,255,255,0.08); }
      .cl-emb-card p { margin:0; color:#71717a; font-size:13px; line-height:1.6; }
    </style>
    <div class="cl-emb"><button class="cl-emb-card" type="button"><h3>${title}</h3><p>${body}</p></button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
