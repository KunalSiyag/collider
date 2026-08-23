export interface DiceTowerOptions {
  dice?: number;
}

export function createDiceTower(
  container: HTMLElement,
  options: DiceTowerOptions = {},
): () => void {
  const n = Math.max(1, Math.min(options.dice ?? 3, 5));

  const dice = Array.from({ length: n }, (_, i) => `<div class="cl-n13-die" data-i="${i}">
    ${[1, 2, 3, 4, 5, 6].map((f) => `<div class="cl-n13-face f${f}">${'&#183;'.repeat(0)}<b>${['', '•', '••', '• •', '•\n•', '• ••', '••\n••'][f]}</b></div>`).join('')}
  </div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n13 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
        background:radial-gradient(circle at 50% 20%,#1c1917,#0b0b10); perspective:900px; cursor:pointer; user-select:none; }
      .cl-n13-tray { position:relative; width:min(64%,260px); height:34%; border-radius:14px;
        background:linear-gradient(#18181b,#101014); border:1px solid #3f3f46;
        transform-style:preserve-3d; transform:rotateX(46deg) rotateZ(-8deg); box-shadow:0 30px 60px rgba(0,0,0,.6); }
      .cl-n13-die { position:absolute; top:30%; left:40%; width:44px; height:44px; transform-style:preserve-3d; opacity:0; }
      .cl-n13-die.rolled { animation:cl-n13-tumble 1s cubic-bezier(.2,.7,.3,1.1) forwards; }
      @keyframes cl-n13-tumble {
        0%   { opacity:0; transform:translate3d(-60px,-160px,-120px) rotateX(0) rotateY(0); }
        70%  { opacity:1; }
        100% { opacity:1; transform:translate3d(var(--dx),var(--dy),0) rotateX(var(--rx)) rotateY(var(--ry)); }
      }
      .cl-n13-face { position:absolute; inset:0; display:grid; place-items:center; background:linear-gradient(150deg,#fafafa,#d4d4d8);
        color:#18181b; font-size:15px; line-height:1.1; text-align:center; white-space:pre; backface-visibility:hidden; border-radius:8px; }
      .cl-n13-face.f1 { transform:translateZ(22px); }
      .cl-n13-face.f2 { transform:rotateY(180deg) translateZ(22px); }
      .cl-n13-face.f3 { transform:rotateY(90deg) translateZ(22px); }
      .cl-n13-face.f4 { transform:rotateY(-90deg) translateZ(22px); }
      .cl-n13-face.f5 { transform:rotateX(90deg) translateZ(22px); }
      .cl-n13-face.f6 { transform:rotateX(-90deg) translateZ(22px); }
      .cl-n13-hint { color:#71717a; font-size:11px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n13">
      <div class="cl-n13-tray">${dice}</div>
      <div class="cl-n13-hint">Click to roll</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n13')!;
  const diceEls = Array.from(root.querySelectorAll<HTMLElement>('.cl-n13-die'));

  function onClick() {
    diceEls.forEach((die) => {
      die.classList.remove('rolled');
      void die.offsetWidth;
      die.style.setProperty('--dx', `${((Math.random() - 0.5) * 150).toFixed(0)}px`);
      die.style.setProperty('--dy', `${((Math.random() - 0.5) * 90).toFixed(0)}px`);
      const rx = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
      const ry = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
      die.style.setProperty('--rx', `${rx + 360}deg`);
      die.style.setProperty('--ry', `${ry + 360}deg`);
      void die.offsetWidth;
      die.classList.add('rolled');
    });
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
