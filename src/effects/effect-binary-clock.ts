export interface EffectOptions {
  live?: boolean;
}

export function createBinaryClock(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { live = true } = options;

  container.innerHTML = `
    <style>
      .cl-bc { height:100%; display:flex; align-items:center; justify-content:center; background:#05060a; }
      .cl-bc-face { display:flex; gap:18px; padding:22px 26px; background:#0c0f14;
        border-radius:14px; border:1px solid rgba(34,211,238,0.25); box-shadow:0 0 30px rgba(34,211,238,0.12); }
      .cl-bc-col { display:flex; flex-direction:column; gap:8px; }
      .cl-bc-bit { width:20px; height:20px; border-radius:5px; background:#131720;
        border:1px solid rgba(34,211,238,0.18); transition:background .25s, box-shadow .25s; }
      .cl-bc-bit.on { background:#22d3ee; box-shadow:0 0 10px #22d3ee, 0 0 22px rgba(34,211,238,0.5); }
    </style>
    <div class="cl-bc"><div class="cl-bc-face"></div></div>
  `;

  const face = container.querySelector('.cl-bc-face')!;
  const cols: HTMLElement[][] = [];
  [2, 4, 3, 4, 3, 4].forEach(n => {
    const col: HTMLElement[] = [];
    for (let i = 0; i < n; i++) {
      const bit = document.createElement('div');
      bit.className = 'cl-bc-bit';
      face.appendChild(bit);
      col.push(bit);
    }
    cols.push(col);
  });

  const bitsOf = (v: number, len: number) => Array.from({ length: len }, (_, i) => Boolean((v >> (len - 1 - i)) & 1));

  const render = () => {
    const d = new Date();
    const digits = [Math.floor(d.getHours() / 10), d.getHours() % 10, Math.floor(d.getMinutes() / 10),
      d.getMinutes() % 10, Math.floor(d.getSeconds() / 10), d.getSeconds() % 10];
    digits.forEach((v, c) => {
      bitsOf(v, cols[c].length).forEach((on, r) => cols[c][r].classList.toggle('on', on));
    });
  };
  render();

  let timer: number | undefined;
  if (live) timer = window.setInterval(render, 1000);

  return () => {
    if (timer) clearInterval(timer);
    container.innerHTML = '';
  };
}
