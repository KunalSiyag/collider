/** Burger Morph — a hamburger that fluidly morphs into a cross. */
export interface BurgerMorphOptions {
  color?: string;
  accent?: string;
  onToggle?: (open: boolean) => void;
}

export function createBurgerMorph(container: HTMLElement, options: BurgerMorphOptions = {}): () => void {
  const { color = '#fafafa', accent = '#8b5cf6', onToggle } = options;
  container.innerHTML = `<style>
    .nv-bm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-bm button{width:56px;height:56px;border-radius:14px;border:1.5px solid #3f3f46;background:#18181b;
      cursor:pointer;display:grid;place-items:center;transition:border-color .2s ease,box-shadow .2s ease}
    .nv-bm button:hover{border-color:${accent};box-shadow:0 0 0 4px ${accent}22}
    .nv-bm .lines{position:relative;width:24px;height:18px}
    .nv-bm .lines i{position:absolute;left:0;width:100%;height:2.6px;border-radius:2px;background:${color};
      transition:transform .32s cubic-bezier(.3,1.3,.4,1),opacity .2s ease,top .32s ease}
    .nv-bm .lines i:nth-child(1){top:0}
    .nv-bm .lines i:nth-child(2){top:7.7px}
    .nv-bm .lines i:nth-child(3){top:15.4px}
    .nv-bm button.open i:nth-child(1){top:7.7px;transform:rotate(45deg);background:${accent}}
    .nv-bm button.open i:nth-child(2){opacity:0;transform:scaleX(.2)}
    .nv-bm button.open i:nth-child(3){top:7.7px;transform:rotate(-45deg);background:${accent}}
  </style>
  <div class="nv-bm"><button type="button" aria-label="Menu" aria-expanded="false"><span class="lines"><i></i><i></i><i></i></span></button></div>`;

  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const handler = () => {
    const open = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    onToggle?.(open);
  };
  btn.addEventListener('click', handler);
  return () => {
    btn.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
