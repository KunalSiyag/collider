/** Confirm Dialog — a two-step destructive confirm with typed keyword gate. */
export interface ConfirmDialogOptions {
  title?: string;
  keyword?: string;
  accent?: string;
}

export function createConfirmDialog(container: HTMLElement, options: ConfirmDialogOptions = {}): () => void {
  const { title = 'Type DELETE to remove this project', keyword = 'DELETE', accent = '#ef4444' } = options;

  container.innerHTML = `<style>
    .ov-cd{height:100%;position:relative;display:grid;place-items:center;background:#0b0b10}
    .ov-cd .dim{position:absolute;inset:0;background:rgba(0,0,0,.55)}
    .ov-cd .box{position:relative;width:330px;background:#18181b;border:1px solid #3f3f46;border-radius:16px;
      padding:22px;animation:ov-cd-in .35s cubic-bezier(.3,1.2,.4,1)}
    @keyframes ov-cd-in{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
    .ov-cd h3{margin:0 0 14px;color:#fafafa;font:600 15px/1.45 system-ui}
    .ov-cd input{width:100%;box-sizing:border-box;background:#0b0b10;border:1.5px solid #3f3f46;border-radius:10px;
      color:#fafafa;font:600 14px ui-monospace,monospace;letter-spacing:.14em;padding:11px 13px;outline:none;
      transition:border-color .18s ease}
    .ov-cd input:focus{border-color:${accent}}
    .ov-cd input.match{border-color:${accent};box-shadow:0 0 0 3px ${accent}33}
    .ov-cd button{width:100%;margin-top:14px;padding:12px;border:none;border-radius:10px;cursor:pointer;
      font:700 13.5px system-ui;background:${accent};color:#fff;opacity:.35;pointer-events:none;
      transition:opacity .2s ease,filter .18s ease}
    .ov-cd button.ready{opacity:1}
    .ov-cd button.ready:hover{filter:brightness(1.15)}
  </style>
  <div class="ov-cd">
    <div class="dim"></div>
    <div class="box" role="alertdialog" aria-label="${title}">
      <h3>${title}</h3>
      <input type="text" placeholder="${keyword}" aria-label="Type ${keyword} to confirm" autocomplete="off"/>
      <button type="button" disabled>Confirm delete</button>
    </div>
  </div>`;

  const input = container.querySelector<HTMLInputElement>('input')!;
  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const handler = () => {
    const ok = input.value.trim().toUpperCase() === keyword;
    btn.classList.toggle('ready', ok);
    btn.disabled = !ok;
    input.classList.toggle('match', ok);
  };
  input.addEventListener('input', handler);
  return () => {
    input.removeEventListener('input', handler);
    container.innerHTML = '';
  };
}
