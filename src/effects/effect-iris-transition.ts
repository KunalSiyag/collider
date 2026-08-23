export interface EffectOptions {
  emoji?: string;
  caption?: string;
}

export function createIrisTransition(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🎬', caption = 'SCENE TWO' } = options;

  container.innerHTML = `
    <style>
      .cl-irt { position:relative; height:100%; overflow:hidden; background:#0b0b10; cursor:pointer;
        display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; }
      .cl-irt-scene { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px;
        background:linear-gradient(140deg,#8b5cf6,#22d3ee 60%,#f472b6); }
      .cl-irt-scene em { font-style:normal; font-size:64px; }
      .cl-irt-scene span { font-weight:800; letter-spacing:0.28em; color:#fff; font-size:15px; }
      .cl-irt-mask { position:absolute; inset:0; background:#0b0b10; display:flex; align-items:center; justify-content:center;
        color:rgba(103,232,249,0.9); font-size:13px; letter-spacing:0.22em; pointer-events:none;
        clip-path:circle(141% at 50% 50%); transition:clip-path 1s cubic-bezier(.7,0,.3,1); }
      .cl-irt.closed .cl-irt-mask { clip-path:circle(0% at 50% 50%); }
    </style>
    <div class="cl-irt closed">
      <div class="cl-irt-scene"><em>${emoji}</em><span>${caption}</span></div>
      <div class="cl-irt-mask">CLICK TO OPEN</div>
    </div>
  `;

  const root = container.querySelector('.cl-irt')!;
  let open = false;
  const onClick = () => {
    open = !open;
    root.classList.toggle('closed', !open);
  };
  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
