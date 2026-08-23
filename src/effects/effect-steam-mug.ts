export interface EffectOptions {
  label?: string;
}

export function createSteamMug(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Fresh coffee' } = options;

  container.innerHTML = `
    <style>
      .cl-stm { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:20px; }
      .cl-stm-mug-wrap { position:relative; display:flex; align-items:center; }
      .cl-stm-steam { position:absolute; bottom:calc(100% + 4px); left:50%; width:14px; height:44px;
        border-radius:999px; margin-left:-7px; opacity:0;
        background:radial-gradient(ellipse at center, rgba(255,255,255,0.35), transparent 70%);
        filter:blur(3px); animation:cl-stm-rise var(--d) ease-in-out var(--dl) infinite; }
      @keyframes cl-stm-rise {
        0% { transform:translateY(6px) translateX(-50%) scaleX(1); opacity:0; }
        25% { opacity:0.9; }
        100% { transform:translateY(-52px) translateX(calc(-50% + var(--sw))) scaleX(2.2); opacity:0; }
      }
      .cl-stm-body { position:relative; width:110px; height:92px; border-radius:8px 8px 30px 30px; z-index:1;
        background:linear-gradient(160deg,#e5e0f7,#b7aede);
        box-shadow:inset -10px -12px 18px rgba(90,70,150,0.35), 0 16px 30px rgba(0,0,0,0.45); }
      .cl-stm-coffee { position:absolute; top:-2px; left:8px; right:8px; height:18px; border-radius:50%;
        background:radial-gradient(circle at 40% 35%, #6b4023, #3d2413); }
      .cl-stm-handle { position:absolute; right:-34px; top:20px; width:38px; height:46px; border-radius:0 24px 24px 0;
        border:11px solid #cfc7ec; border-left:none; }
      .cl-stm-cap { color:rgba(255,255,255,0.6); font-size:13px; letter-spacing:0.16em; }
    </style>
    <div class="cl-stm">
      <div class="cl-stm-mug-wrap">
        ${[0, 1, 2].map(i => `<span class="cl-stm-steam" style="--d:${(2 + i * 0.5).toFixed(1)}s;
          --dl:${(-i * 0.8).toFixed(1)}s; --sw:${(i - 1) * 22}px"></span>`).join('')}
        <div class="cl-stm-body"><div class="cl-stm-coffee"></div></div>
        <div class="cl-stm-handle"></div>
      </div>
      <span class="cl-stm-cap">${label}</span>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
