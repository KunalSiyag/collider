export interface ArcadeCabinetOptions {
  title?: string;
}

export function createArcadeCabinet(
  container: HTMLElement,
  options: ArcadeCabinetOptions = {},
): () => void {
  const { title = 'DEPTH-RAIDER' } = options;

  container.innerHTML = `
    <style>
      .cl-n18 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 30%,#1e1b4b,#09090b); perspective:1000px; }
      .cl-n18-cab { position:relative; width:min(46%,180px); height:86%; transform-style:preserve-3d;
        transform:rotateY(22deg); transition:transform .5s ease; will-change:transform; }
      .cl-n18:hover .cl-n18-cab { transform:rotateY(8deg); }
      .cl-n18-body { position:absolute; inset:0; border-radius:12px 12px 6px 6px;
        background:linear-gradient(165deg,#312e81,#18181b 70%); border:1px solid #4338ca55;
        box-shadow:-16px 24px 60px rgba(0,0,0,.65), inset 0 0 40px rgba(99,102,241,.08); }
      .cl-n18-screen { position:absolute; top:9%; left:11%; right:11%; height:38%; border-radius:8px;
        background:radial-gradient(circle at 50% 45%,#0e7490aa,#020617 75%); border:3px solid #0f172a;
        box-shadow:inset 0 0 26px rgba(34,211,238,.35), 0 0 18px rgba(34,211,238,.15);
        animation:cl-n18-flicker 2.4s steps(3) infinite; overflow:hidden; }
      @keyframes cl-n18-flicker { 0%,92% { opacity:1; } 96% { opacity:.82; } }
      .cl-n18-scan { position:absolute; inset:0; background:repeating-linear-gradient(rgba(103,232,249,.09) 0 2px, transparent 2px 5px); }
      .cl-n18-invader { position:absolute; top:32%; left:50%; width:26px; height:14px; margin-left:-13px;
        background:#67e8f9; clip-path:polygon(15% 0,85% 0,100% 35%,80% 60%,100% 100%,60% 78%,40% 100%,0 100%,20% 60%,0 35%);
        animation:cl-n18-march 2.2s linear infinite; }
      @keyframes cl-n18-march { 0%,49% { transform:translateX(-16px) translateY(0); } 50%,100% { transform:translateX(16px) translateY(5px); } }
      .cl-n18-marquee { position:absolute; top:1.5%; left:8%; right:8%; text-align:center; color:#a78bfa;
        font-size:10px; letter-spacing:.28em; text-shadow:0 0 10px rgba(167,139,250,.7);
        background:#141420; border-radius:6px; padding:3px 0; }
      .cl-n18-panel { position:absolute; bottom:16%; left:-4%; right:-4%; height:16%; border-radius:8px;
        background:linear-gradient(#27272a,#101014); transform-origin:center top; transform:rotateX(-42deg) translateZ(8px);
        box-shadow:0 -6px 20px rgba(0,0,0,.4); }
      .cl-n18-stick { position:absolute; bottom:44%; left:22%; width:6px; height:26px; background:#f472b6; border-radius:3px;
        transform-origin:bottom center; animation:cl-n18-wiggle 2.2s ease-in-out infinite; }
      @keyframes cl-n18-wiggle { 0%,100% { transform:rotateZ(-14deg); } 50% { transform:rotateZ(14deg); } }
      .cl-n18-btns { position:absolute; bottom:52%; right:16%; display:flex; gap:5px; }
      .cl-n18-btns i { width:10px; height:10px; border-radius:50%; }
      .cl-n18-btns i:nth-child(1) { background:#22d3ee; } .cl-n18-btns i:nth-child(2) { background:#f472b6; }
      .cl-n18-base { position:absolute; bottom:-4%; left:6%; right:6%; height:12%; border-radius:6px;
        background:#0b0b10; border:1px solid #27272a; transform:translateZ(-20px); }
    </style>
    <div class="cl-n18">
      <div class="cl-n18-cab">
        <div class="cl-n18-body"></div>
        <div class="cl-n18-marquee">${title}</div>
        <div class="cl-n18-screen"><div class="cl-n18-scan"></div><div class="cl-n18-invader"></div></div>
        <div class="cl-n18-panel"><div class="cl-n18-stick"></div><div class="cl-n18-btns"><i></i><i></i></div></div>
        <div class="cl-n18-base"></div>
      </div>
    </div>
  `;

  const cab = container.querySelector<HTMLElement>('.cl-n18-cab')!;

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    cab.style.transform = `rotateY(${(22 + px * -34).toFixed(1)}deg)`;
  }

  function onLeave() {
    cab.style.transform = 'rotateY(22deg)';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
