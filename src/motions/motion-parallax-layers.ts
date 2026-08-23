import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxLayersOptions {
  depthStep?: number;
}

export function createParallaxLayers(
  container: HTMLElement,
  options: ParallaxLayersOptions = {},
): () => void {
  const { depthStep = 14 } = options;

  container.innerHTML = `
    <style>
      .cl-pl { height:100%; overflow-y:auto; position:relative; background:#0b0b10; }
      .cl-pl-inner { height:190vh; display:flex; align-items:center; justify-content:center; }
      .cl-pl-card { position:absolute; width:min(46%, 240px); aspect-ratio:1; border-radius:24px;
        display:flex; align-items:flex-end; padding:18px; font-weight:700; font-size:15px; color:#fafafa; }
      .cl-pl-hint { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); color:#52525b; font-size:12px; }
    </style>
    <div class="cl-pl">
      <div class="cl-pl-inner">
        <div class="cl-pl-card" data-depth="3" style="left:8%; top:16%; background:#7c3aed;">back layer</div>
        <div class="cl-pl-card" data-depth="2" style="left:30%; top:30%; background:#0e7490;">mid layer</div>
        <div class="cl-pl-card" data-depth="1" style="left:54%; top:44%; background:#9d174d;">front layer</div>
      </div>
      <div class="cl-pl-hint">scroll inside — layers drift at different speeds</div>
    </div>
  `;

  const scroller = container.querySelector<HTMLElement>('.cl-pl')!;
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.cl-pl-card').forEach((layer) => {
      const depth = Number(layer.dataset.depth ?? 1);
      gsap.to(layer, {
        y: -depth * depthStep * 6,
        ease: 'none',
        scrollTrigger: {
          trigger: scroller,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });
  }, container);

  return () => {
    ctx.revert();
    scroller.scrollTop = 0;
  };
}
