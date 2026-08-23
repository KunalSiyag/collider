export interface EffectOptions {
  blades?: number;
}

export function createPinwheelSpin(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.blades ?? 10;

  container.innerHTML = `
    <style>
      .cl-pwl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-pwl-wheel { position:relative; width:min(56vmin,240px); aspect-ratio:1;
        animation:cl-pwl-rotate 9s cubic-bezier(.3,.1,.25,1) infinite; }
      @keyframes cl-pwl-rotate {
        0% { transform:rotate(0deg); } 55% { transform:rotate(300deg); }
        75% { transform:rotate(420deg); } 100% { transform:rotate(540deg); }
      }
      .cl-pwl-blade { position:absolute; left:50%; top:50%; width:46%; height:46%; transform-origin:0 0;
        border-radius:100% 4% 100% 4%;
        background:var(--c);
        clip-path:polygon(0 0, 100% 0, 100% 78%, 22% 100%);
        box-shadow:0 0 14px rgba(139,92,246,0.18); }
      .cl-pwl-hub { position:absolute; inset:44%; border-radius:50%;
        background:radial-gradient(circle at 38% 32%, #fff, #a78bfa 70%);
        box-shadow:0 0 20px rgba(167,139,250,0.8); z-index:2; }
    </style>
    <div class="cl-pwl"><div class="cl-pwl-wheel">
      ${Array.from({ length: n }, (_, i) => {
        const c = ['#8b5cf6', '#a78bfa', '#22d3ee', '#67e8f9', '#f472b6'][i % 5];
        return `<i class="cl-pwl-blade" style="--c:${c}; transform:rotate(${i * 360 / n}deg)"></i>`;
      }).join('')}
      <div class="cl-pwl-hub"></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
