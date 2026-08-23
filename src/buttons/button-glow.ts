export interface ButtonOptions {
  label?: string;
}

export function createGlowButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Get started' } = options;

  container.innerHTML = `
    <style>
      .cl-bg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bg-btn { position:relative; padding:15px 38px; font-size:15.5px; font-weight:700; color:#09090b;
        background:linear-gradient(120deg,#a78bfa,#67e8f9); border:none; border-radius:12px; cursor:pointer;
        transition:transform .2s ease, box-shadow .3s ease; }
      .cl-bg-btn:hover { transform:translateY(-2px); box-shadow:0 0 26px rgba(139,92,246,.65), 0 0 60px rgba(34,211,238,.3); }
      .cl-bg-btn:active { transform:translateY(0) scale(0.98); }
    </style>
    <div class="cl-bg"><button type="button" class="cl-bg-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
