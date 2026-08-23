export interface WindmillBladesOptions {
  sails?: number;
}

export function createWindmillBlades(
  container: HTMLElement,
  options: WindmillBladesOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.sails ?? 4, 8));

  const blades = Array.from({ length: n }, (_, i) => {
    const a = (360 / n) * i;
    return `<div class="cl-n29-blade" style="--a:${a}deg"><i></i></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n29 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10 30%,#1e1b4b); perspective:800px; }
      .cl-n29-scene { position:relative; width:min(56%,240px); height:80%; transform-style:preserve-3d; will-change:transform; }
      .cl-n29-tower { position:absolute; bottom:4%; left:50%; width:26%; height:58%; margin-left:-13%;
        background:linear-gradient(90deg,#27272a,#3f3f46,#18181b);
        clip-path:polygon(34% 0,66% 0,92% 100%,8% 100%); border-radius:6px; box-shadow:-14px 18px 40px rgba(0,0,0,.5); }
      .cl-n29-cap { position:absolute; top:calc(38% - 22px); left:50%; width:15%; aspect-ratio:1; margin-left:-7.5%;
        border-radius:50%; background:radial-gradient(circle at 35% 35%,#67e8f9,#155e75); z-index:2;
        box-shadow:0 0 16px rgba(103,232,249,.5); }
      .cl-n29-rotor { position:absolute; top:38%; left:50%; width:150px; height:150px; margin:-75px 0 0 -75px;
        transform-style:preserve-3d; will-change:transform; animation:cl-n29-spin 7s linear infinite; z-index:1; }
      @keyframes cl-n29-spin { to { transform:rotateZ(360deg) rotateY(24deg); } from { transform:rotateZ(0deg) rotateY(24deg); } }
      .cl-n29-blade { position:absolute; inset:0; transform:rotateZ(var(--a)); transform-style:preserve-3d; }
      .cl-n29-blade i { position:absolute; top:6px; left:50%; width:20px; height:62px; margin-left:-10px;
        background:linear-gradient(#a78bfacc,#6d28d988); border-radius:4px; transform-origin:center top;
        transform:perspective(300px) rotateY(28deg); box-shadow:0 0 12px rgba(167,139,250,.3); }
      .cl-n29-hill { position:absolute; bottom:-2%; left:-10%; right:-10%; height:14%; border-radius:50%;
        background:#101014; filter:blur(2px); }
    </style>
    <div class="cl-n29">
      <div class="cl-n29-scene" style="transform:rotateX(6deg)">
        <div class="cl-n29-hill"></div>
        <div class="cl-n29-tower"></div>
        <div class="cl-n29-cap"></div>
        <div class="cl-n29-rotor">${blades}</div>
      </div>
    </div>
  `;

  const rotor = container.querySelector<HTMLElement>('.cl-n29-rotor')!;

  function onDown(e: PointerEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    let rz = 0;
    let ry = 24;
    function drag(ev: PointerEvent) {
      ry = Math.min(80, Math.max(-80, ry + (ev.clientY - startY) * 0.2));
      rotor.style.animationPlayState = 'paused';
      rotor.style.transform = `rotateZ(${rz}deg) rotateY(${ry.toFixed(1)}deg)`;
      void startX;
    }
    function up() {
      window.removeEventListener('pointermove', drag);
      window.removeEventListener('pointerup', up);
    }
    window.addEventListener('pointermove', drag);
    window.addEventListener('pointerup', up);
  }

  rotor.addEventListener('pointerdown', onDown);

  return () => {
    rotor.removeEventListener('pointerdown', onDown);
    container.innerHTML = '';
  };
}
