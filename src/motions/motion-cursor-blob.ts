import gsap from 'gsap';

export interface CursorBlobOptions {
  size?: number;
}

export function createCursorBlob(
  container: HTMLElement,
  options: CursorBlobOptions = {},
): () => void {
  const { size = 64 } = options;

  container.innerHTML = `
    <style>
      .cl-cb2 { height:100%; background:#0b0b10; position:relative; cursor:none;
        display:flex; align-items:center; justify-content:center; gap:14px; }
      .cl-cb2-target { padding:12px 22px; border-radius:999px; border:1px solid #3f3f46;
        color:#e4e4e7; font-size:14px; }
      .cl-cb2-dot { position:absolute; top:0; left:0; width:${size}px; height:${size}px; border-radius:50%;
        pointer-events:none; mix-blend-mode:difference; z-index:3;
        background:radial-gradient(circle, #fff 30%, transparent 72%);
        transform:translate(-50%,-50%); will-change:transform; }
    </style>
    <div class="cl-cb2">
      <span class="cl-cb2-target">hover targets</span>
      <span class="cl-cb2-target">the blob grows</span>
      <div class="cl-cb2-dot"></div>
    </div>
  `;

  const stage = container.querySelector<HTMLElement>('.cl-cb2')!;
  const dot = container.querySelector<HTMLElement>('.cl-cb2-dot')!;

  const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });

  function onMove(event: PointerEvent) {
    const rect = stage.getBoundingClientRect();
    xTo(event.clientX - rect.left);
    yTo(event.clientY - rect.top);

    const overTarget = (event.target as HTMLElement).closest('.cl-cb2-target');
    gsap.to(dot, { scale: overTarget ? 1.9 : 1, duration: 0.35, ease: 'power2.out' });
  }

  stage.addEventListener('pointermove', onMove);

  return () => {
    stage.removeEventListener('pointermove', onMove);
  };
}
