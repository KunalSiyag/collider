export interface EffectOptions {
  flameColor?: string;
}

export function createCandleFlame(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { flameColor = '#ffb347' } = options;

  container.innerHTML = `
    <style>
      .cl-cnd { height:100%; display:flex; align-items:flex-end; justify-content:center; padding-bottom:48px;
        background:radial-gradient(circle at 50% 62%, #17110c, #0b0b10 65%); }
      .cl-cnd-scene { position:relative; display:flex; flex-direction:column; align-items:center; }
      .cl-cnd-flame-wrap { position:relative; z-index:2; margin-bottom:-6px;
        animation:cl-cnd-sway 2.6s ease-in-out infinite alternate; transform-origin:50% 100%; }
      @keyframes cl-cnd-sway { from { transform:rotate(-2.5deg); } to { transform:rotate(2.5deg); } }
      .cl-cnd-flame { width:26px; height:58px; border-radius:50% 50% 42% 42% / 68% 68% 32% 32%;
        background:linear-gradient(to top, ${flameColor}, #fff3c4 55%, #ffffff 90%);
        clip-path:ellipse(50% 50% at 50% 62%); filter:blur(0.6px);
        animation:cl-cnd-dance 0.28s ease-in-out infinite alternate;
        box-shadow:0 0 30px 10px rgba(255,179,71,0.35), 0 0 80px 30px rgba(255,140,50,0.15); }
      @keyframes cl-cnd-dance { from { transform:scaleY(1) scaleX(1); } to { transform:scaleY(1.08) scaleX(0.94); } }
      .cl-cnd-wick { width:3px; height:10px; background:#222; border-radius:2px; z-index:2; }
      .cl-cnd-body { width:64px; height:130px; border-radius:10px 10px 14px 14px;
        background:linear-gradient(90deg, #d8cbff 0%, #f4efff 35%, #b9a7ee 100%); position:relative; overflow:hidden; }
      .cl-cnd-body::after { content:''; position:absolute; top:0; left:0; right:0; height:16px;
        border-radius:50%; background:rgba(255,255,255,0.55); filter:blur(2px);
        box-shadow:inset 0 -4px 6px rgba(185,167,238,0.6); }
      .cl-cnd-glow { position:absolute; bottom:60px; left:50%; transform:translate(-50%,50%); width:340px; height:340px;
        border-radius:50%; pointer-events:none;
        background:radial-gradient(circle, rgba(255,179,71,0.22), transparent 60%);
        animation:cl-cnd-halo 0.9s ease-in-out infinite alternate; }
      @keyframes cl-cnd-halo { from { opacity:0.75; } to { opacity:1; } }
    </style>
    <div class="cl-cnd">
      <div class="cl-cnd-glow"></div>
      <div class="cl-cnd-scene">
        <div class="cl-cnd-flame-wrap"><div class="cl-cnd-flame"></div></div>
        <div class="cl-cnd-wick"></div>
        <div class="cl-cnd-body"></div>
      </div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
