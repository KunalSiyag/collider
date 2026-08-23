export interface DrumPadOptions {
  label?: string;
}

export function createDrumPadButton(container: HTMLElement, options: DrumPadOptions = {}): () => void {
  const { label = 'Drums' } = options;
  const pads = ['🥁', '🎵', '🎶', '🔔'];

  container.innerHTML = `
    <style>
      .cl-dp { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:12px; }
      .cl-dp-grid { display:grid; grid-template-columns:repeat(2, 64px); grid-template-rows:repeat(2, 64px); gap:9px; }
      .cl-dp-pad { font-size:25px; line-height:1; border:none; border-radius:14px; cursor:pointer;
        background:#1b1b28; border-bottom:4px solid #101018; color:#f472b6;
        transition:transform .06s ease, background .15s ease, border-bottom-width .06s ease; }
      .cl-dp-pad:hover { background:#26263a; }
      .cl-dp-pad:focus-visible { outline:2px solid #f472b6; outline-offset:3px; }
      .cl-dp-pad[data-hit="true"] { transform:translateY(3px); border-bottom-width:1px; background:#8b5cf6; }
      .cl-dp-cap { font-size:13px; font-weight:700; color:#52525b; letter-spacing:.1em; text-transform:uppercase; }
    </style>
    <div class="cl-dp">
      <div class="cl-dp-grid" role="group" aria-label="${label}">
        ${pads.map((p, i) => `<button type="button" class="cl-dp-pad" data-i="${i}" data-hit="false" aria-label="Pad ${i + 1}: ${p}">${p}</button>`).join('')}
      </div>
      <span class="cl-dp-cap">${label}</span>
    </div>
  `;

  const padEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-dp-pad'));

  function onClick(p: HTMLButtonElement) {
    return () => {
      p.dataset.hit = 'true';
      setTimeout(() => { p.dataset.hit = 'false'; }, 140);
    };
  }

  const handlers = padEls.map((p) => onClick(p));
  padEls.forEach((p, i) => p.addEventListener('click', handlers[i]));

  return () => {
    padEls.forEach((p, i) => p.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
