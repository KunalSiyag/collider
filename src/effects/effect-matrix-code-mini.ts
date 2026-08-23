export interface EffectOptions {
  cols?: number;
  speed?: number;
}

export function createMatrixCodeMini(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.cols ?? 22;
  const { speed = 90 } = options;
  const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF*+-<>';

  container.innerHTML = `
    <style>
      .cl-mcm { height:100%; background:#020604; overflow:hidden; position:relative; }
      .cl-mcm-col { position:absolute; top:-100%; font-family:ui-monospace,monospace; font-size:15px; line-height:1.25;
        color:#22c55e; text-shadow:0 0 7px rgba(34,197,94,0.85); white-space:pre; will-change:transform;
        animation:cl-mcm-fall linear infinite; }
      .cl-mcm-col b { display:block; color:#d9ffe3; text-shadow:0 0 10px #86efac; }
      @keyframes cl-mcm-fall { to { transform:translateY(calc(200% + 100vh)); } }
    </style>
    <div class="cl-mcm"></div>
  `;

  const root = container.querySelector('.cl-mcm')!;
  const rand = (len: number) => Array.from({ length: len },
    () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');
  const heads: HTMLElement[] = [];

  for (let i = 0; i < n; i++) {
    const col = document.createElement('div');
    col.className = 'cl-mcm-col';
    col.style.left = `${(i + 0.5) / n * 100}%`;
    col.textContent = rand(14);
    const head = document.createElement('b');
    head.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    col.prepend(head);
    const d = (2.2 + Math.random() * 3).toFixed(2);
    col.style.animationDuration = `${d}s`;
    col.style.animationDelay = `${(-Math.random() * Number(d)).toFixed(2)}s`;
    root.appendChild(col);
    heads.push(head);
  }

  const timer = window.setInterval(() => {
    heads.forEach(h => {
      if (Math.random() > 0.5) h.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    });
  }, speed);

  return () => {
    clearInterval(timer);
    container.innerHTML = '';
  };
}
