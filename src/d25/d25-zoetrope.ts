export interface ZoetropeOptions {
  figures?: number;
}

export function createZoetrope(
  container: HTMLElement,
  options: ZoetropeOptions = {},
): () => void {
  const n = Math.max(8, Math.min(options.figures ?? 12, 16));
  const radius = Math.round(150 / (2 * Math.tan(Math.PI / n)));

  const slots = Array.from({ length: n }, (_, i) => `<div class="cl-n22-fig" style="--a:${((360 / n) * i).toFixed(1)}deg;--r:${radius}px"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n22 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:radial-gradient(circle at 50% 60%,#1c1917,#0b0b10); perspective:800px; }
      .cl-n22-drum { position:relative; width:300px; height:120px; transform-style:preserve-3d; will-change:transform;
        animation:cl-n22-spin 4s linear infinite; animation-play-state:var(--ps,running); }
      @keyframes cl-n22-spin { to { transform:rotateX(0deg) rotateY(360deg); } from { transform:rotateX(0deg) rotateY(0deg); } }
      .cl-n22-fig { position:absolute; left:50%; top:10px; width:26px; height:86px; margin-left:-13px;
        transform:rotateY(var(--a)) translateZ(var(--r)); background:#67e8f9; opacity:.9;
        clip-path:polygon(50% 0,80% 18%,68% 44%,92% 100%,8% 100%,32% 44%,20% 18%); filter:drop-shadow(0 0 6px rgba(103,232,249,.5)); }
      .cl-n22-wall { position:absolute; inset:0; border-radius:50%/24px; border:3px solid #3f3f46; transform-style:preserve-3d; pointer-events:none; }
      .cl-n22-base { position:absolute; bottom:-16px; left:50%; width:200px; height:26px; margin-left:-100px; border-radius:50%;
        background:#18181b; border:1px solid #3f3f46; box-shadow:0 16px 30px rgba(0,0,0,.5); }
      .cl-n22-hint { color:#71717a; font-size:11px; letter-spacing:.28em; text-transform:uppercase; cursor:pointer; user-select:none; }
      .cl-n22.paused .cl-n22-hint { color:#67e8f9; }
    </style>
    <div class="cl-n22">
      <div class="cl-n22-drum">${slots}<div class="cl-n22-wall"></div></div>
      <div class="cl-n22-base"></div>
      <div class="cl-n22-hint">Click to pause / spin</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n22')!;
  const drum = root.querySelector<HTMLElement>('.cl-n22-drum')!;

  let speed = 4;

  function onDown(e: PointerEvent) {
    const startX = e.clientX;
    const startSpeed = speed;
    function drag(ev: PointerEvent) {
      speed = Math.min(14, Math.max(0.8, startSpeed - (ev.clientX - startX) * 0.02));
      drum.style.animationDuration = `${speed.toFixed(2)}s`;
    }
    function up() {
      window.removeEventListener('pointermove', drag);
      window.removeEventListener('pointerup', up);
    }
    window.addEventListener('pointermove', drag);
    window.addEventListener('pointerup', up);
  }

  function onHint() {
    root.classList.toggle('paused');
    drum.style.animationPlayState = root.classList.contains('paused') ? 'paused' : 'running';
  }

  const hint = root.querySelector<HTMLElement>('.cl-n22-hint')!;

  function onHintClick(e: Event) {
    e.stopPropagation();
    onHint();
  }
  hint.addEventListener('click', onHintClick);
  drum.addEventListener('pointerdown', onDown);

  return () => {
    hint.removeEventListener('click', onHintClick);
    drum.removeEventListener('pointerdown', onDown);
    container.innerHTML = '';
  };
}
