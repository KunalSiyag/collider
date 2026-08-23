export interface HologramPanelOptions {
  title?: string;
}

export function createHologramPanel(
  container: HTMLElement,
  options: HologramPanelOptions = {},
): () => void {
  const { title = 'HOLO-PANEL v2.5' } = options;

  container.innerHTML = `
    <style>
      .cl-hp { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(#101426,#050508); perspective:900px; }
      .cl-hp-panel { width:min(64%,300px); padding:26px; border-radius:14px; position:relative;
        color:#67e8f9; font-family:ui-monospace,monospace; transform-style:preserve-3d;
        background:rgba(8,145,178,0.08); border:1px solid rgba(34,211,238,0.55);
        box-shadow:0 0 24px rgba(34,211,238,.28), inset 0 0 30px rgba(34,211,238,.12);
        text-shadow:0 0 9px rgba(103,232,249,.85); will-change:transform; }
      .cl-hp-panel::before { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
        background:repeating-linear-gradient(transparent 0 3px, rgba(103,232,249,.06) 3px 4px); }
      .cl-hp-row { display:flex; justify-content:space-between; font-size:12.5px; margin-top:10px; opacity:.9; }
      .cl-hp-title { font-size:15px; letter-spacing:.16em; }
    </style>
    <div class="cl-hp"><div class="cl-hp-panel" data-tilt>
      <div class="cl-hp-title">${title}</div>
      <div class="cl-hp-row"><span>CORE</span><span>STABLE</span></div>
      <div class="cl-hp-row"><span>FLUX</span><span>98.2%</span></div>
      <div class="cl-hp-row"><span>SIGNAL</span><span>LOCKED</span></div>
    </div></div>
  `;

  const panel = container.querySelector<HTMLElement>('.cl-hp-panel')!;

  function onMove(event: PointerEvent) {
    const rect = panel.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform = `rotateY(${(px * 22).toFixed(2)}deg) rotateX(${(-py * 18).toFixed(2)}deg) skewX(${(-px * 4).toFixed(2)}deg)`;
  }

  function onLeave() {
    const ctx = [panel];
    void ctx;
    panel.style.transition = 'transform .5s ease';
    panel.style.transform = '';
    setTimeout(() => (panel.style.transition = ''), 500);
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
