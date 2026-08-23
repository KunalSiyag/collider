export interface EffectOptions {
  text?: string;
  speed?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#01';

export function createTextScrambleDecode(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'DECODE ME', speed = 30 } = options;

  container.innerHTML = `
    <style>
      .cl-tsd { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; cursor:pointer; }
      .cl-tsd-t { font-family:ui-monospace,monospace; font-size:clamp(26px,5vw,52px); font-weight:700;
        letter-spacing:0.1em; color:#67e8f9; user-select:none;
        animation:cl-tsd-glow 2.4s ease-in-out infinite alternate; }
      @keyframes cl-tsd-glow { from { text-shadow:0 0 8px rgba(34,211,238,0.35); } to { text-shadow:0 0 22px rgba(34,211,238,0.7); } }
    </style>
    <div class="cl-tsd"><span class="cl-tsd-t"></span></div>
  `;

  const el = container.querySelector('.cl-tsd-t')!;
  const target = el.parentElement as HTMLElement;
  let frame: number, timer = 0;

  const scrambleTo = (value: string) => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    const from = el.textContent ?? '';
    const len = value.length;
    let step = 0;
    const run = () => {
      let outStr = '';
      for (let i = 0; i < len; i++) {
        if (i < step / 2) outStr += value[i];
        else outStr += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = outStr;
      if (step / 2 < len) { step++; timer = window.setTimeout(run, speed); }
      else el.textContent = value;
    };
    run();
  };
  setTimeout(() => scrambleTo(text), 300);

  const onHover = () => scrambleTo(text);
  target.addEventListener('pointerenter', onHover);

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    target.removeEventListener('pointerenter', onHover);
    container.innerHTML = '';
  };
}
