export interface EffectOptions {
  rows?: number;
}

export function createShimmerSkeleton(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { rows = 3 } = options;

  const rowsHtml = Array.from({ length: rows }, (_, i) => {
    if (i === 0) return '<div class="cl-ss-avatar-row"><div class="cl-ss-avatar cl-ss-sk"></div><div class="cl-ss-lines"><div class="cl-ss-line cl-ss-sk" style="width:70%"></div><div class="cl-ss-line cl-ss-sk" style="width:45%"></div></div></div>';
    return `<div class="cl-ss-line cl-ss-sk" style="width:${[100, 88, 62][(i - 1) % 3]}%"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-ss { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ss-card { width:min(76%, 320px); padding:24px; border-radius:18px; border:1px solid #26262b; background:#101014; display:flex; flex-direction:column; gap:14px; }
      .cl-ss-sk { position:relative; overflow:hidden; background:#1c1c21; border-radius:8px; }
      .cl-ss-sk::after { content:''; position:absolute; inset:0;
        background:linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.09) 50%, transparent 80%);
        transform:translateX(-100%); animation: cl-ss-shimmer 1.6s infinite; }
      @keyframes cl-ss-shimmer { to { transform:translateX(100%); } }
      .cl-ss-avatar-row { display:flex; gap:14px; align-items:center; }
      .cl-ss-avatar { width:52px; height:52px; border-radius:50% !important; flex-shrink:0; }
      .cl-ss-lines { display:flex; flex-direction:column; gap:9px; flex:1; }
      .cl-ss-line { height:13px; }
    </style>
    <div class="cl-ss"><div class="cl-ss-card">${rowsHtml}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
