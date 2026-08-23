import gsap from 'gsap';

export interface LikeHeartOptions {
  emoji?: string;
}

export function createLikeHeart(container: HTMLElement, options: LikeHeartOptions = {}): () => void {
  const { emoji = '❤️' } = options;

  container.innerHTML = `
    <style>
      .lh { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:#0b0b10; font-family:system-ui,sans-serif; }
      .lh-stage { position:relative; width:120px; height:120px; }
      .lh-heart { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:64px; will-change:transform; filter:grayscale(1) opacity(.55); }
      .lh-ring { position:absolute; inset:8px; border-radius:50%; border:3px solid #f472b6; opacity:0; }
      .lh-particle { position:absolute; left:50%; top:50%; width:7px; height:7px; border-radius:50%; background:#f472b6; opacity:0; }
      .lh-count { font-size:15px; color:#a1a1aa; font-family:ui-monospace,monospace; }
    </style>
    <div class="lh">
      <div class="lh-stage">
        <span class="lh-heart">${emoji}</span>
        <div class="lh-ring"></div>
        ${Array.from({ length: 8 }, (_, i) =>
          `<div class="lh-particle" style="transform:rotate(${i * 45}deg) translateY(-34px);background:${['#f472b6', '#a78bfa', '#22d3ee'][i % 3]}"></div>`).join('')}
      </div>
      <div class="lh-count">1,204 likes</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const heart = container.querySelector<HTMLElement>('.lh-heart')!;
    const count = container.querySelector<HTMLElement>('.lh-count')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

    tl.fromTo(heart,
      { scale: 0.9 },
      {
        scale: 1.35,
        duration: 0.18,
        ease: 'power2.out',
        filter: 'grayscale(0) opacity(1)',
        onComplete() {},
      })
      .to(heart, { scale: 1, duration: 0.35, ease: 'elastic.out(1.1, 0.4)' })
      .fromTo('.lh-ring', { scale: 0.5, opacity: 0.8 }, { scale: 1.5, opacity: 0, duration: 0.6 }, '<');
    tl.to('.lh-particle', {
      keyframes: [
        { opacity: 1, scale: 1, duration: 0.05 },
        { opacity: 0, y: () => gsap.utils.random(-60, -30), x: () => gsap.utils.random(-40, 40), duration: 0.5 },
      ],
      stagger: 0.02,
    }, '<-0.05');
    tl.call(() => {
      count.textContent = '1,205 likes';
      gsap.fromTo(count, { color: '#f472b6', scale: 1.2 }, { color: '#a1a1aa', scale: 1, duration: 0.5 });
    });
    tl.to({}, { duration: 0.5 });
    tl.to(heart, { scale: 0.9, filter: 'grayscale(1) opacity(.55)', duration: 0.4 });
    tl.call(() => { count.textContent = '1,204 likes'; });
  }, container);

  return () => ctx.revert();
}
