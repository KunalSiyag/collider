import gsap from 'gsap';

export interface TrafficLightOptions {
  greenMs?: number;
}

export function createTrafficLight(
  container: HTMLElement,
  options: TrafficLightOptions = {},
): () => void {
  const { greenMs = 1600 } = options;

  container.innerHTML = `
    <style>
      .tf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .tf-post { display:flex; flex-direction:column; align-items:center; }
      .tf-box { padding:14px; border-radius:18px; background:#131317; border:1px solid #3f3f46;
        display:flex; flex-direction:column; gap:12px; box-shadow:0 20px 40px rgba(0,0,0,.5); }
      .tf-lamp { width:44px; height:44px; border-radius:50%; background:#1c1c22; border:2px solid #27272a; }
      .tf-lamp.red.on { background:#f43f5e; box-shadow:0 0 22px #f43f5ecc; }
      .tf-lamp.amber.on { background:#fbbf24; box-shadow:0 0 22px #fbbf24cc; }
      .tf-lamp.green.on { background:#34d399; box-shadow:0 0 22px #34d399cc; }
      .tf-pole { width:8px; height:60px; background:#3f3f46; }
    </style>
    <div class="tf"><div class="tf-post">
      <div class="tf-box">
        <div class="tf-lamp red"></div>
        <div class="tf-lamp amber"></div>
        <div class="tf-lamp green"></div>
      </div>
      <div class="tf-pole"></div>
    </div></div>
  `;

  const lamps = {
    red: container.querySelector<HTMLElement>('.tf-lamp.red')!,
    amber: container.querySelector<HTMLElement>('.tf-lamp.amber')!,
    green: container.querySelector<HTMLElement>('.tf-lamp.green')!,
  };

  const ctx = gsap.context(() => {
    const set = (on: 'red' | 'amber' | 'green') => {
      (Object.keys(lamps) as ('red' | 'amber' | 'green')[]).forEach((k) =>
        lamps[k].classList.toggle('on', k === on));
    };
    set('green');
    const tl = gsap.timeline({ repeat: -1 });
    tl.to({}, { duration: greenMs / 1000 });
    tl.call(() => set('amber')).to({}, { duration: 0.7 });
    tl.call(() => set('red')).to({}, { duration: 1.8 });
    tl.to(lamps.amber, {}, '<');
    tl.call(() => set('amber')).to({}, { duration: 0.7 });
    tl.call(() => set('green')).to({}, { duration: 0.01 });
  }, container);

  return () => ctx.revert();
}
