/** Testimonial Card — a quote card with stars and a slow typing reveal. */
export interface TestimonialCardOptions {
  quote?: string;
  author?: string;
  role?: string;
  initials?: string;
  stars?: number;
  typeSpeed?: number;
}

export function createTestimonialCard(container: HTMLElement, options: TestimonialCardOptions = {}): () => void {
  const {
    quote = 'Collider shipped our hero in an afternoon. The code is ours, the quality is unreal.',
    author = 'Maya Chen', role = 'Design lead, Northwind', initials = 'MC', stars = 5, typeSpeed = 26,
  } = options;

  container.innerHTML = `<style>
    .cd-ts{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-ts .card{width:340px;background:#141417;border:1px solid #27272a;border-radius:18px;padding:22px;position:relative}
    .cd-ts .card::before{content:'“';position:absolute;top:6px;left:16px;font:800 52px Georgia,serif;color:#8b5cf655}
    .cd-ts .stars{color:#fbbf24;font-size:15px;letter-spacing:2px;margin-left:44px}
    .cd-ts blockquote{margin:10px 0 16px;color:#e4e4e7;font:400 14.5px/1.6 system-ui;min-height:72px}
    .cd-ts blockquote .caret{display:inline-block;width:8px;height:15px;background:#8b5cf6;vertical-align:-2px;
      animation:cd-ts-blink 1s steps(1) infinite}
    @keyframes cd-ts-blink{50%{opacity:0}}
    .cd-ts .who{display:flex;align-items:center;gap:11px}
    .cd-ts .av{width:40px;height:40px;border-radius:999px;display:grid;place-items:center;
      background:linear-gradient(135deg,#22d3ee,#8b5cf6);color:#fff;font:700 14px system-ui}
    .cd-ts .who b{display:block;color:#fafafa;font:600 13.5px system-ui}
    .cd-ts .who span{color:#71717a;font:400 12px system-ui}
  </style>
  <div class="cd-ts"><div class="card">
    <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
    <blockquote><span class="txt"></span><span class="caret"></span></blockquote>
    <div class="who"><span class="av">${initials}</span><div><b>${author}</b><span>${role}</span></div></div>
  </div></div>`;

  const txt = container.querySelector<HTMLElement>('.txt')!;
  let i = 0;
  const timer = window.setInterval(() => {
    txt.textContent = quote.slice(0, ++i);
    if (i >= quote.length) window.clearInterval(timer);
  }, typeSpeed);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
