export interface EffectOptions {
  label?: string;
}

export function createTypingDots(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'typing' } = options;

  container.innerHTML = `
    <style>
      .cl-td { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-td-bubble { display:flex; align-items:center; gap:12px; padding:18px 26px;
        border-radius:999px; background:#1c1c21; border:1px solid #2c2c33; color:#a1a1aa; font-size:14px; }
      .cl-td-dots { display:inline-flex; gap:5px; }
      .cl-td-dots i { width:8px; height:8px; border-radius:50%; background:#67e8f9;
        animation: cl-td-bounce 1.2s infinite ease-in-out; }
      .cl-td-dots i:nth-child(2) { animation-delay:.15s; }
      .cl-td-dots i:nth-child(3) { animation-delay:.3s; }
      @keyframes cl-td-bounce { 0%,60%,100% { transform:translateY(0); opacity:.4; } 30% { transform:translateY(-6px); opacity:1; } }
    </style>
    <div class="cl-td"><div class="cl-td-bubble"><span class="cl-td-dots"><i></i><i></i><i></i></span>${label}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
