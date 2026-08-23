export interface EffectOptions {
  puffs?: number;
}

export function createSmokeWisps(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.puffs ?? 10;

  const wisps = Array.from({ length: n }, (_, i) => {
    const s = 30 + Math.random() * 50;
    const d = 5 + Math.random() * 4;
    const dl = -Math.random() * d;
    return `<i style="left:${(38 + Math.random() * 24).toFixed(0)}%; width:${s.toFixed(0)}px;
      --d:${d.toFixed(1)}s; --dl:${dl.toFixed(1)}s; animation-delay:inherit"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-skw { position:relative; height:100%; overflow:hidden; background:#0a0a10; }
      .cl-skc-cup { position:absolute; bottom:14%; left:50%; transform:translateX(-50%);
        width:110px; height:90px; border-radius:8px 8px 26px 26px;
        background:linear-gradient(160deg,#2b2b3d,#15151f); border-top:3px solid #67e8f9; }
      .cl-skw i { position:absolute; bottom:calc(14% + 92px); aspect-ratio:1; border-radius:50%;
        background:radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%);
        filter:blur(6px); opacity:0; pointer-events:none;
        animation:cl-skw-rise var(--d) ease-out var(--dl) infinite; }
      @keyframes cl-skw-rise {
        0% { transform:translateY(0) translateX(-40%) scale(0.6); opacity:0; }
        15% { opacity:0.9; }
        100% { transform:translateY(-46vh) translateX(calc(-40% + 60px)) scale(1.7); opacity:0; }
      }
    </style>
    <div class="cl-skw">${wisps}<div class="cl-skc-cup"></div></div>
  `;

  container.querySelectorAll('.cl-skw i').forEach(el => {
    (el as HTMLElement).style.animationDelay = `${(Math.random() * -8).toFixed(1)}s`;
  });

  return () => {
    container.innerHTML = '';
  };
}
