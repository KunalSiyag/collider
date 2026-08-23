export interface EffectOptions {
  emoji?: string;
  caption?: string;
}

export function createEyeFollowCursor(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🤖', caption = 'I see you' } = options;

  container.innerHTML = `
    <style>
      .cl-efc { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:#0b0b10; }
      .cl-efc-face { font-size:96px; line-height:1; user-select:none; }
      .cl-efc-eyes { display:flex; gap:22px; margin-top:-30px; position:relative; z-index:1; }
      .cl-efc-eye { width:34px; height:38px; border-radius:50%; background:#fff; position:relative;
        box-shadow:inset 0 -3px 6px rgba(0,0,0,0.25); overflow:hidden; }
      .cl-efc-pupil { position:absolute; left:50%; top:50%; width:14px; height:14px; margin:-7px;
        border-radius:50%; background:#18181b; will-change:transform; }
      .cl-efc-cap { color:#a78bfa; font-size:13px; letter-spacing:0.18em; }
    </style>
    <div class="cl-efc">
      <span class="cl-efc-face">${emoji}</span>
      <div class="cl-efc-eyes">
        <div class="cl-efc-eye"><div class="cl-efc-pupil"></div></div>
        <div class="cl-efc-eye"><div class="cl-efc-pupil"></div></div>
      </div>
      <span class="cl-efc-cap">${caption}</span>
    </div>
  `;

  const root = container.querySelector('.cl-efc')!;
  const pupils = Array.from(root.querySelectorAll('.cl-efc-pupil')) as HTMLElement[];
  let raf = 0, tx = 0, ty = 0;

  const onMove = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2 - 30);
    const ang = Math.atan2(dy, dx);
    tx = Math.cos(ang) * 9; ty = Math.sin(ang) * 11;
  };
  const tick = () => {
    pupils.forEach(p => {
      p.style.transform = `translate(${tx}px, ${ty}px)`;
    });
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  window.addEventListener('pointermove', onMove);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
