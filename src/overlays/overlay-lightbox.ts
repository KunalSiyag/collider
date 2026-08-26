/** Lightbox — click a thumbnail to zoom it full-screen with a fade backdrop. */
export interface LightboxOptions {
  caption?: string;
  accent?: string;
}

export function createLightbox(container: HTMLElement, options: LightboxOptions = {}): () => void {
  const { caption = 'Aurora over the fjord — click to zoom', accent = '#22d3ee' } = options;

  container.innerHTML = `<style>
    .ov-lb{height:100%;position:relative;display:grid;place-items:center;background:#0b0b10;gap:0}
    .ov-lb .thumb{width:200px;height:130px;border-radius:12px;cursor:zoom-in;border:1px solid #3f3f46;
      background:
        radial-gradient(ellipse at 70% 20%,rgba(74,222,128,.5),transparent 55%),
        radial-gradient(ellipse at 30% 60%,rgba(139,92,246,.5),transparent 55%),
        linear-gradient(#0e1424,#05070f);
      transition:transform .25s ease,box-shadow .25s ease}
    .ov-lb .thumb:hover{transform:scale(1.04);box-shadow:0 10px 30px rgba(0,0,0,.5)}
    .ov-lb .cap{color:#71717a;font:400 12px system-ui;margin-top:12px}
    .ov-lb .stage{position:absolute;inset:0;background:rgba(0,0,0,.85);display:grid;place-items:center;
      opacity:0;pointer-events:none;transition:opacity .3s ease;cursor:zoom-out}
    .ov-lb.open .stage{opacity:1;pointer-events:auto}
    .ov-lb .zoom{width:min(70%,560px);aspect-ratio:16/10;border-radius:14px;
      background:
        radial-gradient(ellipse at 70% 20%,rgba(74,222,128,.55),transparent 55%),
        radial-gradient(ellipse at 30% 60%,rgba(139,92,246,.55),transparent 55%),
        linear-gradient(#0e1424,#05070f);
      transform:scale(.8);transition:transform .38s cubic-bezier(.3,1.1,.4,1)}
    .ov-lb.open .zoom{transform:none}
    .ov-lb .zoom-cap{position:absolute;bottom:26px;color:#d4d4d8;font:500 13px system-ui}
    .ov-lb .x{position:absolute;top:18px;right:22px;border:none;background:transparent;color:#a1a1aa;
      font-size:22px;cursor:pointer}
    .ov-lb .x:hover{color:#fff}
  </style>
  <div class="ov-lb">
    <div style="text-align:center">
      <div class="thumb" role="button" tabindex="0" aria-label="Open image"></div>
      <div class="cap">${caption}</div>
    </div>
    <div class="stage">
      <button type="button" class="x" aria-label="Close">✕</button>
      <div class="zoom"></div>
      <div class="zoom-cap">${caption}</div>
    </div>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-lb')!;
  const open = () => root.classList.add('open');
  const close = () => root.classList.remove('open');
  root.querySelector('.thumb')!.addEventListener('click', open);
  root.querySelector('.stage')!.addEventListener('click', close);
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
  window.addEventListener('keydown', onKey);
  return () => {
    window.removeEventListener('keydown', onKey);
    container.innerHTML = '';
  };
}
