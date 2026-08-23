export interface EffectOptions {
  label?: string;
}

export function createRippleClick(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Click for ripple' } = options;
  container.innerHTML = `<style>
    .cl-rc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-rc-btn{position:relative;overflow:hidden;padding:18px 42px;font-size:15px;font-weight:600;color:#fafafa;
      background:#18181b;border:1px solid #3f3f46;border-radius:14px;cursor:pointer}
    .cl-rc-wave{position:absolute;border-radius:50%;background:rgba(139,92,246,.5);transform:translate(-50%,-50%);
      pointer-events:none;animation:cl-rc .7s ease-out forwards}
    @keyframes cl-rc{to{width:340px;height:340px;opacity:0}}
  </style><div class="cl-rc"><button type="button" class="cl-rc-btn">${label}</button></div>`;

  const btn = container.querySelector<HTMLElement>('.cl-rc-btn')!;
  function onClick(e: MouseEvent) {
    const rect = btn.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'cl-rc-wave';
    const size = Math.max(rect.width, rect.height);
    Object.assign(wave.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - rect.left}px`, top: `${e.clientY - rect.top}px` });
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 750);
  }
  btn.addEventListener('click', onClick);
  return () => { btn.removeEventListener('click', onClick); container.innerHTML = ''; };
}
