export interface EffectOptions {
  text?: string;
}

export function createSplitTextLines(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'DESIGN IN MOTION' } = options;
  const lines = text.split('\n').length > 1 ? text.split('\n') : [text.split(' ').slice(0, Math.ceil(text.split(' ').length / 2)).join(' '), text.split(' ').slice(Math.ceil(text.split(' ').length / 2)).join(' ')];

  container.innerHTML = `
    <style>
      .cl-stl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-stl-h { font-size:clamp(30px,5.4vw,58px); font-weight:800; line-height:1.14; color:#fafafa;
        letter-spacing:-0.01em; }
      .cl-stl-line { display:block; overflow:hidden; }
      .cl-stl-line span { display:inline-block; transform:translateY(110%);
        animation:cl-stl-up .8s cubic-bezier(.22,1,.36,1) forwards; animation-delay:var(--d); }
      .cl-stl-line:nth-child(2) span { background:linear-gradient(90deg,#a78bfa,#22d3ee);
        -webkit-background-clip:text; background-clip:text; color:transparent; }
      @keyframes cl-stl-up { to { transform:translateY(0); } }
    </style>
    <div class="cl-stl"><h1 class="cl-stl-h">
      ${lines.map((l, i) => `<span class="cl-stl-line"><span style="--d:${(i * 0.16).toFixed(2)}s">${l}</span></span>`).join('')}
    </h1></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
