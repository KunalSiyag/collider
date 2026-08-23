export interface CrystalGlowOptions {
  label?: string;
}

export function createCrystalGlowButton(container: HTMLElement, options: CrystalGlowOptions = {}): () => void {
  const { label = 'Crystal' } = options;

  container.innerHTML = `
    <style>
      .cl-cg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cg-btn { position:relative; clip-path:polygon(50% 0%, 100% 26%, 100% 74%, 50% 100%, 0% 74%, 0% 26%);
        width:170px; height:60px; font-size:15px; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
        color:#e0f2fe; background:linear-gradient(160deg,#22d3ee 0%, #8b5cf6 55%, #f472b6 100%);
        border:none; cursor:pointer;
        transition:filter .25s ease, transform .2s ease; }
      .cl-cg-btn::after { content:''; position:absolute; inset:3px;
        clip-path:inherit; background:rgba(11,11,16,.72); z-index:-1; }
      .cl-cg-btn:hover { filter:brightness(1.35) saturate(1.15); transform:scale(1.04); }
      .cl-cg-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:6px; }
      .cl-cg-btn:active { transform:scale(.96); }
    </style>
    <div class="cl-cg"><button type="button" class="cl-cg-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
