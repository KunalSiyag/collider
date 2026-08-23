export interface EffectOptions {
  balls?: number;
}

export function createPendulumSwing(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.balls ?? 5;

  container.innerHTML = `
    <style>
      .cl-pnd { height:100%; display:flex; align-items:flex-start; justify-content:center;
        background:#0b0b10; padding-top:34px; }
      .cl-pnd-row { display:flex; gap:2px; align-items:flex-end; }
      .cl-pnd-arm { position:relative; width:26px; height:190px; transform-origin:top center; }
      .cl-pnd-string { position:absolute; left:50%; top:0; bottom:22px; width:1.5px; margin-left:-0.75px;
        background:linear-gradient(#3a3a4a, rgba(167,139,250,0.6)); }
      .cl-pnd-bob { position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:30px; height:30px;
        border-radius:50%; background:radial-gradient(circle at 35% 30%, #c4b5fd, #7c3aed 65%);
        box-shadow:0 8px 16px rgba(124,58,237,0.4); }
      .cl-pnd-arm:nth-child(odd) .cl-pnd-bob { background:radial-gradient(circle at 35% 30%, #a5f3fc, #0891b2 65%);
        box-shadow:0 8px 16px rgba(8,145,178,0.4); }
      @keyframes cl-pnd-left { 0%,100% { transform:rotate(42deg); } 50% { transform:rotate(0deg); } }
      @keyframes cl-pnd-right { 0%,100% { transform:rotate(-42deg); } 50% { transform:rotate(0deg); } }
      .cl-pnd-arm.first { animation:cl-pnd-left 1.9s cubic-bezier(.36,0,.64,1) infinite; }
      .cl-pnd-arm.last { animation:cl-pnd-right 1.9s cubic-bezier(.36,0,.64,1) infinite; }
    </style>
    <div class="cl-pnd"><div class="cl-pnd-row">
      ${Array.from({ length: n }, (_, i) => `<div class="cl-pnd-arm${i === 0 ? ' first' : i === n - 1 ? ' last' : ''}">
        <div class="cl-pnd-string"></div><div class="cl-pnd-bob"></div>
      </div>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
