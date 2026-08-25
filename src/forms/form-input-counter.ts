/** Input Counter — a textarea with a live character ring that warms toward the limit. */
export interface InputCounterOptions {
  label?: string;
  maxLength?: number;
  placeholder?: string;
}

export function createInputCounter(container: HTMLElement, options: InputCounterOptions = {}): () => void {
  const { label = 'Post update', maxLength = 180, placeholder = 'What is happening?' } = options;
  const R = 9;
  const circ = 2 * Math.PI * R;

  container.innerHTML = `<style>
    .fm-ic{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-ic .wrap{width:340px}
    .fm-ic .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .fm-ic .head span{color:#a1a1aa;font:600 13px system-ui}
    .fm-ic textarea{width:100%;box-sizing:border-box;min-height:110px;resize:vertical;border-radius:12px;
      background:#18181b;border:1.5px solid #3f3f46;color:#fafafa;font:400 14px/1.55 system-ui;
      padding:12px 14px;outline:none;transition:border-color .18s ease}
    .fm-ic textarea:focus{border-color:#8b5cf6}
    .fm-ic .foot{display:flex;justify-content:flex-end;margin-top:8px}
    .fm-ic .ring{display:flex;align-items:center;gap:7px;font:500 12px system-ui;color:#71717a}
    .fm-ic .ring.warn{color:#fbbf24}
    .fm-ic .ring.over{color:#ef4444}
  </style>
  <div class="fm-ic"><div class="wrap">
    <div class="head"><span>${label}</span></div>
    <textarea maxlength="${maxLength}" placeholder="${placeholder}"></textarea>
    <div class="foot"><span class="ring">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="${R}" fill="none" stroke="#27272a" stroke-width="3"/>
        <circle class="prog" cx="12" cy="12" r="${R}" fill="none" stroke="#8b5cf6" stroke-width="3"
          stroke-linecap="round" stroke-dasharray="0 ${circ}" transform="rotate(-90 12 12)"/>
      </svg>
      <span class="count">0 / ${maxLength}</span>
    </span></div>
  </div></div>`;

  const ta = container.querySelector<HTMLTextAreaElement>('textarea')!;
  const prog = container.querySelector<SVGCircleElement>('.prog')!;
  const count = container.querySelector<HTMLElement>('.count')!;
  const ring = container.querySelector<HTMLElement>('.ring')!;

  const render = () => {
    const n = ta.value.length;
    const frac = n / maxLength;
    count.textContent = `${n} / ${maxLength}`;
    prog.setAttribute('stroke-dasharray', `${(circ * frac).toFixed(1)} ${circ}`);
    prog.setAttribute('stroke', frac > 0.92 ? '#ef4444' : frac > 0.75 ? '#fbbf24' : '#8b5cf6');
    ring.classList.toggle('warn', frac > 0.75 && frac <= 0.92);
    ring.classList.toggle('over', frac > 0.92);
  };
  ta.addEventListener('input', render);
  render();
  return () => {
    ta.removeEventListener('input', render);
    container.innerHTML = '';
  };
}
