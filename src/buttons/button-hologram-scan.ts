export interface HologramScanOptions {
  label?: string;
}

export function createHologramScanButton(container: HTMLElement, options: HologramScanOptions = {}): () => void {
  const { label = 'Hologram' } = options;

  container.innerHTML = `
    <style>
      .cl-hg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-hg-btn { position:relative; overflow:hidden; padding:15px 40px; font-size:15.5px; font-weight:700;
        letter-spacing:.1em; text-transform:uppercase; color:#a5f3fc;
        background:rgba(34,211,238,.06); border:1px solid rgba(103,232,249,.55); border-radius:8px; cursor:pointer;
        text-shadow:0 0 10px rgba(103,232,249,.7);
        box-shadow:inset 0 0 18px rgba(34,211,238,.14), 0 0 16px rgba(34,211,238,.22);
        transition:box-shadow .3s ease; }
      .cl-hg-btn:hover { box-shadow:inset 0 0 24px rgba(34,211,238,.28), 0 0 26px rgba(34,211,238,.4); }
      .cl-hg-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-hg-btn:active { transform:scale(.97); }
      .cl-hg-scan { position:absolute; left:0; right:0; height:12px;
        background:linear-gradient(180deg, transparent, rgba(103,232,249,.35), transparent);
        animation:cl-hg-move 2.2s linear infinite; pointer-events:none; }
      @keyframes cl-hg-move { from { top:-15%; } to { top:110%; } }
    </style>
    <div class="cl-hg"><button type="button" class="cl-hg-btn"><span class="cl-hg-scan" aria-hidden="true"></span>${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
