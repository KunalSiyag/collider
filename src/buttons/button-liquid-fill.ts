export interface LiquidFillOptions {
  label?: string;
}

export function createLiquidFillButton(container: HTMLElement, options: LiquidFillOptions = {}): () => void {
  const { label = 'Fill me up' } = options;

  container.innerHTML = `
    <style>
      .cl-lf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-lf-btn { position:relative; overflow:hidden; width:200px; height:52px; font-size:15.5px; font-weight:800;
        color:#22d3ee; background:transparent; border:2px solid #22d3ee; border-radius:12px; cursor:pointer;
        transition:color .45s ease; }
      .cl-lf-btn:hover { color:#0b0b10; }
      .cl-lf-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-lf-wave { position:absolute; left:-50%; top:100%; width:200%; height:220%;
        border-radius:40% 42% 38% 44% / 48% 46% 52% 50%;
        background:#22d3ee; transition:top .5s ease; animation:cl-lf-slosh 4s linear infinite; z-index:0; }
      @keyframes cl-lf-slosh {
        from { transform:rotate(0deg); } to { transform:rotate(360deg); }
      }
      .cl-lf-btn:hover .cl-lf-wave { top:-70%; }
      .cl-lf-txt { position:relative; z-index:1; mix-blend-mode:difference; color:#fff; }
    </style>
    <div class="cl-lf"><button type="button" class="cl-lf-btn"><span class="cl-lf-txt">${label}</span><span class="cl-lf-wave" aria-hidden="true"></span></button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
