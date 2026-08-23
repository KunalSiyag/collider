export interface EffectOptions {
  drops?: number;
}

export function createRainWindowPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.drops ?? 30;

  const drops = Array.from({ length: n }, () => {
    const d = (2.4 + Math.random() * 3).toFixed(2);
    const dl = (-Math.random() * Number(d)).toFixed(2);
    const s = (7 + Math.random() * 12).toFixed(0);
    return `<i style="left:${(Math.random() * 98).toFixed(1)}%; width:${s}px; height:${s}px;
      --d:${d}s; --dl:${dl}s; --dr:${(Math.random() * 60 - 10).toFixed(0)}px"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-rwp { position:relative; height:100%; overflow:hidden;
        background:
          linear-gradient(to bottom, rgba(6,10,20,0.35), rgba(4,6,12,0.75)),
          linear-gradient(160deg, #22314f 0%, #101a30 45%, #0a0f1c 100%);
        box-shadow:inset 0 0 60px rgba(0,0,0,0.5); }
      .cl-rwp i { position:absolute; top:-26px; border-radius:50% 50% 55% 55%;
        background:radial-gradient(circle at 32% 28%, rgba(255,255,255,0.65), rgba(190,220,255,0.18) 55%, rgba(140,180,230,0.08));
        box-shadow:inset -1px -2px 3px rgba(255,255,255,0.25), 0 2px 5px rgba(80,130,200,0.3);
        animation:cl-rwp-slide var(--d) linear var(--dl) infinite; }
      @keyframes cl-rwp-slide {
        to { transform:translateY(calc(100% + 120vh)) translateX(var(--dr)); }
      }
      .cl-rwp-city { position:absolute; bottom:0; left:0; right:0; height:34%;
        background:
          linear-gradient(90deg,
            transparent 8%, #0d1524 8% 15%, transparent 15% 24%, #131c30 24% 33%,
            transparent 33% 45%, #0b1322 45% 56%, transparent 56% 68%, #101a2c 68% 78%, transparent 78% 88%, #0e1626 88%);
        filter:blur(1.5px); opacity:0.85; }
    </style>
    <div class="cl-rwp">${drops}<div class="cl-rwp-city"></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
