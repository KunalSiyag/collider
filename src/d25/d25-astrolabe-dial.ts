export interface AstrolabeDialOptions {
  label?: string;
}

export function createAstrolabeDial(
  container: HTMLElement,
  options: AstrolabeDialOptions = {},
): () => void {
  const { label = 'ALTAZIMUTH' } = options;

  container.innerHTML = `
    <style>
      .cl-n113 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:
          radial-gradient(circle at 45% 30%, rgba(251,191,36,.09), transparent 46%),
          radial-gradient(circle at 50% 60%, #1c1917, #09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n113-instrument { position:relative; width:min(56%,220px); aspect-ratio:1;
        transform-style:preserve-3d; will-change:transform; }
      .cl-n113-ring { position:absolute; border-radius:50%; border:4px solid var(--c);
        box-shadow:inset 0 0 16px rgba(0,0,0,.5); }
      .cl-n113-ring.outer { inset:0; --c:#b45309; }
      .cl-n113-ring.mid { inset:9%; --c:#fbbf24aa; transform:rotateX(58deg); animation:cl-n113-a 14s linear infinite; }
      .cl-n113-ring.inner { inset:18%; --c:#67e8f9aa; transform:rotateY(-52deg); animation:cl-n113-b 10s linear infinite reverse; }
      @keyframes cl-n113-a { from { transform:rotateX(58deg) rotateZ(0deg); } to { transform:rotateX(58deg) rotateZ(360deg); } }
      @keyframes cl-n113-b { from { transform:rotateY(-52deg) rotateZ(0deg); } to { transform:rotateY(-52deg) rotateZ(360deg); } }
      .cl-n113-tick { position:absolute; left:50%; top:-1px; width:2px; height:9px; margin-left:-1px;
        background:#fef3c7aa; transform-origin:center 50%;
        transform:rotate(var(--a)) translateY(calc(min(56%,220px) / -2 + 4px)); }
      .cl-n113-pointer { position:absolute; left:50%; top:50%; width:5px; height:44%; margin-left:-2.5px;
        transform-origin:center top;
        background:linear-gradient(#67e8f9,#155e75);
        clip-path:polygon(50% 0,100% 22%,100% 100%,0 100%,0 22%);
        box-shadow:0 0 14px rgba(103,232,249,.5);
        transition:rotate .7s cubic-bezier(.45,.05,.25,1.15);
        rotate:var(--rz,24deg); z-index:2; }
      .cl-n113-pin { position:absolute; left:50%; top:50%; width:12px; height:12px; margin:-6px 0 0 -6px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fde68a,#92400e); z-index:3; }
      .cl-n113-tag { color:#d6d3d1aa; font-size:11px; letter-spacing:.4em; text-transform:uppercase; }
    </style>
    <div class="cl-n113">
      <div class="cl-n113-instrument">
        ${Array.from({ length: 12 }, (_, i) => `<i class="cl-n113-tick" style="--a:${i * 30}deg"></i>`).join('')}
        <div class="cl-n113-ring outer"></div>
        <div class="cl-n113-ring mid"></div>
        <div class="cl-n113-ring inner"></div>
        <div class="cl-n113-pointer" style="--rz:24deg"></div>
        <div class="cl-n113-pin"></div>
      </div>
      <span class="cl-n113-tag">${label} · CLICK TO SLEW</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n113')!;
  const pointer = root.querySelector<HTMLElement>('.cl-n113-pointer')!;

  let idx = 0;
  const headings = [24, 96, 168, 240, 312];

  function onClick() {
    idx = (idx + 1) % headings.length;
    pointer.style.rotate = `${headings[idx]}deg`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
