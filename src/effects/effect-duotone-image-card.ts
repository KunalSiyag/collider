export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createDuotoneImageCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Duotone', body = 'Hover to lift the duotone and reveal full color.' } = options;

  container.innerHTML = `
    <style>
      .cl-dic { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dic-card { position:relative; width:min(78%, 320px); height:230px; border-radius:18px; overflow:hidden; cursor:pointer;
        background:
          linear-gradient(135deg, rgba(139,92,246,0.85), rgba(34,211,238,0.85)),
          repeating-conic-gradient(from 30deg at 60% 40%, #312e81 0deg 40deg, #1e1b4b 40deg 80deg);
        background-blend-mode: multiply, normal;
        transition: filter .5s ease, transform .5s ease;
        display:flex; align-items:flex-end; }
      .cl-dic-card::before { content:''; position:absolute; inset:0;
        background: radial-gradient(70% 90% at 65% 25%, rgba(255,255,255,0.35), transparent 55%),
                    radial-gradient(50% 60% at 25% 75%, rgba(0,0,0,0.5), transparent 65%);
        mix-blend-mode: overlay; }
      .cl-dic-card:hover { filter: saturate(2.2) contrast(1.15); transform: scale(1.02); }
      .cl-dic-caption { position:relative; z-index:1; width:100%; padding:16px;
        background: linear-gradient(to top, rgba(11,11,16,0.85), transparent); }
      .cl-dic-caption h3 { margin:0 0 4px; color:#fff; font-size:17px; }
      .cl-dic-caption p { margin:0; color:rgba(255,255,255,0.7); font-size:12.5px; }
    </style>
    <div class="cl-dic"><figure class="cl-dic-card"><figcaption class="cl-dic-caption"><h3>${title}</h3><p>${body}</p></figcaption></figure></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
