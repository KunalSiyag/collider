export interface ButtonOptions {
  label?: string;
}

export function createBorderTraceButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Outline me' } = options;

  container.innerHTML = `
    <style>
      .cl-bt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bt-btn { position:relative; padding:15px 36px; font-size:15px; font-weight:600; color:#e4e4e7;
        background:transparent; border:none; cursor:pointer; letter-spacing:.02em; }
      .cl-bt-btn i { position:absolute; background:linear-gradient(90deg,#8b5cf6,#22d3ee);
        transition: all .35s cubic-bezier(.4,0,.2,1); }
      .cl-bt-btn .t { top:0; left:0; height:2.5px; width:0; }
      .cl-bt-btn .r { top:0; right:0; width:2.5px; height:0; }
      .cl-bt-btn .b { bottom:0; right:0; height:2.5px; width:0; }
      .cl-bt-btn .l { bottom:0; left:0; width:2.5px; height:0; }
      .cl-bt-btn:hover .t, .cl-bt-btn:hover .b { width:100%; }
      .cl-bt-btn:hover .r, .cl-bt-btn:hover .l { height:100%; }
      .cl-bt-btn .b { transition-delay:.17s; } .cl-bt-btn .l { transition-delay:.34s; }
    </style>
    <div class="cl-bt">
      <button type="button" class="cl-bt-btn">${label}<i class="t"></i><i class="r"></i><i class="b"></i><i class="l"></i></button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
