export interface EffectOptions {
  glyph?: string;
  name?: string;
}

export function createHoloScanPortrait(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { glyph = '👤', name = 'SUBJECT-07' } = options;

  container.innerHTML = `
    <style>
      .cl-hsp { height:100%; display:flex; align-items:center; justify-content:center; gap:22px;
        background:#04070a; padding:20px; }
      .cl-hsp-frame { position:relative; width:190px; height:230px; border:1px solid rgba(34,211,238,0.5);
        border-radius:10px; overflow:hidden;
        background:
          repeating-linear-gradient(0deg, rgba(34,211,238,0.06) 0 2px, transparent 2px 6px), #06121a;
        box-shadow:inset 0 0 30px rgba(34,211,238,0.1); }
      .cl-hsp-face { position:absolute; inset:14px; display:flex; align-items:flex-end; justify-content:center;
        font-size:110px; color:rgba(103,232,249,0.85);
        filter:saturate(0) brightness(1.3) drop-shadow(0 0 8px rgba(34,211,238,0.7)); }
      .cl-hsp-beam { position:absolute; left:0; right:0; height:46px; top:-50px; pointer-events:none;
        background:linear-gradient(to bottom, transparent, rgba(103,232,249,0.35), rgba(103,232,249,0.75));
        animation:cl-hsp-scan 2.6s cubic-bezier(.45,.05,.55,.95) infinite; }
      @keyframes cl-hsp-scan { to { transform:translateY(calc(230px + 60px)); } }
      .cl-hsp-meta { color:#67e8f9; font-family:ui-monospace,monospace; font-size:12px; line-height:2.1;
        letter-spacing:0.1em; opacity:0.9; }
      .cl-hsp-meta b { display:block; font-size:15px; letter-spacing:0.24em; margin-bottom:4px; }
      .cl-hsp-meta i { font-style:normal; color:rgba(167,139,250,0.9); animation:cl-hsp-blink 1s steps(1) infinite; }
      @keyframes cl-hsp-blink { 50% { opacity:0; } }
    </style>
    <div class="cl-hsp">
      <div class="cl-hsp-frame"><div class="cl-hsp-face">${glyph}</div><div class="cl-hsp-beam"></div></div>
      <div class="cl-hsp-meta"><b>${name}</b>STATUS<span style="color:#4ade80"> ONLINE</span><br>
        SCAN<i> ▌</i><br>CLEARANCE 04</div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
