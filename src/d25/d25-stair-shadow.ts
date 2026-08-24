/** Stair Shadow 2.5D — steps lighting up as a light source sweeps across. */
export interface StairShadowOptions {
  steps?: number;
  baseColor?: string;
  lightColor?: string;
}

export function createStairShadow(container: HTMLElement, options: StairShadowOptions = {}): () => void {
  const { steps = 6, baseColor = '#27272a', lightColor = '#8b5cf6' } = options;
  container.innerHTML = `<style>
    .d25-ss{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:60px}
    .d25-ss .stairs{display:flex;align-items:flex-end;gap:6px}
    .d25-ss .step{width:52px;border-radius:8px 8px 0 0;background:${baseColor};position:relative;transition:box-shadow .4s ease}
    .d25-ss .step::after{content:'';position:absolute;inset:0;border-radius:8px 8px 0 0;opacity:0;transition:opacity .4s ease;
      background:linear-gradient(180deg,${lightColor}44,transparent)}
    .d25-ss .step.lit{box-shadow:0 -6px 24px ${lightColor}55}
    .d25-ss .step.lit::after{opacity:1}
  </style>
  <div class="d25-ss"><div class="stairs">
    ${Array.from({ length: steps }, (_, i) => `<div class="step" data-i="${i}" style="height:${44 + i * 26}px"></div>`).join('')}
  </div></div>`;

  const stepEls = [...container.querySelectorAll<HTMLElement>('.step')];
  let i = 0;
  const sweep = () => {
    stepEls.forEach((el) => el.classList.remove('lit'));
    stepEls[i % stepEls.length].classList.add('lit');
    i += 1;
  };
  sweep();
  const timer = window.setInterval(sweep, 700);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
