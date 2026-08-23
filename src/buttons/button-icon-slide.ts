export interface ButtonOptions {
  label?: string;
}

export function createIconSlideButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Read the docs' } = options;

  container.innerHTML = `
    <style>
      .cl-is { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-is-btn { display:inline-flex; align-items:center; gap:10px; padding:14px 26px; font-size:15px;
        font-weight:600; color:#fafafa; background:#18181b; border:1px solid #3f3f46; border-radius:12px; cursor:pointer;
        transition:border-color .25s ease, background .25s ease; }
      .cl-is-btn:hover { border-color:#8b5cf6; background:#1c1526; }
      .cl-is-ico { display:inline-block; width:20px; height:20px; overflow:hidden; position:relative; }
      .cl-is-ico svg { position:absolute; inset:0; transition:transform .3s cubic-bezier(.4,0,.2,1), opacity .3s ease; }
      .cl-is-ico .ico-a { transform:translateX(0); }
      .cl-is-ico .ico-b { transform:translateX(-24px); opacity:0; }
      .cl-is-btn:hover .ico-a { transform:translateX(24px); opacity:0; }
      .cl-is-btn:hover .ico-b { transform:translateX(0); opacity:1; }
    </style>
    <div class="cl-is">
      <button type="button" class="cl-is-btn">${label}
        <span class="cl-is-ico">
          <svg class="ico-a" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <svg class="ico-b" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
