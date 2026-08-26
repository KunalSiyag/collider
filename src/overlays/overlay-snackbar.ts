/** Snackbar — a bottom toast with an action button and auto-dismiss timer bar. */
export interface SnackbarOptions {
  message?: string;
  actionLabel?: string;
  duration?: number;
  onAction?: () => void;
}

export function createSnackbar(container: HTMLElement, options: SnackbarOptions = {}): () => void {
  const { message = 'File moved to trash', actionLabel = 'Undo', duration = 5000, onAction } = options;

  container.innerHTML = `<style>
    .ov-sn{height:100%;position:relative;display:grid;place-items:center;background:#0b0b10}
    .ov-sn .bar{position:absolute;bottom:26px;left:50%;translate:-50% 0;display:flex;align-items:center;gap:16px;
      background:#27272a;color:#e4e4e7;font:400 13.5px system-ui;padding:13px 16px;border-radius:12px;
      box-shadow:0 12px 32px rgba(0,0,0,.5);overflow:hidden;
      animation:ov-sn-in .4s cubic-bezier(.3,1.2,.4,1) both}
    @keyframes ov-sn-in{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}
    .ov-sn .bar.leaving{animation:ov-sn-out .3s ease both}
    @keyframes ov-sn-out{to{opacity:0;transform:translate(-50%,10px)}}
    .ov-sn button{border:none;background:transparent;color:#8b5cf6;font:700 13px system-ui;cursor:pointer;padding:2px}
    .ov-sn button:hover{text-decoration:underline}
    .ov-sn .timer{position:absolute;left:0;bottom:0;height:3px;background:#8b5cf6;width:100%;
      transform-origin:left;animation:ov-sn-timer ${duration}ms linear forwards}
    @keyframes ov-sn-timer{to{transform:scaleX(0)}}
  </style>
  <div class="ov-sn">
    <div class="bar" role="status">
      ${message}
      <button type="button">${actionLabel}</button>
      <span class="timer"></span>
    </div>
  </div>`;

  const bar = container.querySelector<HTMLElement>('.bar')!;
  let done = false;
  const leave = () => {
    if (done) return;
    done = true;
    bar.classList.add('leaving');
  };
  bar.querySelector('button')!.addEventListener('click', () => {
    onAction?.();
    leave();
  });
  const t = window.setTimeout(leave, duration);
  return () => {
    window.clearTimeout(t);
    container.innerHTML = '';
  };
}
