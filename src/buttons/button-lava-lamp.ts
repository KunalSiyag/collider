export interface LavaLampOptions {
  label?: string;
}

export function createLavaLampButton(container: HTMLElement, options: LavaLampOptions = {}): () => void {
  const { label = 'Relax mode' } = options;

  container.innerHTML = `
    <style>
      .cl-ll { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ll-btn { position:relative; overflow:hidden; padding:16px 42px; font-size:15.5px; font-weight:700;
        color:#fff; background:#1c1026; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        transition:border-color .3s ease; }
      .cl-ll-btn:hover { border-color:#f472b6; }
      .cl-ll-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
      .cl-ll-btn span { position:relative; z-index:1; }
      .cl-ll-blob { position:absolute; width:26px; height:26px; border-radius:50%;
        filter:blur(4px); opacity:.85; animation:cl-ll-rise 4s ease-in-out infinite; }
      .cl-ll-b:nth-child(2) { left:12%; bottom:-30px; background:#8b5cf6; animation-delay:0s; }
      .cl-ll-b:nth-child(3) { left:44%; bottom:-34px; background:#f472b6; animation-delay:1.3s; width:32px; height:32px; }
      .cl-ll-b:nth-child(4) { left:70%; bottom:-28px; background:#22d3ee; animation-delay:2.4s; }
      @keyframes cl-ll-rise {
        0% { transform:translateY(0) scale(1); }
        45% { transform:translateY(-52px) scale(1.25); }
        100% { transform:translateY(-90px) scale(.5); opacity:0; }
      }
    </style>
    <div class="cl-ll">
      <button type="button" class="cl-ll-btn"><span>${label}</span>
        <span class="cl-ll-blob cl-ll-b" aria-hidden="true"></span><span class="cl-ll-blob cl-ll-b" aria-hidden="true"></span><span class="cl-ll-blob cl-ll-b" aria-hidden="true"></span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
