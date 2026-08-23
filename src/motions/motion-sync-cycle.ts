import gsap from 'gsap';

export interface SyncCycleOptions {
  speed?: number;
}

export function createSyncCycle(container: HTMLElement, options: SyncCycleOptions = {}): () => void {
  const { speed = 1.6 } = options;

  container.innerHTML = `
    <style>
      .sy { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:ui-monospace,monospace; gap:22px; }
      .sy-icon { position:relative; width:96px; height:96px; }
      .sy-arrow { position:absolute; inset:0; border-radius:50%; border:5px solid transparent;
        will-change:transform; }
      .sy-arrow.a1 { border-top-color:#8b5cf6; border-right-color:#8b5cf6; }
      .sy-arrow.a2 { border-bottom-color:#22d3ee; border-left-color:#22d3ee; scale:0.72 0.72; }
      .sy-label { color:#a78bfa; font-size:14px; letter-spacing:.25em; }
    </style>
    <div class="sy">
      <div class="sy-icon">
        <div class="sy-arrow a1"></div>
        <div class="sy-arrow a2"></div>
      </div>
      <div class="sy-label">SYNCING</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.sy-arrow.a1', { rotate: -360, duration: speed, ease: 'none', repeat: -1 });
    gsap.to('.sy-arrow.a2', { rotate: 360, duration: speed * 1.35, ease: 'none', repeat: -1 });
    const label = container.querySelector<HTMLElement>('.sy-label')!;
    const words = ['SYNCING', 'UPLOADING', 'MERGING', 'DONE ✓'];
    let i = 0;
    const iv = window.setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % words.length;
      gsap.fromTo(label,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          onStart() { label.textContent = words[i]; },
          onComplete() {},
        });
    }, 1800);
    (container as any).__syIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__syIv);
    ctx.revert();
  };
}
