export interface MagnetHoverOptions {
  label?: string;
}

export function createMagnetHoverButton(container: HTMLElement, options: MagnetHoverOptions = {}): () => void {
  const { label = 'Magnetic' } = options;

  container.innerHTML = `
    <style>
      .cl-mg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-mg-zone { padding:60px 90px; }
      .cl-mg-btn { padding:15px 40px; font-size:15.5px; font-weight:700; color:#fff;
        background:#18181f; border:1px solid #8b5cf6; border-radius:14px; cursor:pointer;
        box-shadow:0 0 18px rgba(139,92,246,.3);
        transition:transform .18s ease-out, background .3s ease, box-shadow .3s ease;
        will-change:transform; }
      .cl-mg-btn:hover { background:#221c38; box-shadow:0 0 30px rgba(139,92,246,.55); }
      .cl-mg-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-mg-btn:active { transform:scale(.95) !important; }
    </style>
    <div class="cl-mg"><div class="cl-mg-zone"><button type="button" class="cl-mg-btn">${label}</button></div></div>
  `;

  const zone = container.querySelector<HTMLElement>('.cl-mg-zone')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-mg-btn')!;

  function onMove(e: MouseEvent) {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
  }

  function onLeave() {
    btn.style.transform = 'translate(0,0)';
  }

  zone.addEventListener('mousemove', onMove);
  zone.addEventListener('mouseleave', onLeave);

  return () => {
    zone.removeEventListener('mousemove', onMove);
    zone.removeEventListener('mouseleave', onLeave);
    container.innerHTML = '';
  };
}
