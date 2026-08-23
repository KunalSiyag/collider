import gsap from 'gsap';

export interface SearchScanOptions {
  query?: string;
}

export function createSearchScan(container: HTMLElement, options: SearchScanOptions = {}): () => void {
  const { query = 'motion demos' } = options;

  container.innerHTML = `
    <style>
      .ss { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .ss-bar { position:relative; width:min(360px,84%); height:54px; border-radius:16px;
        border:2px solid #3f3f46; background:#131317; display:flex; align-items:center; padding:0 18px;
        overflow:hidden; }
      .ss-glass { font-size:20px; margin-right:12px; }
      .ss-input { color:#a1a1aa; font-size:15px; }
      .ss-caret { width:2px; height:22px; background:#22d3ee; margin-left:2px; will-change:opacity; }
      .ss-scan { position:absolute; top:0; bottom:0; left:-40%; width:40%;
        background:linear-gradient(90deg, transparent, #22d3ee14, #8b5cf61f, transparent);
        will-change:transform; }
      .ss-ring { position:absolute; inset:0; border-radius:16px; border:2px solid #8b5cf6; opacity:0; }
    </style>
    <div class="ss"><div class="ss-bar">
      <span class="ss-glass">🔍</span>
      <span class="ss-input"></span>
      <div class="ss-caret"></div>
      <div class="ss-scan"></div>
      <div class="ss-ring"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const input = container.querySelector<HTMLElement>('.ss-input')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });

    for (let i = 1; i <= query.length; i++) {
      tl.call(() => { input.textContent = query.slice(0, i); }, undefined, i * 0.07);
    }
    tl.fromTo('.ss-caret', { opacity: 0 }, { opacity: 1, repeat: -1, yoyo: true, duration: 0.5, ease: 'steps(1)' }, 0);
    tl.to({}, { duration: 0.4 });
    tl.to('.ss-scan', { xPercent: 350, duration: 0.9, ease: 'power2.inOut' });
    tl.fromTo('.ss-ring', { opacity: 0.9 }, {
      opacity: 0,
      scale: 1.04,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.3');
    tl.to('.ss-input', { opacity: 0, duration: 0.35 }, '+=0.9');
    tl.set('.ss-input', { opacity: 1, textContent: '' });
  }, container);

  return () => ctx.revert();
}
