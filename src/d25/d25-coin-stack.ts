/** Coin Stack 2.5D — coins dropping onto a stack with depth shadows. */
export interface CoinStackOptions {
  coins?: number;
  coinColor?: string;
  dropEvery?: number;
}

export function createCoinStack(container: HTMLElement, options: CoinStackOptions = {}): () => void {
  const { coins = 6, coinColor = '#fbbf24', dropEvery = 1500 } = options;
  container.innerHTML = `<style>
    .d25-cs{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:70px;position:relative}
    .d25-cs .stack{position:relative;width:90px;height:14px}
    .d25-cs .coin{position:absolute;left:0;width:90px;height:22px;border-radius:50%;
      background:radial-gradient(ellipse at 50% 35%,#fde68a,${coinColor} 60%,#b45309);
      border:2px solid #92400e;box-shadow:0 6px 0 rgba(0,0,0,.35)}
    .d25-cs .coin.drop{animation:d25-cs-drop .5s cubic-bezier(.3,1.6,.5,1) both}
    @keyframes d25-cs-drop{from{transform:translateY(-190px) scaleY(1.2);opacity:0}70%{transform:translateY(0) scaleY(.7)}100%{transform:translateY(0) scaleY(1);opacity:1}}
    .d25-cs .shadow{position:absolute;bottom:-16px;left:50%;translate:-50% 0;width:130px;height:22px;border-radius:50%;background:rgba(0,0,0,.5);filter:blur(6px)}
  </style>
  <div class="d25-cs"><div class="shadow"></div><div class="stack"></div></div>`;

  const stack = container.querySelector<HTMLElement>('.stack')!;
  let n = 0;
  const addCoin = () => {
    if (n >= coins) {
      n = 0;
      stack.innerHTML = '';
    }
    const coin = document.createElement('div');
    coin.className = 'coin drop';
    coin.style.bottom = `${n * 12}px`;
    stack.appendChild(coin);
    n += 1;
  };
  addCoin();
  const timer = window.setInterval(addCoin, dropEvery);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
