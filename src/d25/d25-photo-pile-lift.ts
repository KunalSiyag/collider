export interface PhotoPileLiftOptions {
  photos?: number;
}

export function createPhotoPileLift(
  container: HTMLElement,
  options: PhotoPileLiftOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.photos ?? 6, 8));

  const photos = Array.from({ length: n }, (_, i) => {
    const hue = ['#a78bfa', '#67e8f9', '#f472b6'][i % 3];
    const r = ((i % 3) - 1) * 7 + (i % 2 ? 3 : -4);
    const dx = ((i - (n - 1) / 2) * 34).toFixed(0);
    const dy = (Math.abs(i - (n - 1) / 2) * 6).toFixed(0);
    return `<figure class="cl-n36-photo" style="--i:${i};--r:${r}deg;--c:${hue};--dx:${dx}px;--dy:${dy}px">
      <span class="cl-n36-art"></span><figcaption>Shot ${i + 1}</figcaption></figure>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n36 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 30%,#18181b,#0b0b10); perspective:900px; cursor:pointer; }
      .cl-n36-pile { position:relative; width:min(56%,240px); aspect-ratio:.78; transform-style:preserve-3d;
        will-change:transform; transition:transform .6s ease; }
      .cl-n36-photo { position:absolute; inset:0; margin:0; padding:7px; border-radius:8px; background:#fafafa;
        transform:translateZ(calc(var(--i) * -12px)) rotateZ(var(--r));
        transition:transform .55s cubic-bezier(.3,.85,.35,1.1); transition-delay:calc(var(--i) * .04s);
        box-shadow:0 14px 30px rgba(0,0,0,.5); }
      .cl-n36.spread .cl-n36-photo { transform:
        translate(var(--dx), var(--dy))
        translateZ(calc(var(--i) * 16px)) rotateZ(var(--r)); }
      .cl-n36-art { display:block; height:82%; border-radius:3px;
        background:radial-gradient(circle at 34% 30%, var(--c), #101014 80%); }
      figcaption { margin-top:6px; color:#52525b; font-size:9px; letter-spacing:.2em; text-align:center; }
      .cl-n36-hint { position:absolute; bottom:12px; left:0; right:0; text-align:center; color:#71717a; font-size:10px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n36">
      <div class="cl-n36-pile">${photos}</div>
      <div class="cl-n36-hint">Click to spread</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n36')!;
  const pile = root.querySelector<HTMLElement>('.cl-n36-pile')!;

  function onClick() {
    root.classList.toggle('spread');
  }

  function onMove(e: PointerEvent) {
    if (!root.classList.contains('spread')) return;
    const rect = container.getBoundingClientRect();
    pile.style.transform = `rotateX(${((((e.clientY - rect.top) / rect.height) - 0.5) * -20).toFixed(1)}deg)`;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);

  return () => {
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
