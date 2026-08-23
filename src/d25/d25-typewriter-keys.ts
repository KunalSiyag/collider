export interface TypewriterKeysOptions {
  label?: string;
}

export function createTypewriterKeys(
  container: HTMLElement,
  options: TypewriterKeysOptions = {},
): () => void {
  const { label = 'TYPE' } = options;
  const letters = 'QWERTYUIOP'.split('');

  container.innerHTML = `
    <style>
      .cl-n78 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:radial-gradient(circle at 45% 25%,#1c1917,#09090b); perspective:800px; }
      .cl-n78-machine { position:relative; width:min(70%,300px); padding:18px 14px 20px; border-radius:12px;
        background:linear-gradient(#57534e,#292524); border:1px solid #78716c55;
        transform-style:preserve-3d; transform:rotateX(30deg); will-change:transform;
        box-shadow:-16px 26px 54px rgba(0,0,0,.6); }
      .cl-n78-paper { position:absolute; bottom:96%; left:12%; right:12%; height:74%;
        background:#fefce8ee; border-radius:3px 3px 0 0; transform-origin:bottom center;
        transform:perspective(500px) rotateX(-52deg); box-shadow:0 -4px 18px rgba(0,0,0,.35); }
      .cl-n78-text { position:absolute; top:12px; left:12px; color:#44403c; font-size:11px; letter-spacing:.08em; }
      .cl-n78-row { display:flex; gap:5px; justify-content:center; margin-top:8px; }
      .cl-n78-key { width:24px; height:26px; border:none; border-radius:4px; cursor:pointer;
        background:radial-gradient(circle at 40% 32%,#d6d3d1,#78716c); color:#1c1917; font-size:11px; font-weight:700;
        box-shadow:0 4px 0 #292524, inset 0 1px 0 rgba(255,255,255,.4);
        transition:translate .07s ease, box-shadow .07s ease; }
      .cl-n78-key.hit { translate:0 4px; box-shadow:0 0 0 #292524, 0 0 12px rgba(250,204,21,.6); }
      .cl-n78-hint { color:#a8a29e; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n78">
      <div class="cl-n78-machine">
        <div class="cl-n78-paper"><span class="cl-n78-text"></span></div>
        <div class="cl-n78-row">${letters.map((l) => `<button class="cl-n78-key" data-l="${l}">${l}</button>`).join('')}</div>
        <div class="cl-n78-row">${letters.slice(2).map((l) => `<button class="cl-n78-key" data-l="${l}">${l}</button>`).join('')}</div>
      </div>
      <div class="cl-n78-hint">Type any key · ${label}</div>
    </div>
  `;

  const machine = container.querySelector<HTMLElement>('.cl-n78-machine')!;
  const paperText = container.querySelector<HTMLElement>('.cl-n78-paper .cl-n78-text')!;

  let text = '';

  function flashKey(l: string) {
    const keys = Array.from(container.querySelectorAll<HTMLElement>('.cl-n78-key'));
    const hit = keys.find((k) => k.dataset.l === l);
    if (hit) {
      hit.classList.add('hit');
      setTimeout(() => hit.classList.remove('hit'), 120);
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!/^[a-zA-Z]$/.test(e.key)) return;
    const up = e.key.toUpperCase();
    text = (text + e.key.toLowerCase()).slice(-46);
    paperText.textContent = text;
    flashKey(up);
    machine.style.transform = `rotateX(28deg) translateZ(3px)`;
    setTimeout(() => (machine.style.transform = ''), 90);
  }

  window.addEventListener('keydown', onKeyDown);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    container.innerHTML = '';
  };
}
