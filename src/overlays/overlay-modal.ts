/** Modal — a glass dialog that pops over a dimmed backdrop with scale easing. */
export interface ModalOptions {
  title?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

export function createModal(container: HTMLElement, options: ModalOptions = {}): () => void {
  const { title = 'Delete workspace?', body = 'This will permanently remove all projects and cannot be undone.', confirmLabel = 'Delete', cancelLabel = 'Cancel', onConfirm } = options;

  container.innerHTML = `<style>
    .ov-md{height:100%;position:relative;display:grid;place-items:center;background:#0b0b10}
    .ov-md .backdrop{position:absolute;inset:0;background:rgba(0,0,0,.6);opacity:0;transition:opacity .3s ease}
    .ov-md .dialog{position:relative;width:340px;background:rgba(24,24,27,.92);border:1px solid rgba(255,255,255,.1);
      border-radius:18px;padding:24px;backdrop-filter:blur(12px);
      transform:scale(.85) translateY(14px);opacity:0;
      transition:transform .38s cubic-bezier(.3,1.3,.4,1),opacity .25s ease}
    .ov-md.open .backdrop{opacity:1}
    .ov-md.open .dialog{transform:none;opacity:1}
    .ov-md h3{margin:0 0 8px;color:#fafafa;font:700 16.5px system-ui}
    .ov-md p{margin:0 0 20px;color:#a1a1aa;font:400 13.5px/1.55 system-ui}
    .ov-md .row{display:flex;gap:10px;justify-content:flex-end}
    .ov-md button{padding:9px 16px;border-radius:10px;cursor:pointer;font:600 13px system-ui;transition:all .18s ease}
    .ov-md .cancel{background:transparent;border:1px solid #3f3f46;color:#d4d4d8}
    .ov-md .cancel:hover{border-color:#52525b}
    .ov-md .danger{background:#dc2626;border:none;color:#fff}
    .ov-md .danger:hover{background:#ef4444}
  </style>
  <div class="ov-md">
    <div class="backdrop"></div>
    <div class="dialog" role="dialog" aria-modal="true" aria-label="${title}">
      <h3>${title}</h3><p>${body}</p>
      <div class="row">
        <button type="button" class="cancel">${cancelLabel}</button>
        <button type="button" class="danger">${confirmLabel}</button>
      </div>
    </div>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-md')!;
  requestAnimationFrame(() => root.classList.add('open'));
  const close = () => root.classList.remove('open');
  root.querySelector('.cancel')!.addEventListener('click', close);
  root.querySelector('.danger')!.addEventListener('click', () => {
    onConfirm?.();
    close();
  });
  return () => { container.innerHTML = ''; };
}
