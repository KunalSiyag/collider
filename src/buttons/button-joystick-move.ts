export interface JoystickMoveOptions {
  label?: string;
}

export function createJoystickMoveButton(container: HTMLElement, options: JoystickMoveOptions = {}): () => void {
  const { label = 'Joystick' } = options;

  container.innerHTML = `
    <style>
      .cl-js { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:18px; }
      .cl-js-pad { position:relative; width:110px; height:110px; border-radius:50%;
        background:#14141e; border:1.5px solid #3f3f46;
        box-shadow:inset 0 4px 12px rgba(0,0,0,.6); }
      .cl-js-stick { position:absolute; left:50%; top:50%; width:46px; height:46px; border-radius:50%; border:none;
        cursor:pointer; background:radial-gradient(circle at 34% 30%, #a78bfa, #7c3aed);
        box-shadow:0 6px 14px rgba(0,0,0,.55), inset 0 2px 4px rgba(255,255,255,.25);
        transform:translate(-50%,-50%); transition:transform .25s cubic-bezier(.34,1.56,.64,1); }
      .cl-js-stick:focus-visible { outline:2px solid #c4b5fd; outline-offset:3px; }
      .cl-js-readout { font-size:13.5px; font-weight:700; color:#a78bfa; font-family:'Courier New',monospace;
        min-width:64px; }
    </style>
    <div class="cl-js">
      <span class="cl-js-pad">
        <button type="button" class="cl-js-stick" aria-label="${label}: click to randomize direction"></button>
      </span>
      <span class="cl-js-readout">center</span>
    </div>
  `;

  const stick = container.querySelector<HTMLButtonElement>('.cl-js-stick')!;
  const read = container.querySelector<HTMLElement>('.cl-js-readout')!;
  const dirs = ['up', 'right', 'down', 'left', 'center'];
  let i = dirs.length - 1;

  function onClick() {
    i = (i + 1) % dirs.length;
    const d = dirs[i];
    const t = {
      up: 'translate(-50%,-85%)',
      right: 'translate(-15%,-50%)',
      down: 'translate(-50%,-15%)',
      left: 'translate(-85%,-50%)',
      center: 'translate(-50%,-50%)',
    }[d]!;
    stick.style.transform = t;
    read.textContent = d;
  }

  stick.addEventListener('click', onClick);

  return () => {
    stick.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
