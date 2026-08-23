export interface EffectOptions {
  title?: string;
}

export function createFolderOpenHover(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Projects' } = options;

  container.innerHTML = `
    <style>
      .cl-foh { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-foh-folder { position:relative; width:220px; height:150px; cursor:pointer; perspective:600px; }
      .cl-foh-back { position:absolute; inset:20px 0 0; border-radius:10px;
        background:linear-gradient(160deg,#7c3aed,#5b21b6); }
      .cl-foh-paper { position:absolute; left:14px; right:14px; top:26px; height:96px; border-radius:6px;
        background:#e9e4ff; box-shadow:0 4px 12px rgba(0,0,0,0.35);
        transition:transform .45s cubic-bezier(.34,1.4,.64,1), opacity .3s;
        display:flex; align-items:flex-end; padding:10px; gap:8px; overflow:hidden; }
      .cl-foh-paper i { flex:1; border-radius:3px; background:linear-gradient(#8b5cf6, #c4b5fd); height:30%; transition:height .4s; }
      .cl-foh-paper i:nth-child(2){height:55%;} .cl-foh-paper i:nth-child(3){height:42%;}
      .cl-foh-front { position:absolute; inset:44px 0 0; border-radius:0 10px 12px 12px;
        background:linear-gradient(180deg,#a78bfa,#8b5cf6);
        clip-path:polygon(0 18%, 34% 18%, 46% 0, 100% 0, 100% 100%, 0 100%);
        transition:transform .45s cubic-bezier(.34,1.4,.64,1);
        display:flex; align-items:flex-end; padding:12px 16px; color:#fff; font-weight:700; font-size:14px; }
      .cl-foh-folder:hover .cl-foh-paper { transform:translateY(-34px); }
      .cl-foh-folder:hover .cl-foh-paper i { height:60%; }
      .cl-foh-folder:hover .cl-foh-front { transform:rotateX(24deg) translateY(6px); transform-origin:top; }
    </style>
    <div class="cl-foh">
      <div class="cl-foh-folder">
        <div class="cl-foh-back"></div>
        <div class="cl-foh-paper"><i></i><i></i><i></i><i></i></div>
        <div class="cl-foh-front">${title}</div>
      </div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
