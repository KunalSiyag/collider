export interface ToggleSwitchOptions {
  label?: string;
}

export function createToggleSwitch(container: HTMLElement, options: ToggleSwitchOptions = {}): () => void {
  const { label = 'Dark mode' } = options;

  container.innerHTML = `
    <style>
      .cl-tg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px; color:#e4e4e7; font-size:15px; font-weight:600; }
      .cl-tg-track { width:64px; height:34px; border-radius:999px; background:#27272a; border:none; cursor:pointer; position:relative; transition:background .3s ease; }
      .cl-tg-knob { position:absolute; top:4px; left:4px; width:26px; height:26px; border-radius:50%; background:#fafafa;
        box-shadow:0 3px 8px rgba(0,0,0,.4); transition:left .28s cubic-bezier(.34,1.56,.64,1), background .3s ease; }
      .cl-tg-track[aria-checked="true"] { background:#7c3aed; }
      .cl-tg-track[aria-checked="true"] .cl-tg-knob { left:34px; background:#fde047; }
    </style>
    <div class="cl-tg">
      <button type="button" class="cl-tg-track" role="switch" aria-checked="false"><span class="cl-tg-knob"></span></button>
      ${label}
    </div>
  `;

  const track = container.querySelector<HTMLButtonElement>('.cl-tg-track')!;
  const knob = container.querySelector<HTMLElement>('.cl-tg-knob')!;
  let on = false;

  function onClick() {
    on = !on;
    track.setAttribute('aria-checked', String(on));
    knob.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
      { duration: 280, easing: 'ease-out' },
    );
  }

  track.addEventListener('click', onClick);

  return () => {
    track.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
