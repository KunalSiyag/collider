export interface DoubleLayerTextOptions {
  label?: string;
}

export function createDoubleLayerTextButton(container: HTMLElement, options: DoubleLayerTextOptions = {}): () => void {
  const { label = 'Double take' } = options;

  container.innerHTML = `
    <style>
      .cl-dl2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dl2-btn { position:relative; padding:15px 42px; font-size:16px; font-weight:800; letter-spacing:.05em;
        color:#fff; background:#16161f; border:1px solid #8b5cf6; border-radius:10px; cursor:pointer;
        overflow:hidden; transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-dl2-btn:hover { box-shadow:0 0 20px rgba(34,211,238,.4); }
      .cl-dl2-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-dl2-btn:active .cl-dl2-copy { transform:translateY(-100%); }
      .cl-dl2-copy { position:relative; display:block; transition:transform .3s cubic-bezier(.65,0,.35,1); }
      .cl-dl2-copy::after { content:attr(data-alt); position:absolute; left:0; top:100%; width:100%;
        text-align:center; color:#22d3ee; }
    </style>
    <div class="cl-dl2">
      <button type="button" class="cl-dl2-btn">
        <span class="cl-dl2-copy" data-alt="${label}!">${label}</span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
