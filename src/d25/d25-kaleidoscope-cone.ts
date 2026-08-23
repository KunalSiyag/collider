export interface KaleidoscopeConeOptions {
  facets?: number;
}

export function createKaleidoscopeCone(
  container: HTMLElement,
  options: KaleidoscopeConeOptions = {},
): () => void {
  const n = Math.max(6, Math.min(options.facets ?? 10, 16));

  const shards = Array.from({ length: n }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'][i % 4];
    return `<i style="--a:${((360 / n) * i).toFixed(0)}deg;--c:${hue};--d:${(i * 0.13).toFixed(2)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n21 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 45%,#1e1b4b,#09090b 75%); perspective:700px; cursor:pointer; }
      .cl-n21-cone { position:relative; width:min(58%,240px); aspect-ratio:1; transform-style:preserve-3d;
        transform:rotateX(54deg); will-change:transform; transition:transform .6s ease; }
      .cl-n21-cone i { position:absolute; left:50%; bottom:50%; width:110px; height:110px; margin-left:-55px;
        transform-origin:center bottom; transform:rotateZ(var(--a)) translateY(0) rotateX(64deg);
        background:linear-gradient(var(--c), transparent 78%);
        clip-path:polygon(50% 100%, 96% 18%, 74% 0, 26% 0, 4% 18%);
        opacity:.85; filter:drop-shadow(0 0 10px color-mix(in srgb, var(--c) 60%, transparent));
        animation:cl-n21-twinkle 3.2s ease-in-out infinite; animation-delay:var(--d); }
      @keyframes cl-n21-twinkle { 0%,100% { opacity:.55; } 50% { opacity:1; } }
      .cl-n21-eye { position:absolute; left:50%; top:50%; width:22px; height:22px; margin:-11px 0 0 -11px; border-radius:50%;
        background:radial-gradient(circle at 35% 35%,#fef9c3,#ca8a04); box-shadow:0 0 30px rgba(254,249,195,.8); }
    </style>
    <div class="cl-n21">
      <div class="cl-n21-cone">${shards}<div class="cl-n21-eye"></div></div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n21')!;
  const cone = root.querySelector<HTMLElement>('.cl-n21-cone')!;

  let spin = 0;
  let raf = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    spin += 0.25;
    cone.style.setProperty('--spin', `${spin.toFixed(1)}deg`);
    cone.style.transform = `rotateX(54deg) rotateZ(${(spin % 360).toFixed(1)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick(e: MouseEvent) {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cone.style.transform = `rotateX(${(54 + py * 50).toFixed(1)}deg) rotateZ(${(px * 60).toFixed(1)}deg)`;
    setTimeout(() => (cone.style.transform = ''), 600);
  }

  root.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
