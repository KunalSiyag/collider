export interface RubiksLayerTwistOptions {
  label?: string;
}

export function createRubiksLayerTwist(
  container: HTMLElement,
  options: RubiksLayerTwistOptions = {},
): () => void {
  const colors = ['#f472b6', '#8b5cf6', '#22d3ee', '#67e8f9'];

  let faces = '';
  for (let f = 0; f < 4; f++) {
    let cells = '';
    for (let i = 0; i < 9; i++) {
      cells += `<i style="--c:${colors[(i + f) % 4]}"></i>`;
    }
    const tfs = [
      'rotateY(-90deg) translateZ(39px)',
      'rotateY(90deg) translateZ(39px)',
      'translateZ(39px)',
      'rotateX(-90deg) translateZ(39px)',
    ][f];
    faces += `<div class="cl-n89-face" style="transform:${tfs}">${cells}</div>`;
  }

  container.innerHTML = `
    <style>
      .cl-n89 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:radial-gradient(circle at 40% 25%,#1e1b4b,#09090b); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n89-cube { position:relative; width:78px; height:78px; transform-style:preserve-3d; will-change:transform;
        transform:rotateX(-20deg) rotateY(-32deg); }
      .cl-n89-face { position:absolute; left:0; top:0; width:78px; height:78px;
        display:grid; grid-template-columns:repeat(3,1fr); gap:2px; padding:2px;
        background:#0b0b10; border-radius:4px; backface-visibility:hidden; }
      .cl-n89-face i { border-radius:2px; background:linear-gradient(150deg, color-mix(in srgb, var(--c) 85%, white), color-mix(in srgb, var(--c) 65%, black)); }
      .cl-n89-hint { color:#a1a1aa; font-size:10px; letter-spacing:.3em; text-transform:uppercase; cursor:pointer; }
    </style>
    <div class="cl-n89">
      <div class="cl-n89-cube">${faces}</div>
      <span class="cl-n89-hint">CLICK TO TWIST</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n89')!;
  const cube = root.querySelector<HTMLElement>('.cl-n89-cube')!;

  let quarter = 0;

  function onClick() {
    quarter += 1;
    cube.style.transition = 'transform .6s cubic-bezier(.4,.05,.3,1)';
    cube.style.transform = `rotateX(${quarter * 90 - 20}deg) rotateZ(${quarter * 90}deg)`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
