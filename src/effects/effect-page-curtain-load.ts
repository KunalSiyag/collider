export interface EffectOptions {
  title?: string;
}

export function createPageCurtainLoad(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'COLLIDER' } = options;

  container.innerHTML = `
    <style>
      .cl-pcl { position:relative; height:100%; overflow:hidden; background:#18181b;
        display:flex; align-items:center; justify-content:center; cursor:pointer; }
      .cl-pcl-content { color:rgba(255,255,255,0.25); letter-spacing:0.3em; font-size:14px; }
      .cl-pcl-left, .cl-pcl-right { position:absolute; top:0; bottom:0; width:50.5%; z-index:3;
        background:linear-gradient(160deg,#8b5cf6,#6d28d9);
        transition:transform 1s cubic-bezier(.7,0,.25,1) .45s; }
      .cl-pcl-left { left:0; } .cl-pcl-right { right:0; }
      .cl-pcl.open .cl-pcl-left { transform:translateX(-101%); }
      .cl-pcl.open .cl-pcl-right { transform:translateX(101%); }
      .cl-pcl-logo { position:absolute; inset:0; z-index:2; display:flex; align-items:center; justify-content:center;
        font-weight:900; letter-spacing:0.42em; color:#fff; font-size:clamp(24px,4vw,40px);
        opacity:1; transition:opacity .3s .15s; }
      .cl-pcl.open .cl-pcl-logo { opacity:0; transition-delay:0s; transition-duration:.25s; }
      .cl-pcl-seam { position:absolute; top:0; bottom:0; left:50%; width:3px; margin-left:-1.5px; z-index:4;
        background:rgba(255,255,255,0.55); box-shadow:0 0 14px rgba(167,139,250,0.9); }
      .cl-pcl.open .cl-pcl-seam { animation:cl-pcl-fade .4s .5s both; }
      @keyframes cl-pcl-fade { to { opacity:0; } }
    </style>
    <div class="cl-pcl" id="pcl-root">
      <div class="cl-pcl-content">PAGE CONTENT</div>
      <div class="cl-pcl-logo">${title}</div>
      <div class="cl-pcl-left"></div><div class="cl-pcl-right"></div>
      <div class="cl-pcl-seam"></div>
    </div>
  `;

  const root = container.querySelector('#pcl-root')!;
  let open = false;
  const onClick = () => { open = !open; root.classList.toggle('open', open); };
  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
