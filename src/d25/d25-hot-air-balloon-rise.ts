export interface HotAirBalloonRiseOptions {
  label?: string;
}

export function createHotAirBalloonRise(
  container: HTMLElement,
  options: HotAirBalloonRiseOptions = {},
): () => void {
  const { label = 'SKYWARD' } = options;

  container.innerHTML = `
    <style>
      .cl-n74 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10,#1e1b4b); perspective:900px; cursor:pointer; user-select:none; }
      .cl-n74-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform 1s ease; }
      .cl-n74-cloud { position:absolute; border-radius:999px; background:#27272a99; filter:blur(6px);
        animation:cl-n74-drift linear infinite; }
      @keyframes cl-n74-drift { from { left:-30%; } to { left:110%; } }
      .cl-n74-balloon { position:absolute; left:50%; bottom:-40px; width:96px; margin-left:-48px;
        transform-style:preserve-3d; will-change:transform, bottom;
        transition:bottom 3.2s cubic-bezier(.4,.05,.3,1); }
      .cl-n74.up .cl-n74-balloon { bottom:56%; }
      .cl-n74-envelope { position:relative; width:100%; aspect-ratio:.86;
        background:
          repeating-conic-gradient(from 0deg at 50% 60%, #f472b6 0 14deg, #a78bfa 14deg 28deg);
        clip-path:polygon(50% 0,88% 22%,72% 78%,50% 100%,28% 78%,12% 22%);
        filter:drop-shadow(-10px 14px 24px rgba(0,0,0,.45));
        transform-style:preserve-3d; animation:cl-n74-sway 4s ease-in-out infinite alternate; }
      @keyframes cl-n74-sway { from { rotate:-2.5deg; } to { rotate:2.5deg; } }
      .cl-n74-basket { position:relative; width:34px; height:26px; margin:-4px auto 0;
        background:repeating-linear-gradient(45deg,#7c4a12 0 5px,#451a03 5px 10px);
        border-radius:4px 4px 8px 8px; }
      .cl-n74-rope { position:absolute; width:1.5px; height:16px; background:#e4e4e7aa; top:-14px; }
      .cl-n74-hint { position:absolute; bottom:12px; width:100%; text-align:center; color:#c4b5fd; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n74-tag { position:absolute; top:14px; left:16px; color:#67e8f9; font-size:10px; letter-spacing:.42em; text-transform:uppercase; }
    </style>
    <div class="cl-n74">
      <span class="cl-n74-tag">${label}</span>
      ${Array.from({ length: 4 }, (_, i) => `<i class="cl-n74-cloud" style="top:${(18 + i * 18).toFixed(0)}%;width:${(70 + i * 30).toFixed(0)}px;height:${(20 + i * 6).toFixed(0)}px;animation-duration:${(16 + i * 7).toFixed(0)}s;animation-delay:${(-i * 5).toFixed(0)}s"></i>`).join('')}
      <div class="cl-n74-scene" style="position:absolute;left:0;right:0;top:0;height:100%;">
        <div class="cl-n74-balloon">
          <i class="cl-n74-rope" style="left:31%"></i><i class="cl-n74-rope" style="right:31%"></i>
          <div class="cl-n74-envelope"></div>
          <div class="cl-n74-basket"></div>
        </div>
      </div>
      <div class="cl-n74-hint">CLICK TO LAUNCH</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n74')!;
  const scene = root.querySelector<HTMLElement>('.cl-n74-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.07;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('up');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 36;
  }

  function onLeave() {
    t.ry = 0;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
