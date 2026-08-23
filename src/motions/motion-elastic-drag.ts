import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export interface ElasticDragOptions {
  title?: string;
}

export function createElasticDrag(
  container: HTMLElement,
  options: ElasticDragOptions = {},
): () => void {
  const { title = 'Drag me' } = options;

  container.innerHTML = `
    <style>
      .cl-ed { height:100%; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;
        background-image: radial-gradient(circle, #26262b 1.5px, transparent 1.5px); background-size: 22px 22px; }
      .cl-ed-card { width:190px; padding:24px 22px; border-radius:20px; text-align:center; cursor:grab;
        background:#141417; border:1px solid #3f3f46; color:#fafafa; box-shadow:0 18px 40px rgba(0,0,0,0.45); touch-action:none; }
      .cl-ed-card strong { font-size:16px; display:block; margin-bottom:6px; }
      .cl-ed-card small { color:#71717a; font-size:12px; }
    </style>
    <div class="cl-ed"><div class="cl-ed-card"><strong>${title}</strong><small>elastic snap-back</small></div></div>
  `;

  const card = container.querySelector<HTMLElement>('.cl-ed-card')!;

  const draggable = Draggable.create(card, {
    type: 'x,y',
    edgeResistance: 0.65,
    bounds: container,
    inertia: false,
    onDragStart() {
      gsap.to(card, { scale: 1.06, rotate: gsap.utils.random(-5, 5), duration: 0.25 });
    },
    onRelease() {
      gsap.to(card, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' });
    },
  });

  return () => {
    draggable[0]?.kill();
    card.style.transform = '';
  };
}
