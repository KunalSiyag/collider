export interface StackGameTowerOptions {
  blocks?: number;
}

export function createStackGameTower(
  container: HTMLElement,
  options: StackGameTowerOptions = {},
): () => void {
  const n = Math.max(6, Math.min(options.blocks ?? 10, 14));

  const blocks = Array.from({ length: n }, (_, i) => {
    const hue = ['#a78bfa', '#8b5cf6', '#22d3ee'][i % 3];
    return `<div class="cl-n26-block" style="--i:${n - 1 - i};--c:${hue}"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n26 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:10px;
        padding-bottom:8%; background:linear-gradient(#131317,#0b0b10); perspective:700px; cursor:pointer; user-select:none; overflow:hidden; }
      .cl-n26-scene { position:relative; width:min(60%,220px); height:72%; transform-style:preserve-3d;
        transform:rotateX(52deg) rotateZ(-38deg); }
      .cl-n26-block { position:absolute; left:calc(50% + var(--ox,0px)); top:calc(var(--i) * 9%); width:96px; height:8%;
        margin-left:-48px; border-radius:3px; background:linear-gradient(var(--c),#101014);
        box-shadow:inset 0 2px 0 rgba(255,255,255,.25), 0 6px 14px rgba(0,0,0,.45);
        transform-style:preserve-3d; animation:cl-n26-drop .45s cubic-bezier(.3,.8,.4,1.2) backwards;
        animation-delay:calc(var(--i) * .07s); --wobble:0deg; }
      @keyframes cl-n26-drop { from { opacity:0; transform:translateZ(140px); } to { opacity:1; transform:translateZ(0); } }
      .cl-n26-base { position:absolute; left:calc(50% - 55px); top:100%; width:110px; height:10px; border-radius:3px; background:#27272a; }
      .cl-n26-score { color:#67e8f9; font-size:12px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n26">
      <div class="cl-n26-score">Click to stack</div>
      <div class="cl-n26-scene"><div class="cl-n26-base"></div>${blocks}</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n26')!;
  const scene = root.querySelector<HTMLElement>('.cl-n26-scene')!;

  let placed = n;
  let tilt = 0;

  function onClick(e: Event) {
    e.stopPropagation();
    placed += 1;
    tilt = ((tilt + 1) % 2 ? 1 : -1) * (Math.random() * 3);
    const hue = ['#a78bfa', '#8b5cf6', '#22d3ee', '#f472b6'][placed % 4];
    const b = document.createElement('div');
    b.className = 'cl-n26-block';
    b.style.setProperty('--i', String(n));
    b.style.setProperty('--c', hue);
    b.style.top = `${n * 9}%`;
    b.style.left = `calc(50% + ${(Math.random() * 40 - 20).toFixed(0)}px)`;
    scene.appendChild(b);
    scene.style.transform = `rotateX(52deg) rotateZ(${-38 + tilt}deg)`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
