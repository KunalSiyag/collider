export interface FloatingLightOptions {
  label?: string;
}

export function createFloatingLight(
  container: HTMLElement,
  options: FloatingLightOptions = {},
): () => void {
  const { label = 'orb' } = options;

  container.innerHTML = `
    <style>
      .cl-fl { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(#1c1917,#0c0a09); }
      .cl-fl-stage { position:relative; width:min(60%,260px); height:70%; }
      .cl-fl-orb { position:absolute; top:12%; left:50%; width:110px; height:110px; margin-left:-55px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%, #fda4af, #e11d48 58%, #881337);
        box-shadow:0 0 40px rgba(225,29,72,.5);
        transition:transform .25s ease-out, box-shadow .3s ease;
        transform-style:preserve-3d; }
      .cl-fl-orb::after { content:'${label}'; position:absolute; inset:0; display:flex; align-items:flex-end;
        justify-content:center; padding-bottom:14px; color:#fecdd3; font-size:12px; letter-spacing:.18em; text-transform:uppercase; }
      .cl-fl-floor { position:absolute; bottom:6%; left:50%; width:170px; height:30px; border-radius:50%;
        background:rgba(0,0,0,.6); filter:blur(9px); transition:transform .3s ease-out, opacity .3s ease; }
      .cl-fl-glow { position:absolute; bottom:10%; left:50%; width:130px; height:20px; border-radius:50%;
        background:rgba(244,63,94,.35); filter:blur(14px); transition:transform .3s ease-out; }
    </style>
    <div class="cl-fl"><div class="cl-fl-stage">
      <div class="cl-fl-floor"></div>
      <div class="cl-fl-glow"></div>
      <div class="cl-fl-orb"></div>
    </div></div>
  `;

  const stage = container.querySelector<HTMLElement>('.cl-fl-stage')!;
  const orb = container.querySelector<HTMLElement>('.cl-fl-orb')!;
  const floor = container.querySelector<HTMLElement>('.cl-fl-floor')!;
  const glow = container.querySelector<HTMLElement>('.cl-fl-glow')!;

  function onMove(event: PointerEvent) {
    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    const lift = -py * 46;
    orb.style.transform = `translate(${(px * 40).toFixed(1)}px, ${(py * 26 + lift).toFixed(1)}px)`;
    orb.style.boxShadow = `0 0 ${40 + lift}px rgba(225,29,72,${(0.4 - py * 0.2).toFixed(2)})`;

    floor.style.transform = `translateX(${(-px * 26).toFixed(1)}px) scale(${(1 - lift / 220).toFixed(3)})`;
    floor.style.opacity = String((0.6 + lift / 200).toFixed(2));
    glow.style.transform = `translateX(${(orb.offsetLeft + 55 + px * 40).toFixed(0)}px)`;
  }

  function onLeave() {
    [orb, floor, glow].forEach((el) => (el.style.transform = ''));
    orb.style.boxShadow = '';
    floor.style.opacity = '';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
