import gsap from 'gsap';

export interface HoverRevealOptions {
  items?: string[];
  emojis?: string[];
}

export function createHoverReveal(
  container: HTMLElement,
  options: HoverRevealOptions = {},
): () => void {
  const {
    items = ['Aurora Mesh', 'Particle Field', 'Liquid Knot', 'Wireframe Globe'],
    emojis = ['🌌', '✨', '🪢', '🌐'],
  } = options;

  container.innerHTML = `
    <style>
      .cl-hr { height:100%; display:flex; align-items:center; padding-inline:10%; position:relative; background:#0b0b10; }
      .cl-hr-list { display:flex; flex-direction:column; width:100%; }
      .cl-hr-item { font-size: clamp(22px, 3.6vw, 38px); font-weight:800; letter-spacing:-0.02em;
        color:#3f3f46; padding:14px 0; cursor:default; transition:color .25s ease; }
      .cl-hr-item:hover { color:#fafafa; }
      .cl-hr-float { position:absolute; width:110px; height:110px; border-radius:18px; pointer-events:none;
        display:flex; align-items:center; justify-content:center; font-size:52px;
        background:#18181b; border:1px solid #3f3f46; opacity:0; scale:0.8; will-change:transform; }
    </style>
    <div class="cl-hr">
      <div class="cl-hr-list">
        ${items.map((item) => `<div class="cl-hr-item">${item}</div>`).join('')}
      </div>
      <div class="cl-hr-float"></div>
    </div>
  `;

  const floatEl = container.querySelector<HTMLElement>('.cl-hr-float')!;
  const listItems = [...container.querySelectorAll<HTMLElement>('.cl-hr-item')];

  const xTo = gsap.quickTo(floatEl, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(floatEl, 'y', { duration: 0.5, ease: 'power3.out' });

  function onMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    xTo(event.clientX - rect.left - 55);
    yTo(event.clientY - rect.top - 55);
  }

  function onEnterItem(index: number) {
    floatEl.textContent = emojis[index % emojis.length] ?? '✦';
    gsap.to(floatEl, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo(
      floatEl,
      { rotate: index % 2 ? -7 : 7 },
      { rotate: index % 2 ? 4 : -4, duration: 0.5 },
    );
  }

  function onLeaveList() {
    gsap.to(floatEl, { opacity: 0, scale: 0.8, duration: 0.3 });
  }

  listItems.forEach((item, i) => item.addEventListener('pointerenter', () => onEnterItem(i)));
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeaveList);

  return () => {
    listItems.forEach((item, i) =>
      item.removeEventListener('pointerenter', () => onEnterItem(i)),
    );
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeaveList);
  };
}
