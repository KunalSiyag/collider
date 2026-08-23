export interface EffectOptions {
  count?: number;
}

export function createBubbleRise(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.count ?? 16;

  const bubbles = Array.from({ length: n }, (_, i) => {
    const size = 6 + Math.random() * 20;
    const dur = 5 + Math.random() * 6;
    const delay = -Math.random() * dur;
    const drift = (Math.random() * 80 - 40).toFixed(0);
    return `<span class="cl-brs-b" style="left:${(Math.random() * 96).toFixed(1)}%; width:${size.toFixed(0)}px; height:${size.toFixed(0)}px;
      --dur:${dur.toFixed(1)}s; --delay:${delay.toFixed(1)}s; --drift:${drift}px"></span>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-brs { position:relative; height:100%; overflow:hidden;
        background:linear-gradient(160deg,#07203a,#0b0b10 70%); }
      .cl-brs-b { position:absolute; bottom:-30px; border-radius:50%;
        background:radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(103,232,249,0.25) 45%, rgba(34,211,238,0.08) 70%);
        border:1px solid rgba(103,232,249,0.35);
        animation:cl-brs-rise var(--dur) linear var(--delay) infinite; }
      @keyframes cl-brs-rise {
        0% { transform:translateY(0) translateX(0); opacity:0; }
        12% { opacity:1; }
        100% { transform:translateY(calc(-100vh - 60px)) translateX(var(--drift)); opacity:0; }
      }
    </style>
    <div class="cl-brs">${bubbles}</div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
