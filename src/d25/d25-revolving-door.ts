export interface RevolvingDoorOptions {
  wings?: number;
}

export interface RevolvingDoorOptions {
  wings?: number;
}

export function createRevolvingDoor(
  container: HTMLElement,
  options: RevolvingDoorOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.wings ?? 4, 6));

  const wings = Array.from({ length: n }, (_, i) => `<div class="cl-n82-wing" style="--a:${((360 / n) * i).toFixed(1)}deg"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n82 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 30% 20%, rgba(167,139,250,.1), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n82-lobby { position:relative; width:min(56%,230px); aspect-ratio:.86; transform-style:preserve-3d;
        will-change:transform; transition:transform .6s cubic-bezier(.4,.05,.3,1); }
      .cl-n82-shell { position:absolute; inset:0; border-radius:10px;
        border:3px solid #52525b; background:rgba(103,232,249,.05);
        box-shadow:inset 0 0 34px rgba(103,232,249,.07), -14px 22px 48px rgba(0,0,0,.55); }
      .cl-n82-core { position:absolute; left:50%; top:50%; width:14px; height:14px; margin:-7px 0 0 -7px;
        border-radius:50%; background:#f472b6; box-shadow:0 0 16px rgba(244,114,182,.65); z-index:2; }
      .cl-n82-wing { position:absolute; left:50%; top:50%; width:42%; height:5px;
        transform-origin:left center;
        background:linear-gradient(90deg, rgba(167,139,250,.85), rgba(167,139,250,.15));
        box-shadow:0 3px 10px rgba(0,0,0,.45); z-index:1;
        transform:translateY(-50%) rotateZ(var(--a)); }
      .cl-n82.spun .cl-n82-lobby { transform:rotateZ(120deg); }
      .cl-n82-floorring { position:absolute; bottom:-8%; left:6%; right:6%; height:12%;
        border-radius:50%; border:2px solid #27272a; transform:rotateX(64deg); background:#101014; }
      .cl-n82-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n82">
      <div class="cl-n82-floorring"></div>
      <div class="cl-n82-lobby">
        <div class="cl-n82-shell"></div>
        ${wings}
        <div class="cl-n82-core"></div>
      </div>
      <div class="cl-n82-hint">CLICK TO REVOLVE</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n82')!;
  const lobby = root.querySelector<HTMLElement>('.cl-n82-lobby')!;

  let quarter = 0;

  function onClick() {
    quarter += 1;
    lobby.style.transform = `rotateZ(${quarter * 90}deg)`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
