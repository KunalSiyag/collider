export interface ArrowNudgeOptions {
  label?: string;
}

export function createArrowNudgeButton(container: HTMLElement, options: ArrowNudgeOptions = {}): () => void {
  const { label = 'Get going' } = options;

  container.innerHTML = `
    <style>
      .cl-an { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-an-btn { display:inline-flex; align-items:center; gap:12px; padding:14px 30px; font-size:15.5px;
        font-weight:700; color:#e4e4e7; background:transparent; border:1.5px solid #3f3f46;
        border-radius:8px; cursor:pointer; transition:border-color .25s ease, color .25s ease, background .25s ease; }
      .cl-an-btn:hover { border-color:#22d3ee; color:#fff; background:rgba(34,211,238,.07); }
      .cl-an-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-an-arrow { position:relative; width:22px; height:10px; overflow:hidden; }
      .cl-an-arrow::before { content:'→'; position:absolute; left:0; top:-3px; font-size:17px; color:#22d3ee;
        transition:transform .28s cubic-bezier(.65,0,.35,1); }
      .cl-an-btn:hover .cl-an-arrow::before { animation:cl-an-dash .7s ease infinite; }
      @keyframes cl-an-dash {
        from { transform:translateX(-24px); } to { transform:translateX(24px); }
      }
    </style>
    <div class="cl-an"><button type="button" class="cl-an-btn">${label}<span class="cl-an-arrow" aria-hidden="true"></span></button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
