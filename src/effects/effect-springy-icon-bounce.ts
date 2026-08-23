export interface EffectOptions {
  count?: number;
}

export function createSpringyIconBounce(container: HTMLElement, options: EffectOptions = {}): () => void {
  const icons = ['🚀', '🎨', '🎧', '📷', '🧩'];

  container.innerHTML = `
    <style>
      .cl-sib { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; background:#0b0b10; }
      .cl-sib-i { width:72px; height:72px; border-radius:22px; display:flex; align-items:center; justify-content:center;
        font-size:32px; cursor:pointer; background:#18181b; border:1px solid rgba(255,255,255,0.1);
        transition:border-color .25s; }
      .cl-sib-i:hover { border-color:#8b5cf6; animation:cl-sib-pop .6s cubic-bezier(.28,2.2,.4,.9); }
      @keyframes cl-sib-pop {
        0% { transform:translateY(0) scale(1); }
        30% { transform:translateY(-20px) scale(1.12); }
        55% { transform:translateY(4px) scale(0.94); }
        75% { transform:translateY(-7px) scale(1.04); }
        100% { transform:translateY(0) scale(1); }
      }
    </style>
    <div class="cl-sib">${icons.map(i => `<div class="cl-sib-i">${i}</div>`).join('')}</div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
