export interface JoystickControlOptions {
  label?: string;
}

export function createJoystickControl(
  container: HTMLElement,
  options: JoystickControlOptions = {},
): () => void {
  const { label = 'DRAG STICK' } = options;

  container.innerHTML = `
    <style>
      .cl-n38 { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; overflow:hidden;
        background:radial-gradient(circle at 40% 25%,#1e1b4b,#09090b); perspective:800px; touch-action:none; }
      .cl-n38-base { position:relative; width:min(44%,160px); aspect-ratio:1;
        border-radius:50%; background:radial-gradient(circle at 50% 42%,#3f3f46,#101014);
        border:2px solid #52525b; box-shadow:0 24px 46px rgba(0,0,0,.6), inset 0 -10px 22px rgba(0,0,0,.5);
        transform-style:preserve-3d; transform:rotateX(48deg); }
      .cl-n38-stick { position:absolute; left:50%; top:50%; width:12px; height:64px; margin-left:-6px;
        transform-origin:center bottom; transform-style:preserve-3d; will-change:transform; cursor:grab; }
      .cl-n38-ball { position:absolute; top:-16px; left:-8px; width:28px; height:28px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#f9a8d4,#be185d 62%,#500724); box-shadow:0 0 18px rgba(244,114,182,.5); }
      .cl-n38-readout { color:#67e8f9; font-size:11px; letter-spacing:.26em; text-transform:uppercase;
        border:1px solid #155e75; background:#06121a; padding:8px 14px; border-radius:8px; min-width:120px; text-align:center; }
    </style>
    <div class="cl-n38">
      <div class="cl-n38-base"><div class="cl-n38-stick"><i class="cl-n38-ball"></i></div></div>
      <div class="cl-n38-readout">${label}</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n38')!;
  const stick = root.querySelector<HTMLElement>('.cl-n38-stick')!;
  const readout = root.querySelector<HTMLElement>('.cl-n38-readout')!;

  let dragging = false;

  stick.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dragging = true;
    const move = (ev: PointerEvent) => {
      if (!dragging) return;
      const rect = root.getBoundingClientRect();
      const dx = ev.clientX - (rect.left + rect.width * 0.27);
      const dy = ev.clientY - rect.top - rect.height / 2;
      const max = 60;
      const rx = Math.max(-max, Math.min(max, dy)) / max * 32;
      const rz = Math.max(-max, Math.min(max, dx)) / max * -36;
      const nx = Math.round((dx / rect.width) * 200) / 2;
      const ny = Math.round((-dy / rect.height) * 200) / 2;
      stick.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
      readout.textContent = `X ${nx} · Y ${ny}`;
    };
    const up = () => {
      dragging = false;
      stick.style.transform = '';
      readout.textContent = label;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });

  return () => {
    container.innerHTML = '';
  };
}
