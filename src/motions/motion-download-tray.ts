import gsap from 'gsap';

export interface DownloadTrayOptions {
  label?: string;
}

export function createDownloadTray(container: HTMLElement, options: DownloadTrayOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .dt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .dt-stage { position:relative; width:120px; height:150px; }
      .dt-arrow { position:absolute; top:0; left:50%; translate:-50%; font-size:52px; color:#22d3ee;
        will-change:transform; text-shadow:0 0 18px #22d3ee66; line-height:1.1; }
      .dt-tray { position:absolute; bottom:0; left:50%; translate:-50%; width:96px; height:34px;
        border-bottom:4px solid #a78bfa; border-left:4px solid #a78bfa; border-right:4px solid #a78bfa;
        border-radius:0 0 14px 14px; }
      .dt-file { position:absolute; bottom:6px; left:50%; translate:-50%; width:30px; height:38px;
        background:#18181b; border:2px solid #67e8f9; border-radius:6px; opacity:0; will-change:transform; }
      .dt-file::before { content:''; position:absolute; top:-2px; right:-8px; width:10px; height:12px;
        background:#0891b2; clip-path:polygon(0 100%, 0 20%, 40% 0, 100% 0, 100% 100%); }
    </style>
    <div class="dt"><div class="dt-stage">
      <div class="dt-arrow">↓</div>
      <div class="dt-tray"></div>
      <div class="dt-file"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to('.dt-arrow', {
      y: 74,
      duration: 0.85,
      ease: 'power2.in',
      onStart() { gsap.set('.dt-file', { opacity: 0 }); },
    })
      .to('.dt-arrow', { scaleY: 0.5, transformOrigin: 'bottom', duration: 0.12, yoyo: true, repeat: 1 }, '-=0.15')
      .fromTo('.dt-file',
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.2)' })
      .to('.dt-tray', { borderColor: '#f472b6', duration: 0.25, yoyo: true, repeat: 1 })
      .to('.dt-arrow', { y: 0, duration: 0.5, ease: 'back.out(2)' }, '+=0.7')
      .to('.dt-file', { opacity: 0, duration: 0.01 });
  }, container);

  return () => ctx.revert();
}
