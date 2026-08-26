/** Product Card — image area, price row and an add-to-cart micro-interaction. */
export interface ProductCardOptions {
  name?: string;
  price?: number;
  tag?: string;
  onAdd?: () => void;
}

export function createProductCard(container: HTMLElement, options: ProductCardOptions = {}): () => void {
  const { name = 'Aurora Headphones', price = 249, tag = 'New', onAdd } = options;

  container.innerHTML = `<style>
    .cd-pr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-pr .card{width:270px;border-radius:18px;overflow:hidden;background:#141417;border:1px solid #27272a;
      transition:transform .25s ease,box-shadow .25s ease}
    .cd-pr .card:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.5)}
    .cd-pr .img{height:150px;position:relative;display:grid;place-items:center;
      background:radial-gradient(ellipse at 50% 30%,rgba(139,92,246,.25),transparent 65%),#1c1c22}
    .cd-pr .tag{position:absolute;top:12px;left:12px;background:#8b5cf6;color:#fff;font:700 10.5px system-ui;
      letter-spacing:.08em;padding:4px 9px;border-radius:999px}
    .cd-pr .body{padding:16px}
    .cd-pr h3{margin:0;color:#fafafa;font:600 15px system-ui}
    .cd-pr .row{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
    .cd-pr .price{color:#22d3ee;font:800 17px system-ui}
    .cd-pr button{border:none;background:#8b5cf6;color:#fff;font:600 12.5px system-ui;padding:9px 15px;
      border-radius:9px;cursor:pointer;transition:background .18s ease,transform .1s ease}
    .cd-pr button:active{transform:scale(.94)}
    .cd-pr button.added{background:#134e4a;color:#5eead4}
  </style>
  <div class="cd-pr"><div class="card">
    <div class="img"><span class="tag">${tag}</span>
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="1.4"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/></svg>
    </div>
    <div class="body">
      <h3>${name}</h3>
      <div class="row"><span class="price">$${price}</span><button type="button">Add to cart</button></div>
    </div>
  </div></div>`;

  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const handler = () => {
    btn.classList.add('added');
    btn.textContent = 'Added ✓';
    onAdd?.();
    window.setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = 'Add to cart';
    }, 1400);
  };
  btn.addEventListener('click', handler);
  return () => {
    btn.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
