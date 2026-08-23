export interface EffectOptions {
  label?: string;
}

export function createCompassNeedle(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'N · E · S · W' } = options;

  container.innerHTML = `
    <style>
      .cl-cmp { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
        background:#0b0b10; }
      .cl-cmp-face { position:relative; width:190px; height:190px; border-radius:50%;
        background:
          repeating-conic-gradient(rgba(167,139,250,0.12) 0deg 1deg, transparent 1deg 15deg),
          radial-gradient(circle at 50% 50%, #17172a, #10101c);
        border:3px solid #2c2c44; box-shadow:0 18px 40px rgba(0,0,0,0.55), inset 0 0 24px rgba(139,92,246,0.14);
        overflow:hidden; cursor:pointer; }
      .cl-cmp-needle { position:absolute; left:50%; top:50%; width:6px; height:150px; margin:-75px -3px;
        transition:transform 2.4s cubic-bezier(.34,1.2,.35,1); transform-origin:50% 50%; }
      .cl-cmp-needle::before { content:''; position:absolute; top:0; left:0; width:100%; height:50%;
        background:#f472b6; clip-path:polygon(50% 0, 100% 100%, 0 100%); filter:drop-shadow(0 0 5px #f472b6); }
      .cl-cmp-needle::after { content:''; position:absolute; bottom:0; left:0; width:100%; height:50%;
        background:#67e8f9; clip-path:polygon(0 0, 100% 0, 50% 100%); filter:drop-shadow(0 0 5px #22d3ee); }
      .cl-cmp-hub { position:absolute; left:50%; top:50%; width:14px; height:14px; margin:-7px; border-radius:50%;
        background:#e8e8f2; box-shadow:0 0 8px rgba(255,255,255,0.6); z-index:2; }
      .cl-cmp-tick { position:absolute; left:50%; top:6px; width:2px; height:10px; margin-left:-1px; background:#a78bfa;
        opacity:0.9; transform-origin:50% calc(95px - 6px); }
      .cl-cmp-cap { color:rgba(255,255,255,0.5); font-size:12px; letter-spacing:0.32em; }
    </style>
    <div class="cl-cmp">
      <div class="cl-cmp-face" id="cl-cmp-face">
        ${[0, 90, 180, 270].map(a => `<i class="cl-cmp-tick" style="transform:rotate(${a}deg)"></i>`).join('')}
        <div class="cl-cmp-needle"></div><div class="cl-cmp-hub"></div>
      </div>
      <span class="cl-cmp-cap">${label}</span>
    </div>
  `;

  const face = container.querySelector('#cl-cmp-face')!;
  const needle = face.querySelector('.cl-cmp-needle') as HTMLElement;
  let ang = Math.random() * 360;
  needle.style.transform = `rotate(${ang}deg)`;
  const onClick = () => {
    ang += 120 + Math.random() * 240;
    needle.style.transform = `rotate(${ang}deg)`;
  };
  face.addEventListener('click', onClick);

  return () => {
    face.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
