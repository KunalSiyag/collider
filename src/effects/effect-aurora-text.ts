/** Aurora Text — flowing gradient sheen sweeping through headline text. */
export interface AuroraTextOptions {
  text?: string;
  colors?: string[];
  fontSize?: number;
}

export function createAuroraText(container: HTMLElement, options: AuroraTextOptions = {}): () => void {
  const { text = 'Aurora', colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#8b5cf6'], fontSize = 64 } = options;
  container.innerHTML = `<style>
    .ef-at{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .ef-at h2{font:800 ${fontSize}px/1.1 system-ui;letter-spacing:-.02em;
      background:linear-gradient(110deg,${colors.join(',')});background-size:300% 100%;
      -webkit-background-clip:text;background-clip:text;color:transparent;
      animation:ef-at-flow 6s linear infinite}
    @keyframes ef-at-flow{to{background-position:300% 0}}
    @media (prefers-reduced-motion:reduce){.ef-at h2{animation:none}}
  </style>
  <div class="ef-at"><h2>${text}</h2></div>`;
  return () => { container.innerHTML = ''; };
}
