/** Follow Tooltip — a tooltip that trails the cursor with soft lag. */
export interface FollowTooltipOptions {
  label?: string;
  accent?: string;
}

export function createFollowTooltip(container: HTMLElement, options: FollowTooltipOptions = {}): () => void {
  const { label = 'That is the spot', accent = '#8b5cf6' } = options;

  container.innerHTML = `<style>
    .tt-fl{height:100%;display:grid;place-items:center;background:
      radial-gradient(ellipse at 50% 50%,#1c1c22,#0b0b10);cursor:crosshair}
    .tt-fl .zone{color:#52525b;font:400 13px system-ui;user-select:none}
    .tt-fl .tip{position:fixed;z-index:60;pointer-events:none;background:${accent};color:#fff;
      font:600 12px system-ui;padding:6px 11px;border-radius:8px;white-space:nowrap;
      box-shadow:0 8px 24px ${accent}55;opacity:0;transition:opacity .15s ease}
    .tt-fl .tip::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;
      border:5px solid transparent;border-top-color:${accent}}
  </style>
  <div class="tt-fl"><span class="zone">move your cursor around</span><span class="tip">${label}</span></div>`;

  const root = container.querySelector<HTMLElement>('.tt-fl')!;
  const tip = container.querySelector<HTMLElement>('.tip')!;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

  const loop = () => {
    // Lerp toward the cursor for a soft trailing feel.
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    tip.style.left = `${cx}px`;
    tip.style.top = `${cy + 18}px`;
    raf = requestAnimationFrame(loop);
  };
  const onMove = (e: MouseEvent) => {
    tx = e.clientX;
    ty = e.clientY;
    tip.style.opacity = '1';
  };
  const onLeave = () => (tip.style.opacity = '0');

  root.addEventListener('mousemove', onMove);
  root.addEventListener('mouseleave', onLeave);
  loop();
  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('mousemove', onMove);
    root.removeEventListener('mouseleave', onLeave);
    container.innerHTML = '';
  };
}
