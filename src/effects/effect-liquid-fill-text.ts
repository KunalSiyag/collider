export interface EffectOptions {
  text?: string;
}

export function createLiquidFillText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'FILL' } = options;

  container.innerHTML = `
    <style>
      .cl-lft { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-lft span { font-size: clamp(64px, 11vw, 120px); font-weight:900; letter-spacing:0.06em;
        background: linear-gradient(#22d3ee 0%, #67e8f9 45%, rgba(103,232,249,0.15) 45%);
        background-size: 100% 220%; background-position: 0 100%;
        -webkit-background-clip:text; background-clip:text; color:transparent;
        animation: cl-lft-rise 4s ease-in-out infinite; }
      @keyframes cl-lft-rise {
        0%, 100% { background-position: 0 100%; }
        50% { background-position: 0 0%; }
      }
    </style>
    <div class="cl-lft"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
