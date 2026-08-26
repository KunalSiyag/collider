/** Drawer — a right-side panel that slides over with a scrim and ESC to close. */
export interface DrawerOptions {
  title?: string;
  accent?: string;
}

export function createDrawer(container: HTMLElement, options: DrawerOptions = {}): () => void {
  const {
    title = 'Activity',
    accent = '#22d3ee',
  } = options;

  const rows = [
    ['Deploy', 'production · 2m ago', accent],
    ['Kai commented', '"ship it" on PR #482', '#8b5cf6'],
    ['Usage alert', 'bandwidth at 82%', '#fbbf24'],
    ['New member', 'rhea joined the workspace', '#4ade80'],
  ];

  container.innerHTML = `<style>
    .ov-dw{height:100%;position:relative;overflow:hidden;background:#0b0b10}
    .ov-dw .scrim{position:absolute;inset:0;background:rgba(0,0,0,.55);opacity:0;transition:opacity .3s ease}
    .ov-dw .panel{position:absolute;top:0;right:0;bottom:0;width:min(320px,85%);background:#141417;
      border-left:1px solid #27272a;transform:translateX(100%);transition:transform .38s cubic-bezier(.3,1,.3,1);
      padding:20px;display:flex;flex-direction:column;gap:12px}
    .ov-dw.open .scrim{opacity:1}
    .ov-dw.open .panel{transform:none}
    .ov-dw h3{margin:0;color:#fafafa;font:700 16px system-ui}
    .ov-dw .close{position:absolute;top:14px;right:14px;border:none;background:transparent;color:#71717a;
      font-size:19px;cursor:pointer}
    .ov-dw .close:hover{color:#fafafa}
    .ov-dw .item{background:#18181b;border:1px solid #27272a;border-radius:12px;padding:12px 14px;
      animation:ov-dw-in .4s cubic-bezier(.3,1.1,.4,1) both}
    .ov-dw .item b{display:flex;align-items:center;gap:8px;color:#fafafa;font:600 13.5px system-ui;margin-bottom:3px}
    .ov-dw .item b::before{content:'';width:7px;height:7px;border-radius:999px;background:var(--tone)}
    .ov-dw .item span{color:#71717a;font:400 12.5px system-ui}
    @keyframes ov-dw-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
  </style>
  <div class="ov-dw open">
    <div class="scrim"></div>
    <aside class="panel" role="dialog" aria-label="${title}">
      <button type="button" class="close" aria-label="Close">✕</button>
      <h3>${title}</h3>
      ${rows
        .map(
          ([t, s, tone], i) =>
            `<div class="item" style="--tone:${tone};animation-delay:${(0.15 + i * 0.08).toFixed(2)}s"><b>${t}</b><span>${s}</span></div>`,
        )
        .join('')}
    </aside>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-dw')!;
  const close = () => root.classList.remove('open');
  root.querySelector('.close')!.addEventListener('click', close);
  root.querySelector('.scrim')!.addEventListener('click', close);
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
  window.addEventListener('keydown', onKey);
  return () => {
    window.removeEventListener('keydown', onKey);
    container.innerHTML = '';
  };
}
