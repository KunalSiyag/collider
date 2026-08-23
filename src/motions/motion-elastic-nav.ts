import gsap from 'gsap';

export interface ElasticNavOptions {
  items?: string[];
}

export function createElasticNav(
  container: HTMLElement,
  options: ElasticNavOptions = {},
): () => void {
  const { items = ['Home', 'Elements', 'Pricing', 'Blog'] } = options;

  container.innerHTML = `
    <style>
      .cl-en { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-en-nav { display:flex; gap:6px; padding:8px; border-radius:16px;
        background:#141417; border:1px solid #2c2c33; }
      .cl-en-item { padding:12px 24px; font-size:15px; color:#a1a1aa; border-radius:10px; cursor:pointer;
        transition:color .2s ease, background .2s ease; }
      .cl-en-item:hover { color:#fafafa; background:#26262b; }
    </style>
    <div class="cl-en"><nav class="cl-en-nav">
      ${items.map((item) => `<span class="cl-en-item">${item}</span>`).join('')}
    </nav></div>
  `;

  const navItems = [...container.querySelectorAll<HTMLElement>('.cl-en-item')];

  function onEnter(index: number) {
    navItems.forEach((item, j) => {
      const distance = Math.abs(j - index);
      if (distance === 0) return;
      gsap.to(item, {
        scaleX: 1 - distance * 0.06,
        scaleY: 1 - distance * 0.04,
        duration: 0.35,
        ease: 'power3.out',
      });
    });
    gsap.to(navItems[index]!, { scale: 1.08, duration: 0.35, ease: 'elastic.out(1,0.5)' });
  }

  function onLeaveNav() {
    gsap.to(navItems, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  }

  navItems.forEach((item, i) => item.addEventListener('pointerenter', () => onEnter(i)));
  container.addEventListener('pointerleave', onLeaveNav);

  return () => {
    navItems.forEach((item, i) =>
      item.removeEventListener('pointerenter', () => onEnter(i)),
    );
    container.removeEventListener('pointerleave', onLeaveNav);
  };
}
