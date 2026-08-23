export interface EffectOptions {
  message?: string;
}

export function createDotMatrixBoard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { message = 'WELCOME ABOARD' } = options;
  const FONT: Record<string, number[]> = {
    A:[14,17,31,17,17],B:[30,17,30,17,30],C:[14,17,16,17,14],D:[30,17,17,17,30],E:[31,16,30,16,31],
    F:[31,16,30,16,16],G:[14,17,23,17,15],H:[17,17,31,17,17],I:[14,4,4,4,14],J:[7,2,2,18,12],
    K:[17,18,28,18,17],L:[16,16,16,16,31],M:[17,27,21,17,17],N:[17,25,21,19,17],O:[14,17,17,17,14],
    P:[30,17,30,16,16],Q:[14,17,21,19,15],R:[30,17,30,18,17],S:[15,16,14,1,30],T:[31,4,4,4,4],
    U:[17,17,17,17,14],V:[17,17,17,10,4],W:[17,17,21,27,17],X:[17,10,4,10,17],Y:[17,10,4,4,4],
    Z:[31,2,4,8,31],' ':[0,0,0,0,0],'!':[4,4,4,0,4]
  };

  const cols: boolean[][] = [];
  for (const ch of message.toUpperCase()) {
    const rows = FONT[ch] ?? FONT[' '];
    for (let c = 4; c >= 0; c--) cols.push(rows.map(r => Boolean((r >> c) & 1)));
    cols.push(new Array(5).fill(false));
  }

  const gridHTML = Array.from({ length: 7 }, (_, row) =>
    `<div class="cl-dmb-row">${cols.map(col =>
      `<i class="${row > 0 && row < 6 && col[row - 1] ? 'on' : ''}"></i>`).join('')}</div>`).join('');

  container.innerHTML = `
    <style>
      .cl-dmb { height:100%; display:flex; align-items:center; justify-content:center; background:#08080c; padding:16px; overflow:auto; }
      .cl-dmb-panel { background:#0e0e14; border:1px solid #26263a; border-radius:12px; padding:14px;
        box-shadow:inset 0 0 30px rgba(0,0,0,0.7), 0 0 24px rgba(139,92,246,0.08); }
      .cl-dmb-row { display:flex; gap:4px; }
      .cl-dmb-row + .cl-dmb-row { margin-top:4px; }
      .cl-dmb-row i { width:9px; height:9px; border-radius:50%; background:#1b1b28; }
      .cl-dmb-row i.on { background:#f472b6; box-shadow:0 0 6px rgba(244,114,182,0.9); animation:cl-dmb-pop .4s both; }
      @keyframes cl-dmb-pop { from { opacity:0; transform:scale(0.4); } to { opacity:1; transform:scale(1); } }
    </style>
    <div class="cl-dmb"><div class="cl-dmb-panel">${gridHTML}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
