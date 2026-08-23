export interface BowlingLanePinsOptions {
  pins?: number;
}

export function createBowlingLanePins(
  container: HTMLElement,
  options: BowlingLanePinsOptions = {},
): () => void {
  const rows = [1, 2, 3];
  const pins = rows.flatMap((count, r) =>
    Array.from({ length: count }, (_, i) => {
      const x = 50 + (i - (count - 1) / 2) * 9;
      return `<i class="cl-n40-pin" style="--x:${x.toFixed(0)}%;--y:${14 + r * 9}%;--d:${(r * 0.06).toFixed(2)}s"></i>`;
    }),
  ).join('');

  container.innerHTML = `
    <style>
      .cl-n40 { height:100%; position:relative; display:flex; align-items:center; justify-content:center;
        overflow:hidden; background:linear-gradient(#131317,#0b0b10); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n40-lane { position:absolute; bottom:8%; left:26%; right:26%; top:10%;
        background:repeating-linear-gradient(90deg,#3f2711aa 0 22px,#2c1c0caa 22px 44px);
        border-radius:10px 10px 999px 999px / 12px 12px 30px 30px; transform-style:preserve-3d;
        box-shadow:inset 0 -20px 44px rgba(0,0,0,.6), 0 0 0 3px #27272a; }
      .cl-n40-pin { position:absolute; left:var(--x); top:var(--y); width:9px; height:24px; margin-left:-4.5px;
        border-radius:50% 50% 42% 42% / 62% 62% 38% 38%;
        background:linear-gradient(90deg,#e4e4e7,#fafafa 45%,#a1a1aa);
        box-shadow:0 4px 8px rgba(0,0,0,.5); transform-origin:center bottom; transition:transform .35s ease; transition-delay:var(--d); }
      .cl-n40.strike .cl-n40-pin { transform:rotateZ(calc((var(--x) - 50) * 3deg)) translateY(-7px) translateX(calc((var(--x) - 50) * 1.6px)); }
      .cl-n40-ball { position:absolute; left:50%; bottom:16%; width:22px; height:22px; margin-left:-11px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#c4b5fd,#5b21b6 60%,#1e1042);
        box-shadow:0 0 14px rgba(139,92,246,.5), inset -4px -4px 8px rgba(0,0,0,.4); z-index:2; opacity:.95; }
      .cl-n40.roll .cl-n40-ball { animation:cl-n40-roll .8s cubic-bezier(.4,.05,.6,1) forwards; }
      @keyframes cl-n40-roll { from { bottom:16%; transform:scale(1); } to { bottom:64%; transform:scale(.55); } }
      .cl-n40-hint { position:absolute; top:12px; width:100%; text-align:center; color:#a78bfa; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n40">
      <div class="cl-n40-lane">${pins}<div class="cl-n40-ball"></div></div>
      <div class="cl-n40-hint">Click to roll</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n40')!;

  function onClick() {
    root.classList.remove('roll', 'strike');
    void root.offsetWidth;
    root.classList.add('roll');
    setTimeout(() => root.classList.add('strike'), 800);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
