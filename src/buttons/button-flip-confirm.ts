/** Flip Confirm Button — flips in 3D to reveal a checkmark state. */
export interface FlipConfirmButtonOptions {
  label?: string;
  confirmLabel?: string;
}

export function createFlipConfirmButton(
  container: HTMLElement,
  options: FlipConfirmButtonOptions = {},
): () => void {
  const { label = 'Confirm order', confirmLabel = 'Confirmed ✓' } = options;
  container.innerHTML = `<style>
    .bt-fc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:600px}
    .bt-fc .flip{position:relative;width:190px;height:48px;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.4,0,.2,1)}
    .bt-fc .flip.on{transform:rotateX(180deg)}
    .bt-fc .face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:10px;
      font:600 14px/1 system-ui;backface-visibility:hidden;cursor:pointer;border:none}
    .bt-fc .front{background:#8b5cf6;color:#fff}
    .bt-fc .front:hover{background:#7c3aed}
    .bt-fc .back{background:#134e4a;color:#5eead4;transform:rotateX(180deg)}
  </style>
  <div class="bt-fc"><div class="flip">
    <button type="button" class="face front">${label}</button>
    <div class="face back">${confirmLabel}</div>
  </div></div>`;

  const flip = container.querySelector<HTMLElement>('.flip')!;
  const front = container.querySelector<HTMLButtonElement>('.front')!;

  const onClick = () => {
    flip.classList.add('on');
    window.setTimeout(() => flip.classList.remove('on'), 2000);
  };
  front.addEventListener('click', onClick);
  return () => {
    front.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
