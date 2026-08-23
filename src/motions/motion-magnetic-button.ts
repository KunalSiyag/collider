import gsap from 'gsap';

export interface MagneticButtonOptions {
  label?: string;
  strength?: number;
}

export function createMagneticButton(
  container: HTMLElement,
  options: MagneticButtonOptions = {},
): () => void {
  const { label = 'Hover me', strength = 0.45 } = options;

  container.innerHTML = `
    <style>
      .cl-mb { height:100%; display:flex; align-items:center; justify-content:center; }
      .cl-mb-btn { pointer-events:auto; padding:16px 34px; font-size:16px; font-weight:600; color:#09090b;
        background:linear-gradient(120deg,#c4b5fd,#67e8f9); border:none; border-radius:999px; cursor:pointer; will-change:transform; }
      .cl-mb-label { display:inline-block; }
    </style>
    <div class="cl-mb"><button type="button" class="cl-mb-btn"><span class="cl-mb-label">${label}</span></button></div>
  `;

  const btn = container.querySelector<HTMLElement>('.cl-mb-btn')!;
  const inner = container.querySelector<HTMLElement>('.cl-mb-label')!;

  const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  const ixTo = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3.out' });
  const iyTo = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3.out' });

  function onMove(event: PointerEvent) {
    const rect = btn.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
    ixTo(relX * strength * 0.35);
    iyTo(relY * strength * 0.35);
  }

  function onLeave() {
    xTo(0);
    yTo(0);
    ixTo(0);
    iyTo(0);
  }

  window.addEventListener('pointermove', onMove);
  btn.addEventListener('pointerleave', onLeave);

  return () => {
    window.removeEventListener('pointermove', onMove);
    btn.removeEventListener('pointerleave', onLeave);
  };
}
