import gsap from 'gsap';

export interface ClickBurstOptions {
  count?: number;
}

const COLORS = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15', '#4ade80'];

export function createClickBurst(
  container: HTMLElement,
  options: ClickBurstOptions = {},
): () => void {
  const { count = 18 } = options;

  container.innerHTML = `
    <style>
      .cl-cb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; cursor:crosshair; }
      .cl-cb-hint { color:#3f3f46; font-size:13px; letter-spacing:.1em; text-transform:uppercase; user-select:none; }
      .cl-cb-dot { position:absolute; width:9px; height:9px; border-radius:2px; pointer-events:none; }
    </style>
    <div class="cl-cb"><span class="cl-cb-hint">click anywhere</span></div>
  `;

  const stage = container.querySelector<HTMLElement>('.cl-cb')!;

  function onPointerDown(event: PointerEvent) {
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('i');
      dot.className = 'cl-cb-dot';
      dot.style.background = COLORS[i % COLORS.length]!;
      stage.appendChild(dot);

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 46 + Math.random() * 74;
      gsap.fromTo(
        dot,
        { x, y, opacity: 1, scale: 1, rotate: 0 },
        {
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          opacity: 0,
          scale: 0.3,
          rotate: 220,
          duration: 0.75 + Math.random() * 0.4,
          ease: 'power3.out',
          onComplete: () => dot.remove(),
        },
      );
    }

    gsap.fromTo(
      stage,
      { '--pulse': 0 },
      { '--pulse': 1, duration: 0.001 },
    );
  }

  stage.addEventListener('pointerdown', onPointerDown);

  return () => {
    stage.removeEventListener('pointerdown', onPointerDown);
    gsap.killTweensOf('.cl-cb-dot');
  };
}
