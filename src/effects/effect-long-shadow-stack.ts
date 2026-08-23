export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createLongShadowStack(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'DEPTH', body = 'Layered long shadow lifts the tile off the page.' } = options;

  const steps: string[] = [];
  for (let i = 1; i <= 14; i++) {
    steps.push(`${i * 3}px ${i * 3}px 0 rgba(${34 + i * 4}, ${211 - i * 8}, ${238 - i * 10}, ${0.5 - i * 0.03})`);
  }

  container.innerHTML = `
    <style>
      .cl-lss { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-lss-tile { width:min(60%, 260px); padding:30px; border-radius:16px; background:#22d3ee;
        box-shadow: ${steps.join(', ')}, 46px 46px 40px rgba(0,0,0,0.35);
        transition: transform .35s ease, filter .35s ease; }
      .cl-lss-tile:hover { transform: translate(-6px, -6px); filter:brightness(1.08); }
      .cl-lss-tile h3 { margin:0 0 6px; color:#06232b; font-size:24px; font-weight:800; letter-spacing:0.12em; }
      .cl-lss-tile p { margin:0; color:#083344; font-size:13px; }
      .cl-lss-wrap { animation: cl-lss-bob 4s ease-in-out infinite; }
      @keyframes cl-lss-bob { 50% { transform: translateY(-8px); } }
    </style>
    <div class="cl-lss"><div class="cl-lss-wrap"><div class="cl-lss-tile"><h3>${title}</h3><p>${body}</p></div></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
