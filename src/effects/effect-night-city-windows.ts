export interface EffectOptions {
  windows?: number;
}

export function createNightCityWindows(container: HTMLElement, options: EffectOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .cl-ncw { height:100%; display:flex; align-items:flex-end; justify-content:center; gap:18px; padding:24px;
        background:linear-gradient(to bottom, #0a0a18, #131033 60%, #1c1440); overflow:hidden; }
      .cl-ncw-bld { width:64px; border-radius:6px 6px 0 0; background:#14142a; padding-top:12px;
        display:flex; flex-wrap:wrap; gap:7px; justify-content:center; align-content:flex-start;
        box-shadow:inset 0 8px 16px rgba(0,0,0,0.5); }
      .cl-ncw-w { width:10px; height:12px; border-radius:2px; background:#232342;
        animation:cl-ncw-light 6s ease-in-out infinite; animation-delay:var(--d); }
      @keyframes cl-ncw-light {
        0%, 55% { background:#232342; box-shadow:none; }
        62%, 90% { background:#ffd166; box-shadow:0 0 8px rgba(255,209,102,0.85); }
        96% { background:#232342; }
      }
      .cl-ncw-b1{height:190px}.cl-ncw-b2{height:130px}.cl-ncw-b3{height:230px}.cl-ncw-b4{height:160px}
    </style>
    <div class="cl-ncw">
      ${[1,2,3,4].map(b => `<div class="cl-ncw-bld cl-ncw-b${b}">
        ${Array.from({ length: b === 3 ? 21 : 14 }, () =>
          `<i class="cl-ncw-w" style="--d:${(Math.random() * 6).toFixed(1)}s"></i>`).join('')}
      </div>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
