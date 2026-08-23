export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createIceFrostCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Frozen', body = 'Hover to melt the frost away.' } = options;

  container.innerHTML = `
    <style>
      .cl-ifc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b1220; }
      .cl-ifc-card { position:relative; width:min(80%,320px); padding:28px; border-radius:18px; overflow:hidden;
        background:linear-gradient(150deg,#16233d,#101726); border:1px solid rgba(103,232,249,0.35);
        box-shadow:0 20px 44px rgba(0,0,0,0.5); cursor:pointer; }
      .cl-ifc-frost { position:absolute; inset:0; pointer-events:none; transition:opacity .9s ease, backdrop-filter .9s ease;
        background:
          radial-gradient(circle at 18% 22%, rgba(255,255,255,0.5), transparent 34%),
          radial-gradient(circle at 76% 64%, rgba(255,255,255,0.42), transparent 38%),
          radial-gradient(circle at 48% 88%, rgba(255,255,255,0.35), transparent 30%);
        backdrop-filter:blur(9px) brightness(1.15); -webkit-backdrop-filter:blur(9px) brightness(1.15); opacity:1; }
      .cl-ifc-card:hover .cl-ifc-frost { opacity:0; }
      .cl-ifc-card:hover { border-color:#67e8f9; box-shadow:0 20px 44px rgba(34,211,238,0.25); }
      .cl-ifc-card h3 { color:#eaf6ff; font-size:19px; margin-bottom:8px; }
      .cl-ifc-card p { color:rgba(234,246,255,0.72); font-size:13.5px; line-height:1.6; }
    </style>
    <div class="cl-ifc"><div class="cl-ifc-card">
      <div class="cl-ifc-frost"></div><h3>❄ ${title}</h3><p>${body}</p>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
