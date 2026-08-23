export interface EffectOptions {
  label?: string;
}

export function createMagneticLift(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Magnetic' } = options;

  container.innerHTML = `
    <style>
      .cl-mag { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-mag-btn { padding:18px 44px; border-radius:999px; border:none; cursor:pointer;
        font-size:16px; font-weight:700; color:#0b0b10;
        background: linear-gradient(120deg, #8b5cf6, #22d3ee);
        box-shadow: 0 12px 30px rgba(139,92,246,0.35);
        transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s ease;
        will-change: transform; }
      .cl-mag-btn:hover { box-shadow: 0 18px 42px rgba(139,92,246,0.55); }
      .cl-mag-btn:active { transform: scale(0.96) !important; }
    </style>
    <div class="cl-mag"><button class="cl-mag-btn" type="button">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLElement>('.cl-mag-btn');
  if (btn) {
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const range = Math.max(r.width, r.height);
      if (dist < range * 1.2) {
        btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      } else {
        btn.style.transform = 'translate(0,0)';
      }
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      container.innerHTML = '';
    };
  }

  return () => {
    container.innerHTML = '';
  };
}
