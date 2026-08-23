export interface CityBlocksOptions {
  blocks?: number;
}

export function createCityBlocks(
  container: HTMLElement,
  options: CityBlocksOptions = {},
): () => void {
  const { blocks = 9 } = options;

  container.innerHTML = `
    <style>
      .cl-cb3 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cb3-grid { display:grid; grid-template-columns:repeat(3, 84px); gap:16px; transform-style:preserve-3d;
        transform:rotateX(52deg) rotateZ(-42deg); }
      .cl-cb3-block { aspect-ratio:1; border-radius:8px; position:relative;
        background:linear-gradient(150deg,#334155,#1e293b);
        box-shadow:-10px 10px 0 #0f172a, -20px 20px 0 rgba(15,23,42,.7);
        transition:transform .35s cubic-bezier(.34,1.56,.64,1), background .3s ease, box-shadow .35s ease; cursor:pointer; }
      .cl-cb3-block::after { content:''; position:absolute; inset:12%; border-radius:5px;
        background:rgba(103,232,249,.25); opacity:0; transition:opacity .3s ease; }
      .cl-cb3-block:hover { background:linear-gradient(150deg,#8b5cf6,#6d28d9);
        box-shadow:-12px 12px 0 #4c1d95, -24px 26px 0 rgba(76,29,149,.55), 0 0 30px rgba(139,92,246,.45); }
      .cl-cb3-block:hover::after { opacity:1; animation: cl-cb3-blink 0.8s steps(2) infinite; }
      @keyframes cl-cb3-blink { to { opacity:0.4; } }
    </style>
    <div class="cl-cb3"><div class="cl-cb3-grid">
      ${Array.from({ length: blocks }, () => '<div class="cl-cb3-block"></div>').join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
