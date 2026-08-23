import gsap from 'gsap';

export interface CloudDriftOptions {
  clouds?: number;
}

export function createCloudDrift(container: HTMLElement, options: CloudDriftOptions = {}): () => void {
  const { clouds = 4 } = options;

  container.innerHTML = `
    <style>
      .cn { height:100%; position:relative; overflow:hidden; background:linear-gradient(#0b0b10, #131a2e); }
      .cn-cloud { position:absolute; will-change:transform; opacity:.85;
        filter:drop-shadow(0 12px 18px #0006); }
      .cn-puff { position:absolute; border-radius:50%; background:linear-gradient(180deg,#334155,#1e293b); }
    </style>
    <div class="cn">
      ${Array.from({ length: clouds }, (_, i) => {
        const scale = 0.55 + i * 0.22;
        return `<div class="cn-cloud" data-i="${i}" style="top:${8 + i * 19}%;scale:${scale}">
          <div class="cn-puff" style="width:70px;height:34px;left:0;top:14px"></div>
          <div class="cn-puff" style="width:44px;height:44px;left:26px;top:-2px"></div>
          <div class="cn-puff" style="width:36px;height:30px;left:58px;top:16px"></div>
        </div>`;
      }).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.cn-cloud').forEach((cloud, i) => {
      const dist = container.clientWidth + cloud.offsetWidth + 60;
      gsap.fromTo(cloud,
        { x: -cloud.offsetWidth - 60 },
        {
          x: dist,
          duration: (14 + i * 5) / (0.55 + i * 0.22),
          repeat: -1,
          delay: i * 2.2,
          ease: 'none',
        });
      gsap.to(cloud, {
        y: '+=10',
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
