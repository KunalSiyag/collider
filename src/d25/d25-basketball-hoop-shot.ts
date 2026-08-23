export interface BasketballHoopShotOptions {
  label?: string;
}

export function createBasketballHoopShot(
  container: HTMLElement,
  options: BasketballHoopShotOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n41 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; gap:8%;
        overflow:hidden; background:
          radial-gradient(circle at 70% 24%, rgba(244,114,182,.14), transparent 50%),
          linear-gradient(#0b0b10,#17171c); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n41-court { position:absolute; bottom:6%; left:6%; right:6%; height:7%; border-radius:6px;
        background:repeating-linear-gradient(90deg,#27272a 0 30px,#1c1917 30px 60px); transform:rotateX(52deg);
        transform-origin:center top; box-shadow:0 14px 30px rgba(0,0,0,.55); }
      .cl-n41-backboard { position:absolute; right:12%; top:22%; width:22%; aspect-ratio:.86; border-radius:6px;
        background:linear-gradient(160deg,rgba(103,232,249,.16),rgba(21,94,117,.28));
        border:2px solid #155e75; transform-style:preserve-3d; transform:rotateY(-24deg);
        box-shadow:inset 0 0 22px rgba(103,232,249,.12), 10px 14px 30px rgba(0,0,0,.5); }
      .cl-n41-rim { position:absolute; right:calc(12% - 4%); top:44%; width:17%; height:11px; border-radius:999px;
        border:3px solid #f97316; transform:rotateY(-24deg); box-shadow:0 0 12px rgba(249,115,22,.5); }
      .cl-n41-net { position:absolute; right:calc(12% - 2%); top:47%; width:13%; height:9%;
        background:repeating-linear-gradient(105deg, rgba(250,250,250,.35) 0 1.5px, transparent 1.5px 8px),
                   repeating-linear-gradient(75deg, rgba(250,250,250,.35) 0 1.5px, transparent 1.5px 8px);
        clip-path:polygon(0 0,100% 0,72% 100%,28% 100%); transform:rotateY(-24deg); }
      .cl-n41-ball { position:absolute; left:22%; bottom:16%; width:26px; height:26px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#fdba74,#c2410c 65%,#431407);
        box-shadow:0 0 16px rgba(249,115,22,.4), inset -4px -4px 8px rgba(0,0,0,.35); z-index:2;
        opacity:0; }
      .cl-n41.shoot .cl-n41-ball { animation:cl-n41-arc 1s cubic-bezier(.35,.1,.5,1) forwards; }
      @keyframes cl-n41-arc {
        0%   { opacity:1; left:22%; bottom:16%; transform:scale(1); }
        55%  { left:58%; bottom:74%; transform:scale(.85); }
        100% { left:80%; bottom:38%; transform:scale(.7); opacity:1; }
      }
      .cl-n41-score { position:absolute; top:10px; right:14px; color:#f97316; font-size:12px; letter-spacing:.3em; text-transform:uppercase; opacity:0; transition:opacity .3s; }
      .cl-n41.shoot .cl-n41-score { opacity:1; animation:cl-n41-pop .8s ease .9s forwards; }
      @keyframes cl-n41-pop { from { transform:scale(.6); } to { transform:scale(1.4); opacity:0; } }
    </style>
    <div class="cl-n41">
      <div class="cl-n41-court"></div>
      <div class="cl-n41-backboard"></div>
      <div class="cl-n41-rim"></div>
      <div class="cl-n41-net"></div>
      <div class="cl-n41-ball"></div>
      <span class="cl-n41-score">SWISH!</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n41')!;

  function onClick() {
    root.classList.remove('shoot');
    void root.offsetWidth;
    root.classList.add('shoot');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
